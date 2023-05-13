export CARLIN_ENVIRONMENT=Production

# Fetch tags
git fetch --tags --quiet

# 1. `git tag --points-at HEAD`: This command lists all tags that point to the
# current commit, which is specified as HEAD.
# 2. `grep -q .`: This command searches for any character in the output of the
# git tag command. If there are no tags, the output will be empty and grep will
# return a non-zero exit code, which indicates failure. If there are tags, grep
# will find at least one character in the output and return a zero exit code,
# which indicates success.
git tag --points-at HEAD | grep -q . && { echo "There are tags in the current commit, exiting main workflow"; exit 0; }

# Retrieve the latest tag
export LATEST_TAG=$(git describe --tags --abbrev=0)

# Setup NPM token
# Using ~/.npmrc instead of .npmrc because pnpm uses .npmrc and appending
# the token to .npmrc will cause git uncommitted changes error.
echo //registry.npmjs.org/:\_authToken=$NPM_TOKEN > ~/.npmrc

# Print "NPM whoami" to check if the token is valid
echo NPM whoami: $(npm whoami)

# Build @ttoss/config package to lerna version command works properly
# when commiting changes. If we don't build this package, commit will fail
# because pre-commit hook will run syncpack:list with default config, that
# not works because of package version and "workspace:^" mismatch.
pnpm turbo run build:config

# Publish packages only if `pnpm lerna changed` is success. This happens when
# exists an updade on root and no packages changes. This way, `version` won't
# create tags and `git diff HEAD^1 origin/main --quiet` will fail because
# HEAD^1 will diff from origin/main.
if pnpm lerna changed; then
  echo "Changes detected on packages, publishing them..."
  
  # Version before publish to rebuild all packages that Lerna will publish
  pnpm lerna version --yes --no-push

  # Test and build all packages since $LATEST_TAG
  # and all the workspaces that depends on them
  # https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependents-of-matched-workspaces
  pnpm turbo run build test --filter=...[$LATEST_TAG]

  # See description on pr.sh.
  pnpm turbo run lint
  git status --porcelain || { echo "Error: There are changed files."; git status; exit 1; }

  # Use Git to check for changes in the origin repository. If there are any
  # changes, "git push --follow-tags" will fail. The error message will be:
  #
  # error: failed to push some refs to 'github.com:ttoss/ttoss.git'
  # hint: Updates were rejected because the remote contains work that you do
  # hint: not have locally. This is usually caused by another repository pushing
  # hint: to the same ref. You may want to first integrate the remote changes
  # hint: (e.g., 'git pull ...') before pushing again.
  #
  # To avoid this, we need to:
  #
  # 1. Fetch the latest changes from the origin/main repository.
  # 2. Compare the local and remote main branches using `git diff`.
  # 3. Check if there are any changes and stop the workflow if there are any.
  # 4. Exit and wait to the next main workflow starts because of the changes.
  git fetch

  # HEAD^1 because lerna version created a commit
  git diff HEAD^1 origin/main --quiet || { echo "Changes found before publishing. Workflow stopped."; exit 1; }

  # Push changes
  git push --follow-tags

  # Publish packages
  pnpm -r publish
else
  echo "No changes detected on packages, skipping publish..."
fi

# Deploy after publish because there are cases in which a package is versioned
# and it should be on NPM registry to Lambda Layer create the new version when
# carlin deploy starts.
pnpm turbo run deploy --filter=...[$LATEST_TAG]
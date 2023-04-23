export CARLIN_ENVIRONMENT=Production

# Fetch tags
git fetch --tags --quiet

# https://stackoverflow.com/a/25742085/8786986
pnpm lerna changed || { echo "No changes detected, exiting main workflow" && exit 0; }

# If we're here, there are changes, so we need to run the main workflow

LATEST_TAG=$(git describe --tags --abbrev=0)

# Setup NPM token
# Using ~/.npmrc instead of .npmrc because pnpm uses .npmrc and appending
# the token to .npmrc will cause git uncommitted changes error.
echo //registry.npmjs.org/:\_authToken=$NPM_TOKEN > ~/.npmrc

# Print "NPM whoami" to check if the token is valid
echo NPM whoami: $(npm whoami)

# Version before publish to rebuild all packages that Lerna will publish
pnpm lerna version --yes --no-push

# Test and build all packages since $LATEST_TAG
# and all the workspaces that depends on them
# https://turbo.build/repo/docs/core-concepts/monorepos/filtering#include-dependents-of-matched-workspaces
pnpm turbo run build test --filter=...[$LATEST_TAG]

# Undo all files that were changed by the build command—this happens because
# the build can change files with different linting rules, or modify some
# auto-generated docs. We don't want these changes becaues it will cause
# turbo cache missing. https://turbo.build/repo/docs/core-concepts/caching#missing-the-cache
git checkout -- .

# Publish packages
pnpm lerna publish from-git --yes

# Push only tags to check if there's no issues with the tags
git push --tags

# Push changes
git push --follow-tags

# Deploy after publish because there are cases in which a package is versioned
# and it should be on NPM registry to Lambda Layer create the new version when
# carlin deploy starts.
pnpm turbo run deploy --filter=...[$LATEST_TAG]
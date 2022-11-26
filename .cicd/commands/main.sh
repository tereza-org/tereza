# Fetch tags
git fetch --tags

# https://stackoverflow.com/a/25742085/8786986
yarn lerna changed || { echo "No changes detected, exiting main workflow" && exit 0; }

####
## If we're here, there are changes, so we need to run the main workflow
####

LATEST_TAG=$(git describe --tags --abbrev=0)

# Setup NPM token
echo //registry.npmjs.org/:\_authToken=$NPM_TOKEN > .npmrc

# Build modified packages for version bump
yarn turbo run build test lint --filter=[$LATEST_TAG]

# Version before publish to rebuild all packages that Lerna will publish
yarn lerna version --yes --no-push

# Rebuild all packages that Lerna will publish
yarn turbo run build lint test deploy --filter=[$LATEST_TAG]

# Publish packages
yarn lerna publish from-git --yes --no-verify-access

# Push only tags to check if there's no issues with the tags
git push --tags

# Push changes
git push --follow-tags
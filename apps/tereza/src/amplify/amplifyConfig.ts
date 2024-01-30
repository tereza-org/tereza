/* eslint-disable turbo/no-undeclared-env-vars */
import { type ResourcesConfig } from 'aws-amplify';

export const amplifyConfig: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_APPSYNC_GRAPHQL_ENDPOINT as string,
      region: process.env.NEXT_PUBLIC_REGION as string,
      defaultAuthMode: 'userPool',
    },
  },
  Auth: {
    Cognito: {
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID as string,
    },
  },
};

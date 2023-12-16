import { Amplify } from 'aws-amplify';

Amplify.configure({
  aws_appsync_graphqlEndpoint: import.meta.env.VITE_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: import.meta.env.VITE_REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Auth: {
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_CLIENT_ID,
  },
});

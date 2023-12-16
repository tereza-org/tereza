/**
 * https://docs.amplify.aws/javascript/prev/build-a-backend/server-side-rendering/#use-amplify-with-nextjs-app-router-app-directory
 */
import { Amplify, withSSRContext } from 'aws-amplify';
import { amplifyConfig } from './amplifyConfig';
import { headers } from 'next/headers';

Amplify.configure(amplifyConfig);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchSSR = async (args: any) => {
  const req = {
    headers: {
      cookie: headers().get('cookie'),
    },
  };

  const SSR = withSSRContext({ req });

  return SSR.API.graphql(args);
};

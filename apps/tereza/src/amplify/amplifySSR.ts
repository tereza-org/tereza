import { amplifyConfig } from './amplifyConfig';
import { cookies } from 'next/headers';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { encodeCredentials } from '@ttoss/relay-amplify';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';

const cookieBasedClient = generateServerClientUsingCookies({
  config: amplifyConfig,
  cookies,
});

const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig,
});

export const fetchSSR = async ({
  query,
  variables,
}: {
  query: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
}) => {
  const { credentials } = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => {
      return fetchAuthSession(contextSpec);
    },
  });

  const headers: { [key: string]: string } = {};

  if (credentials) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers['x-credentials'] = encodeCredentials(credentials as any);
  }

  if (!query) {
    throw new Error('Missing query');
  }

  return cookieBasedClient.graphql(
    {
      query,
      variables,
    },
    headers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
};

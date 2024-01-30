/**
 * https://github.com/relayjs/relay-examples/blob/main/issue-tracker-next-v13/src/relay/environment.ts
 */
import {
  CacheConfig,
  Environment,
  Network,
  QueryResponseCache,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';
import { encodeCredentials } from '@ttoss/relay-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';

const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results

const client = generateClient();

export const responseCache: QueryResponseCache = new QueryResponseCache({
  size: 100,
  ttl: CACHE_TTL,
});

const createNetwork = () => {
  const fetchResponse = async (
    params: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig
  ) => {
    const isQuery = params.operationKind === 'query';
    const cacheKey = params.id ?? params.cacheID;
    const forceFetch = cacheConfig && cacheConfig.force;

    if (responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables);

      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    let credentials: string | undefined;

    try {
      const authSession = await fetchAuthSession();

      if (
        authSession.credentials &&
        authSession.identityId &&
        authSession.credentials?.sessionToken
      ) {
        credentials = encodeCredentials({
          accessKeyId: authSession.credentials?.accessKeyId,
          identityId: authSession.identityId,
          sessionToken: authSession.credentials?.sessionToken,
          secretAccessKey: authSession.credentials?.secretAccessKey,
          expiration: authSession.credentials?.expiration,
          authenticated: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err?.message);
      credentials = undefined;
    }

    const headers: { [key: string]: string } = {};

    if (credentials) {
      headers['x-credentials'] = credentials;
    }

    return client.graphql(
      {
        query: params.text as string,
        variables,
      },
      headers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;
  };

  const network = Network.create(fetchResponse);

  return network;
};

const createEnvironment = () => {
  return new Environment({
    network: createNetwork(),
    store: new Store(RecordSource.create()),
    isServer: false,
  });
};

export const environment = createEnvironment();

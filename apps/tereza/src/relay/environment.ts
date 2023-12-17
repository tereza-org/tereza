/**
 * https://github.com/relayjs/relay-examples/blob/main/issue-tracker-next-v13/src/relay/environment.ts
 */
import {
  CacheConfig,
  Environment,
  GraphQLResponse,
  Network,
  QueryResponseCache,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';
import { fetchQuery } from '@ttoss/relay-amplify';

const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results

export const responseCache: QueryResponseCache = new QueryResponseCache({
  size: 100,
  ttl: CACHE_TTL,
});

const createNetwork = () => {
  const fetchResponse = async (
    params: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig
    // eslint-disable-next-line max-params
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

    return fetchQuery(params, variables, {}) as GraphQLResponse;
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

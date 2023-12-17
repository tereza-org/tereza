// Convert preloaded query object (with raw GraphQL Response) into
// Relay's PreloadedQuery.

import * as React from 'react';
import { ConcreteRequest, OperationType } from 'relay-runtime';
import {
  PreloadFetchPolicy,
  PreloadedQuery,
  useRelayEnvironment,
} from 'react-relay';
import { SerializablePreloadedQuery } from './loadSerializableQuery';
import { responseCache } from './environment';

export type { SerializablePreloadedQuery };

const writePreloadedQueryToCache = <
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
>(
  preloadedQueryObject: SerializablePreloadedQuery<TRequest, TQuery>
) => {
  const cacheKey =
    preloadedQueryObject.params.id ?? preloadedQueryObject.params.cacheID;
  responseCache?.set(
    cacheKey,
    preloadedQueryObject.variables,
    preloadedQueryObject.response
  );
};

// This hook convert serializable preloaded query
// into Relay's PreloadedQuery object.
// It is also writes this serializable preloaded query
// into QueryResponseCache, so we the network layer
// can use these cache results when fetching data
// in `usePreloadedQuery`.
export const useSerializablePreloadedQuery = <
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
>(
  preloadQuery: SerializablePreloadedQuery<TRequest, TQuery>,
  fetchPolicy: PreloadFetchPolicy = 'store-or-network'
  // eslint-disable-next-line max-params
): PreloadedQuery<TQuery> => {
  const environment = useRelayEnvironment();

  React.useMemo(() => {
    writePreloadedQueryToCache(preloadQuery);
  }, [preloadQuery]);

  return {
    environment,
    fetchKey: preloadQuery.params.id ?? preloadQuery.params.cacheID,
    fetchPolicy,
    isDisposed: false,
    name: preloadQuery.params.name,
    kind: 'PreloadedQuery',
    variables: preloadQuery.variables,
    dispose: () => {
      return;
    },
  };
};

import { ConcreteRequest } from 'relay-runtime/lib/util/RelayConcreteNode';
import {
  GraphQLResponse,
  OperationType,
  RequestParameters,
  VariablesOf,
} from 'relay-runtime';
import { fetchSSR } from 'src/amplify/amplifySSR';
import { graphqlOperation } from 'aws-amplify';

export interface SerializablePreloadedQuery<
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
> {
  params: TRequest['params'];
  variables: VariablesOf<TQuery>;
  response: GraphQLResponse;
}

// Call into raw network fetch to get serializable GraphQL query response
// This response will be sent to the client to "warm" the QueryResponseCache
// to avoid the client fetches.
export const loadSerializableQuery = async <
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
>(
  params: RequestParameters,
  variables: VariablesOf<TQuery>
): Promise<SerializablePreloadedQuery<TRequest, TQuery>> => {
  const response = await fetchSSR(graphqlOperation(params.text, variables));

  return {
    params,
    variables,
    response,
  };
};

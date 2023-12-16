import { graphql, loadQuery } from 'react-relay';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';
import { zettelHomeLoaderRootQuery } from './__generated__/zettelHomeLoaderRootQuery.graphql';

export const zettelHomeRootQuery = graphql`
  query zettelHomeLoaderRootQuery {
    zettel {
      notes {
        edges {
          node {
            id
            title
            group
          }
        }
      }
    }
  }
`;

export const zettelHomeLoader = async () => {
  const zettelHomeRootQueryRef = loadQuery<zettelHomeLoaderRootQuery>(
    relayEnvironment,
    zettelHomeRootQuery,
    {},
    {
      fetchPolicy: 'store-and-network',
    }
  );

  return { zettelHomeRootQueryRef };
};

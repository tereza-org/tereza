import { graphql, loadQuery } from 'react-relay';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';
import { zettelGraphLoaderRootQuery } from './__generated__/zettelGraphLoaderRootQuery.graphql';

export const zettelGraphRootQuery = graphql`
  query zettelGraphLoaderRootQuery {
    zettel {
      ...ZettelGraphFragment_queryZettel
    }
  }
`;

export const zettelGraphLoader = async () => {
  const zettelGraphRootQueryRef = loadQuery<zettelGraphLoaderRootQuery>(
    relayEnvironment,
    zettelGraphRootQuery,
    {}
  );

  return { zettelGraphRootQueryRef };
};

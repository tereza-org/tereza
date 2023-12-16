import { graphql, loadQuery } from 'react-relay';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';
import { zettelTagsLoaderRootQuery } from './__generated__/zettelTagsLoaderRootQuery.graphql';

export const zettelTagsRootQuery = graphql`
  query zettelTagsLoaderRootQuery {
    zettel {
      ...ZettelTagsList_queryZettel
    }
  }
`;

export const zettelTagsLoader = async () => {
  const zettelTagsRootQueryRef = loadQuery<zettelTagsLoaderRootQuery>(
    relayEnvironment,
    zettelTagsRootQuery,
    {}
  );

  return { zettelTagsRootQueryRef };
};

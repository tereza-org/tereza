import { graphql, loadQuery } from 'react-relay';
import { journalAllLoaderRootQuery } from './__generated__/journalAllLoaderRootQuery.graphql';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';

export const journalAllRootQuery = graphql`
  query journalAllLoaderRootQuery {
    ...JournalAllJournalListFragment_query
  }
`;

export const journalAllLoader = async () => {
  const journalAllRootQueryRef = loadQuery<journalAllLoaderRootQuery>(
    relayEnvironment,
    journalAllRootQuery,
    {}
  );

  return { journalAllRootQueryRef };
};

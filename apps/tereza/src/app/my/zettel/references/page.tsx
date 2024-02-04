import { ZettelReferences } from './ZettelReferences';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import ZettelReferencesQueryNode, {
  type ZettelReferencesQuery,
} from './__generated__/ZettelReferencesQuery.graphql';

const ZettelReferencesPage = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof ZettelReferencesQueryNode,
    ZettelReferencesQuery
  >(ZettelReferencesQueryNode.params, {});

  return <ZettelReferences preloadedQuery={preloadedQuery} />;
};

export default ZettelReferencesPage;

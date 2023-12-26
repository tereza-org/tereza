import { ZettelAll } from './ZettelAll';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import ZettelAllQueryNode, {
  type ZettelAllQuery,
} from './__generated__/ZettelAllQuery.graphql';

const ZettelAllPage = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof ZettelAllQueryNode,
    ZettelAllQuery
  >(ZettelAllQueryNode.params, {});

  return <ZettelAll preloadedQuery={preloadedQuery} />;
};

export default ZettelAllPage;

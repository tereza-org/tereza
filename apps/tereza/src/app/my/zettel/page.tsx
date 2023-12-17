import { ZettelHome } from './ZettelHome';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import ZettelHomeQueryNode, {
  ZettelHomeQuery,
} from './__generated__/ZettelHomeQuery.graphql';

const ZettelPage = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof ZettelHomeQueryNode,
    ZettelHomeQuery
  >(ZettelHomeQueryNode.params, {});

  return <ZettelHome preloadedQuery={preloadedQuery} />;
};

export default ZettelPage;

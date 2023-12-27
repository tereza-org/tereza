import { ZettelEditor } from './ZettelEditor';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import ZettelEditorQueryNode, {
  type ZettelEditorQuery,
} from './__generated__/ZettelEditorQuery.graphql';

const ZettelIdEditorPage = async ({ params }: { params: { id: string } }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof ZettelEditorQueryNode,
    ZettelEditorQuery
  >(ZettelEditorQueryNode.params, {
    id: decodeURIComponent(params.id),
  });

  return <ZettelEditor preloadedQuery={preloadedQuery} />;
};

export default ZettelIdEditorPage;

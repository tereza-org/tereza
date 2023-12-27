import { ZettelNote } from './ZettelNote';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import ZettelNoteQueryNode, {
  ZettelNoteQuery,
} from './__generated__/ZettelNoteQuery.graphql';

const ZettelIdPage = async ({ params }: { params: { id: string } }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof ZettelNoteQueryNode,
    ZettelNoteQuery
  >(ZettelNoteQueryNode.params, {
    id: decodeURIComponent(params.id),
  });

  return <ZettelNote preloadedQuery={preloadedQuery} />;
};

export default ZettelIdPage;

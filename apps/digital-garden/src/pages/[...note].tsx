import { NotePage } from '../components/NotePage';
import { zettel } from '../lib/zettel';

export const getStaticPaths = async () => {
  const notes = await zettel.getNotes();

  const paths = notes.map((note) => {
    /**
     * Group has the format folder1/folder2/folder3. We need to remove the
     * first slash and split the string into an array.
     */
    const splitGroup = note.group.split('/').filter((item) => {
      return !!item;
    });

    return {
      params: {
        note: [...splitGroup, note.slug],
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { note: string[] };
}) => {
  /**
   * id is the format folder1/folder2/folder3/slug or /slug.
   */
  const noteId = (() => {
    const { note } = params;

    if (note.length === 1) {
      return `/${note[0]}`;
    }

    return note.join('/');
  })();

  const note = await zettel.getNote(noteId);

  const recommendations = await zettel.getRecommendations({
    note: { id: noteId },
  });

  return {
    props: { note, recommendations },
  };
};

// eslint-disable-next-line import/no-default-export
export default NotePage;

import { Note, NoteMetadata } from '@tereza-tech/zettel';
import { Recommendations } from './Recommendations';

export const NotePage = ({
  note,
  recommendations,
}: {
  note: Note;
  recommendations: NoteMetadata[];
}) => {
  return (
    <div>
      <h1>{note.title}</h1>
      {note.content}
      <hr />
      <Recommendations recommendations={recommendations} />
    </div>
  );
};

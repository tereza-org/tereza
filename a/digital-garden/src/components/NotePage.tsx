import { Note } from '@tereza-tech/zettel';
import { Recommendations } from './Recommendations';

export const NotePage = ({ note }: { note: Note }) => {
  return (
    <div>
      <h1>{note.title}</h1>
      {note.content}
      <hr />
      <Recommendations recommendations={note.recommendations} />
    </div>
  );
};

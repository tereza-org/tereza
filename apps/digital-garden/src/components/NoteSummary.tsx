import { NoteMetadata } from '@tereza-tech/zettel';

export const NoteSummary = ({ note }: { note: NoteMetadata }) => {
  return (
    <div>
      <h3>
        <a href={note.href}>{note.title}</a>
      </h3>
    </div>
  );
};

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
type RequiredParams = {
  group: string;
  title: string;
};

export type FolderNotesListProps<Note extends RequiredParams = any> = {
  onGroupClick?: (group: string) => void;
  onNoteClick?: (note: Note) => void;
  notes: Note[];
};

export const FolderNotesList = <Note extends RequiredParams>({
  notes,
  onNoteClick,
}: FolderNotesListProps<Note>) => {
  return (
    <ul>
      {notes.map((note) => {
        return (
          <li key={note.group + note.title}>
            <a
              onClick={() => {
                onNoteClick?.(note);
              }}
            >
              {note.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

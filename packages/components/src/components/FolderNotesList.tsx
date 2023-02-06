import { Text } from '@ttoss/ui';

type RequiredParams = {
  group: string;
  title: string;
};

export type FolderNotesListProps<Note extends RequiredParams = any> = {
  onGroupClick?: (group: string) => void;
  onNoteClick?: (note: Note) => void;
  onNoteDelete?: (note: Note) => void;
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
            <Text
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                ':hover': {
                  color: 'primary',
                },
              }}
              onClick={() => {
                onNoteClick?.(note);
              }}
            >
              {note.title}
            </Text>
          </li>
        );
      })}
    </ul>
  );
};

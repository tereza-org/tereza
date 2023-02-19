import * as React from 'react';
import { Editor } from '@tereza-tech/components';
import { JournalEditorMutation } from './__generated__/JournalEditorMutation.graphql';
import { graphql, useMutation } from 'react-relay';
import { useAutosave } from 'react-autosave';

export const JournalEditor = ({
  editable = false,
  text,
  date,
}: {
  editable?: boolean;
  text?: string;
  date: string;
}) => {
  const [saveJournal, isInFlight] = useMutation<JournalEditorMutation>(
    graphql`
      mutation JournalEditorMutation($journal: JournalInput!) {
        journal {
          saveJournal(journal: $journal) {
            id
          }
        }
      }
    `
  );

  const [currentValue, setCurrentValue] = React.useState(text);

  useAutosave({
    data: isInFlight ? '' : currentValue,
    onSave: (data) => {
      if (!data) {
        return;
      }

      if (data === text) {
        return;
      }

      saveJournal({
        variables: {
          journal: {
            date,
            text: data,
          },
        },
      });
    },
    saveOnUnmount: true,
    interval: 2000,
  });

  return (
    <Editor
      key={date}
      editable={editable}
      initialValue={text}
      onChange={setCurrentValue}
    />
  );
};

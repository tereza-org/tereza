import * as React from 'react';
import { Editor } from '@tereza-tech/components';
import { JournalEditorMutation } from './__generated__/JournalEditorMutation.graphql';
import { graphql, useMutation } from 'react-relay';
import { useDebouncedCallback } from 'use-debounce';

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
            # We need to refetch the query to update the Editor.
            ...JournalDay_journal
          }
        }
      }
    `
  );

  const onChange = useDebouncedCallback(
    (newText: string) => {
      if (newText === text) {
        return;
      }

      saveJournal({
        variables: {
          journal: {
            date,
            text: newText,
          },
        },
      });
    },
    2000,
    {
      maxWait: 5000,
    }
  );

  /**
   * When the component goes to be unmounted, we will save if the input has changed.
   */
  React.useEffect(() => {
    return () => {
      onChange.flush();
    };
  }, [onChange, date]);

  return <Editor editable={editable} initialValue={text} onChange={onChange} />;
};

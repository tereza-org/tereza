import * as React from 'react';
import { Editor, EditorRef } from '@tereza-tech/components';
import { JournalEditorMutation } from './__generated__/JournalEditorMutation.graphql';
import { graphql, useMutation } from 'react-relay';
import { useDebouncedCallback } from 'use-debounce';

export type { EditorRef };

export const JournalEditor = React.forwardRef<
  EditorRef,
  { text?: string; date: string }
>(({ text, date }, ref) => {
  const [saveJournal, isInFlight] = useMutation<JournalEditorMutation>(
    graphql`
      mutation JournalEditorMutation($journal: JournalInput!) {
        journal {
          saveJournal(journal: $journal) {
            # We need to refetch the query to update the Editor.
            ...JournalDayEditor_journal
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
    5 * 1000,
    {
      maxWait: 30 * 1000,
      /**
       * Add the leading to remove daily questions immediately.
       */
      leading: true,
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

  return <Editor initialValue={text} onChange={onChange} ref={ref} />;
});

JournalEditor.displayName = 'JournalEditor';

import * as React from 'react';
import { Box, Flex, Text } from '@ttoss/ui';
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

  const [savingStatus, setSavingStatus] = React.useState('Not saved');

  const [errorOnSave, setErrorOnSave] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (isInFlight) {
      setSavingStatus('Saving...');
    }
  }, [isInFlight]);

  const save = useDebouncedCallback(
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
        onCompleted: () => {
          setSavingStatus('Saved');
        },
        onError: (error) => {
          setErrorOnSave(error);
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

  const onChange = React.useCallback(
    (newText: string) => {
      setSavingStatus('Not saved');
      save(newText);
    },
    [save]
  );

  /**
   * When the component goes to be unmounted, we will save if the input has changed.
   */
  React.useEffect(() => {
    return () => {
      save.flush();
    };
  }, [save, date]);

  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Text
        sx={{
          fontSize: 'sm',
          color: '#999',
          fontStyle: 'italic',
          alignSelf: 'flex-end',
        }}
      >
        {savingStatus}
      </Text>

      <Editor initialValue={text} onChange={onChange} ref={ref} />
      <Box
        sx={{
          marginY: 'xl',
        }}
      >
        {errorOnSave && (
          <Text
            sx={{
              color: 'red',
            }}
          >
            Error on save: {errorOnSave.message}
          </Text>
        )}
      </Box>
    </Flex>
  );
});

JournalEditor.displayName = 'JournalEditor';

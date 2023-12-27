import * as React from 'react';
import { Box, Flex, Text } from '@ttoss/ui';
import { Editor, EditorRef } from '@tereza-tech/components';
import { JournalEditorMutation } from './__generated__/JournalEditorMutation.graphql';
import { graphql, useMutation } from 'react-relay';

export type { EditorRef };

export const JournalEditor = React.forwardRef<
  EditorRef,
  { text?: string; date: string }
>(({ text, date }, ref) => {
  const [saveJournal] = useMutation<JournalEditorMutation>(graphql`
    mutation JournalEditorMutation($journal: JournalInput!) {
      journal {
        saveJournal(journal: $journal) {
          # We need to refetch the query to update the Editor.
          ...JournalEditor_journal
        }
      }
    }
  `);

  const [errorOnSave, setErrorOnSave] = React.useState<Error | null>(null);

  const onSave = React.useCallback(
    (newText: string) => {
      return new Promise<void>((resolve) => {
        if (newText === text) {
          resolve();
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
            resolve();
          },
          onError: (error) => {
            setErrorOnSave(error);
          },
        });
      });
    },
    [date, saveJournal, text]
  );

  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Editor
        ref={ref}
        initialValue={text}
        onSave={onSave}
        autoSaveConfig={{
          enabled: true,
          delay: 5 * 1000,
          maxWait: 30 * 1000,
        }}
      />
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

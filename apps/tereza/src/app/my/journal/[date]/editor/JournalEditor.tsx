'use client';

import * as React from 'react';
import { Box, Button, Flex, Heading, Text } from '@ttoss/ui';
import {
  EditorRef,
  JournalEditor as JournalEditorComponent,
} from 'src/modules/Journal/JournalEditor';
import { ErrorBoundary } from 'react-error-boundary';
import { JournalEditorQuestions_queryJournal$key } from './__generated__/JournalEditorQuestions_queryJournal.graphql';
import { JournalEditor_journal$key } from './__generated__/JournalEditor_journal.graphql';
import { Loading } from 'src/modules/Layout/Loading';
import {
  PreloadedQuery,
  graphql,
  useFragment,
  usePreloadedQuery,
} from 'react-relay';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import JournalEditorQueryNode, {
  JournalEditorQuery,
} from './__generated__/JournalEditorQuery.graphql';

const JournalQuestions = ({
  onApplyQuestions,
  queryJournalRef,
}: {
  onApplyQuestions: (value: string) => void;
  queryJournalRef: JournalEditorQuestions_queryJournal$key;
}) => {
  const { journal, questions } = useFragment(
    graphql`
      fragment JournalEditorQuestions_queryJournal on QueryJournal {
        journal(date: $date) {
          text
        }
        questions {
          daily(date: $date) {
            question
          }
        }
      }
    `,
    queryJournalRef
  );

  const disabled = !!journal?.text;

  const questionsTemplate = questions?.daily
    .map(({ question }) => {
      return `# ${question}`;
    })
    .join('\n\n');

  const headline = `Your daily questions.`;

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 'sm',
        marginY: 'xl',
        alignItems: 'flex-start',
      }}
    >
      <Text
        sx={{
          fontStyle: 'italic',
        }}
      >
        {headline}
      </Text>
      {questions && questionsTemplate && (
        <>
          <ul>
            {questions.daily.map(({ question }) => {
              return (
                <Text key={question} as="li">
                  {question}
                </Text>
              );
            })}
          </ul>
          <Button
            disabled={disabled}
            onClick={() => {
              return onApplyQuestions(questionsTemplate);
            }}
          >
            Apply Questions?
          </Button>
        </>
      )}
    </Flex>
  );
};

const JournalEditorWithErrorBoundary = React.forwardRef<
  EditorRef,
  { journalRef: JournalEditor_journal$key }
>(({ journalRef }, ref) => {
  const { id, date, text } = useFragment(
    graphql`
      fragment JournalEditor_journal on Journal {
        id
        date
        text
      }
    `,
    journalRef
  );

  const [retry, setRetry] = React.useState(false);

  const debouncedRetry = useDebounce(retry, 500);

  return (
    <ErrorBoundary
      resetKeys={[debouncedRetry]}
      fallbackRender={({ error }) => {
        if (!retry) {
          setRetry(true);
          return null;
        }

        return (
          <Text>
            There was an error loading the editor. Please try again later.
            {error.message}
          </Text>
        );
      }}
    >
      <JournalEditorComponent
        ref={ref}
        /**
         * We use the id as key here to force the editor to re-render when the
         * journal changes. This is a workaround for the fact that the editor
         * doesn't re-render when the text prop changes. See:
         * https://lexical.dev/docs/concepts/editor-state#understanding-the-editor-state
         */
        key={id}
        date={date}
        text={text}
      />
    </ErrorBoundary>
  );
});

JournalEditorWithErrorBoundary.displayName = 'JournalEditorWithErrorBoundary';

const JournalEditorWithQuestions = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<JournalEditorQuery>;
}) => {
  const editorRef = React.useRef<EditorRef>(null);

  const { journal } = usePreloadedQuery(
    graphql`
      query JournalEditorQuery($date: String!) {
        journal {
          ...JournalEditorQuestions_queryJournal
          journal(date: $date) {
            ...JournalEditor_journal
          }
        }
      }
    `,
    queryRef
  );

  const onApplyQuestions = (value: string) => {
    if (editorRef.current) {
      editorRef.current.updateValue(value);
    }
  };

  return (
    <>
      {journal && (
        <JournalQuestions
          onApplyQuestions={onApplyQuestions}
          queryJournalRef={journal}
        />
      )}
      {journal?.journal && (
        <JournalEditorWithErrorBoundary
          ref={editorRef}
          journalRef={journal.journal}
        />
      )}
    </>
  );
};

export const JournalEditor = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalEditorQueryNode,
    JournalEditorQuery
  >;
}) => {
  const router = useRouter();

  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const date = queryRef.variables.date;

  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Heading
          as="h3"
          sx={{
            marginBottom: 'md',
          }}
        >
          Editing {date}
        </Heading>
        <React.Suspense fallback={<Loading />}>
          <JournalEditorWithQuestions queryRef={queryRef} />
        </React.Suspense>
        <Button
          onClick={() => {
            router.push(`/my/journal/${date}`);
          }}
        >
          Finish
        </Button>
      </Box>
    </>
  );
};

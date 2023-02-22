import * as React from 'react';
import { Box, Button, Flex, Heading, Text } from '@ttoss/ui';
import { EditorRef, JournalEditor } from './JournalEditor';
import { ErrorBoundary } from 'react-error-boundary';
import { JournalDayEditorNoEntryMessage_queryJournal$key } from './__generated__/JournalDayEditorNoEntryMessage_queryJournal.graphql';
import {
  JournalDayEditorQuery,
  JournalDayEditorQuery$data,
} from './__generated__/JournalDayEditorQuery.graphql';
import { JournalDayEditor_journal$key } from './__generated__/JournalDayEditor_journal.graphql';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { getToday, isValidDate } from '../Date/utils';
import {
  graphql,
  loadQuery,
  useFragment,
  usePreloadedQuery,
} from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';
import { useDebounce } from 'use-debounce';

export const journalDayQuery = graphql`
  query JournalDayEditorQuery($date: String!) {
    journal {
      ...JournalDayEditorNoEntryMessage_queryJournal
      journalDay(date: $date) {
        ...JournalDayEditor_journal
      }
    }
  }
`;

export const journalDayEditorLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { date = getToday() } = params;

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const queryRef = loadQuery<JournalDayEditorQuery>(
    relayEnvironment,
    journalDayQuery,
    { date }
  );

  return { date, queryRef };
};

const JournalDayNoEntryMessage = ({
  onApplyQuestions,
  queryJournalRef,
}: {
  onApplyQuestions: (value: string) => void;
  queryJournalRef: JournalDayEditorNoEntryMessage_queryJournal$key;
}) => {
  const { journalDay, questions } = useFragment(
    graphql`
      fragment JournalDayEditorNoEntryMessage_queryJournal on QueryJournal {
        journalDay(date: $date) {
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

  if (journalDay?.text) {
    return null;
  }

  const questionsTemplate = questions?.daily
    .map(({ question }) => {
      return `# ${question}`;
    })
    .join('\n\n');

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
        No journal for this day. Would you like to apply the daily questions?
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

const JournalDayEditorWithErrorBoundary = React.forwardRef<
  EditorRef,
  { journalRef: JournalDayEditor_journal$key }
>(({ journalRef }, ref) => {
  const { id, date, text } = useFragment(
    graphql`
      fragment JournalDayEditor_journal on Journal {
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
      <JournalEditor
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

JournalDayEditorWithErrorBoundary.displayName =
  'JournalDayEditorWithErrorBoundary';

const JournalDayEditorWithNoEntryMessage = ({
  journal,
}: JournalDayEditorQuery$data) => {
  const editorRef = React.useRef<EditorRef>(null);

  const onApplyQuestions = (value: string) => {
    if (editorRef.current) {
      editorRef.current.updateValue(value);
    }
  };

  return (
    <>
      {journal && (
        <React.Suspense>
          <JournalDayNoEntryMessage
            onApplyQuestions={onApplyQuestions}
            queryJournalRef={journal}
          />
        </React.Suspense>
      )}
      {journal?.journalDay && (
        <JournalDayEditorWithErrorBoundary
          ref={editorRef}
          journalRef={journal.journalDay}
        />
      )}
    </>
  );
};

const JournalDayEditorPreloader = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayEditorLoader>
  >;

  const { journal } = usePreloadedQuery(journalDayQuery, queryRef);

  if (!journal) {
    return null;
  }

  return <JournalDayEditorWithNoEntryMessage journal={journal} />;
};

export const JournalDayEditor = () => {
  const navigate = useNavigate();

  const { date } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayEditorLoader>
  >;

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
        alignItems: 'flex-start',
      }}
    >
      <Heading as="h1">Journal Editor</Heading>
      <Box>
        <Heading
          as="h3"
          sx={{
            marginBottom: 'md',
          }}
        >
          Editing {date}
        </Heading>
        <React.Suspense fallback={<div>Loading...</div>}>
          <JournalDayEditorPreloader />
        </React.Suspense>
      </Box>
      <Button
        onClick={() => {
          navigate(`/journal/${date}`);
        }}
      >
        Finish
      </Button>
    </Flex>
  );
};

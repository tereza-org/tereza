import * as React from 'react';
import { Box, Button, Flex, Heading, Text } from '@ttoss/ui';
import { DatePicker } from '../Date/DatePicker';
import { EditorRef, JournalEditor } from './JournalEditor';
import { ErrorBoundary } from 'react-error-boundary';
import { JournalDayNoEntryMessage_queryJournal$key } from './__generated__/JournalDayNoEntryMessage_queryJournal.graphql';
import {
  JournalDayQuery,
  JournalDayQuery$data,
} from './__generated__/JournalDayQuery.graphql';
import { JournalDay_journal$key } from './__generated__/JournalDay_journal.graphql';
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
  query JournalDayQuery($date: String!) {
    journal {
      ...JournalDayNoEntryMessage_queryJournal
      journalDay(date: $date) {
        ...JournalDay_journal
      }
    }
  }
`;

export const journalDayLoader = async ({ params }: LoaderFunctionArgs) => {
  const { date = getToday() } = params;

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const queryRef = loadQuery<JournalDayQuery>(
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
  queryJournalRef: JournalDayNoEntryMessage_queryJournal$key;
}) => {
  const { journalDay, questions } = useFragment(
    graphql`
      fragment JournalDayNoEntryMessage_queryJournal on QueryJournal {
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

const JournalDayEditor = React.forwardRef<
  EditorRef,
  { journalRef: JournalDay_journal$key }
>(({ journalRef }, ref) => {
  const { id, date, text } = useFragment(
    graphql`
      fragment JournalDay_journal on Journal {
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

JournalDayEditor.displayName = 'JournalDayEditor';

const JournalDayEditorWithNoEntryMessage = ({
  journal,
}: JournalDayQuery$data) => {
  const editorRef = React.useRef<EditorRef>(null);

  const onApplyQuestions = (value: string) => {
    if (editorRef.current) {
      // console.log('onApplyQuestions', value);
      editorRef.current.updateValue(value);
    }
  };

  return (
    <>
      {journal && (
        <JournalDayNoEntryMessage
          onApplyQuestions={onApplyQuestions}
          queryJournalRef={journal}
        />
      )}
      {journal?.journalDay && (
        <JournalDayEditor ref={editorRef} journalRef={journal.journalDay} />
      )}
    </>
  );
};

const JournalDayEditorPreloader = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayLoader>
  >;

  const { journal } = usePreloadedQuery(journalDayQuery, queryRef);

  if (!journal) {
    return null;
  }

  return <JournalDayEditorWithNoEntryMessage journal={journal} />;
};

export const JournalDay = () => {
  const navigate = useNavigate();

  const { date } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayLoader>
  >;

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Journal Day</Heading>
      <DatePicker
        value={date}
        onChange={(date) => {
          navigate(`/journal/${date}`);
        }}
      />
      <Box>
        <Heading
          as="h3"
          sx={{
            marginBottom: 'md',
          }}
        >
          On this day
        </Heading>
        <React.Suspense fallback={<div>Loading...</div>}>
          <JournalDayEditorPreloader />
        </React.Suspense>
      </Box>
    </Flex>
  );
};

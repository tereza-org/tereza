import * as React from 'react';
import { Box, Button, Flex, Heading, Text } from '@ttoss/ui';
import { EditorRef, JournalEditor } from '../JournalEditor';
import { ErrorBoundary } from 'react-error-boundary';
import { JournalDayEditorQuestions_queryJournal$key } from './__generated__/JournalDayEditorQuestions_queryJournal.graphql';
import { JournalDayEditor_journal$key } from './__generated__/JournalDayEditor_journal.graphql';
import { ModuleMain } from '../../Layout';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import {
  journalDayEditorLoader,
  journalDayEditorRootQuery,
} from './journalDayEditorLoader';
import { journalDayEditorLoaderRootQuery$data } from './__generated__/journalDayEditorLoaderRootQuery.graphql';
import { useDebounce } from 'use-debounce';
import { useLoaderData, useNavigate } from 'react-router-dom';

const JournalDayQuestions = ({
  onApplyQuestions,
  queryJournalRef,
}: {
  onApplyQuestions: (value: string) => void;
  queryJournalRef: JournalDayEditorQuestions_queryJournal$key;
}) => {
  const { journalDay, questions } = useFragment(
    graphql`
      fragment JournalDayEditorQuestions_queryJournal on QueryJournal {
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

  const disabled = !!journalDay?.text;

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

const JournalDayEditorWithQuestions = ({
  journal,
}: journalDayEditorLoaderRootQuery$data) => {
  const editorRef = React.useRef<EditorRef>(null);

  const onApplyQuestions = (value: string) => {
    if (editorRef.current) {
      editorRef.current.updateValue(value);
    }
  };

  return (
    <>
      {journal && (
        <JournalDayQuestions
          onApplyQuestions={onApplyQuestions}
          queryJournalRef={journal}
        />
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
  const { journalDayEditorRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayEditorLoader>
  >;

  const { journal } = usePreloadedQuery(
    journalDayEditorRootQuery,
    journalDayEditorRootQueryRef
  );

  if (!journal) {
    return null;
  }

  return <JournalDayEditorWithQuestions journal={journal} />;
};

const JournalDayEditor = () => {
  const navigate = useNavigate();

  const { date } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayEditorLoader>
  >;

  return (
    <ModuleMain title="Journal Editor">
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
    </ModuleMain>
  );
};

export default JournalDayEditor;

import * as React from 'react';
import { Box, Flex, Heading, Text } from '@ttoss/ui';
import { DatePicker } from '../Date/DatePicker';
import { JournalDayQuery } from './__generated__/JournalDayQuery.graphql';
import { JournalDay_journal$key } from './__generated__/JournalDay_journal.graphql';
import { JournalEditor } from './JournalEditor';
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

export const journalDayQuery = graphql`
  query JournalDayQuery($date: String!) {
    journal {
      journalDay(date: $date) {
        ...JournalDay_journal
      }
    }
  }
`;

const journalFragment = graphql`
  fragment JournalDay_journal on Journal {
    id
    date
    text
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

const JournalDayEditor = ({
  journalRef,
}: {
  journalRef: JournalDay_journal$key;
}) => {
  const { id, date, text } = useFragment(journalFragment, journalRef);

  return (
    <>
      {!text && <Text>No journal for this day ;(</Text>}
      <JournalEditor
        /**
         * We use the id as key here to force the editor to re-render when the
         * journal changes. This is a workaround for the fact that the editor
         * doesn't re-render when the text prop changes. See:
         * https://lexical.dev/docs/concepts/editor-state#understanding-the-editor-state
         */
        key={id}
        date={date}
        editable={true}
        text={text}
      />
    </>
  );
};

const JournalDayEditorPreloader = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayLoader>
  >;

  const { journal } = usePreloadedQuery(journalDayQuery, queryRef);

  if (!journal?.journalDay) {
    return null;
  }

  return <JournalDayEditor journalRef={journal.journalDay} />;
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
        <Heading as="h3">On this day</Heading>
        <React.Suspense fallback={<div>Loading...</div>}>
          <JournalDayEditorPreloader />
        </React.Suspense>
      </Box>
    </Flex>
  );
};

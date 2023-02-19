import { Box, Flex, Heading, Text } from '@ttoss/ui';
import { DatePicker } from '../Date/DatePicker';
import { JournalDayQuery } from './__generated__/JournalDayQuery.graphql';
import { JournalEditor } from './JournalEditor';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { getToday, isValidDate } from '../Date/utils';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';
import React from 'react';

const journalDayQuery = graphql`
  query JournalDayQuery($date: String!) {
    journal {
      journalDay(date: $date) {
        text
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

const JournalDayEditor = () => {
  const { date, queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayLoader>
  >;

  const { journal } = usePreloadedQuery(journalDayQuery, queryRef);

  const text = journal?.journalDay?.text || '';

  return (
    <Box>
      <Heading as="h3">On this day</Heading>
      {!text && <Text>No journal for this day ;(</Text>}
      <JournalEditor date={date} editable={false} text={text} />
    </Box>
  );
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <JournalDayEditor />
      </React.Suspense>
    </Flex>
  );
};

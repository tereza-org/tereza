import * as React from 'react';
import { Box, Flex, Heading } from '@ttoss/ui';
import { DatePicker } from '../Date/DatePicker';
import { JournalDayQuery } from './__generated__/JournalDayQuery.graphql';
import { JournalMarkdown } from './JournalMarkdown';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { getToday, isValidDate } from '../Date/utils';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';

export const journalDayQuery = graphql`
  query JournalDayQuery($date: String!) {
    journal {
      journalDay(date: $date) {
        date
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

const JournalDayPreloader = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayLoader>
  >;

  const { journal } = usePreloadedQuery(journalDayQuery, queryRef);

  if (!journal?.journalDay) {
    return null;
  }

  const { date, text } = journal.journalDay;

  return <JournalMarkdown date={date} label={date} text={text} />;
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
          <JournalDayPreloader />
        </React.Suspense>
      </Box>
    </Flex>
  );
};

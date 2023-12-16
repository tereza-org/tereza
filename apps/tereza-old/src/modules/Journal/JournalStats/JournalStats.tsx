import { Box, Flex, Heading, Text } from '@ttoss/ui';
import { JournalStatsGroupDate_journalStatsGroupDate$key } from './__generated__/JournalStatsGroupDate_journalStatsGroupDate.graphql';
import { JournalStatsGroupDates_journalStats$key } from './__generated__/JournalStatsGroupDates_journalStats.graphql';
import { JournalStatsTexts_journalStats$key } from './__generated__/JournalStatsTexts_journalStats.graphql';
import { Suspense } from '../../Layout';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import {
  journalStatsLoader,
  journalStatsRootQuery,
} from './journalStatsLoader';
import { useLoaderData, useNavigate } from 'react-router-dom';

const StatsTexts = ({
  statsRef,
}: {
  statsRef: JournalStatsTexts_journalStats$key;
}) => {
  const { initialDate, maxStreak, missingDatesCount, count } = useFragment(
    graphql`
      fragment JournalStatsTexts_journalStats on JournalStats {
        initialDate
        maxStreak
        missingDatesCount
        count
      }
    `,
    statsRef
  );

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 'md',
      }}
    >
      <Text>
        <b>{initialDate}</b> is the first day
      </Text>
      <Text>
        <b>{count}</b> days total
      </Text>
      <Text>
        <b>{maxStreak}</b> days in a row
      </Text>
      <Text>
        <b>{missingDatesCount}</b> missing days
      </Text>
    </Flex>
  );
};

const GroupDateDay = ({ day, missing }: { day: string; missing: boolean }) => {
  return (
    <Box
      sx={{
        padding: 'lg',
        border: '1px solid',
        borderColor: 'black',
        backgroundColor: missing ? 'red' : 'transparent',
        cursor: 'pointer',
      }}
    >
      {day}
    </Box>
  );
};

const GroupDate = ({
  groupDateRef,
}: {
  groupDateRef: JournalStatsGroupDate_journalStatsGroupDate$key;
}) => {
  const { month, days } = useFragment(
    graphql`
      fragment JournalStatsGroupDate_journalStatsGroupDate on JournalStatsGroupDate {
        month
        days {
          day
          missing
        }
      }
    `,
    groupDateRef
  );

  const navigate = useNavigate();

  return (
    <Box>
      <Heading as="h3">{month}</Heading>
      <Flex
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 'lg',
          marginY: 'lg',
        }}
      >
        {days.map(({ day, missing }) => {
          return (
            <Box
              key={day}
              onClick={() => {
                const date = `${month}-${day}`;
                navigate(`/journal/${date}`);
              }}
            >
              <GroupDateDay day={day} missing={missing} />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

const GroupDates = ({
  statsRef,
}: {
  statsRef: JournalStatsGroupDates_journalStats$key;
}) => {
  const { groupDates } = useFragment(
    graphql`
      fragment JournalStatsGroupDates_journalStats on JournalStats {
        groupDates {
          month
          ...JournalStatsGroupDate_journalStatsGroupDate
        }
      }
    `,
    statsRef
  );

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 'xl',
      }}
    >
      <Heading as="h2">Days</Heading>
      {groupDates.map((groupDate) => {
        return <GroupDate key={groupDate.month} groupDateRef={groupDate} />;
      })}
    </Flex>
  );
};

const JournalStatusPreloader = () => {
  const { journalStatsRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalStatsLoader>
  >;

  const { journal } = usePreloadedQuery(
    journalStatsRootQuery,
    journalStatsRootQueryRef
  );

  if (!journal?.stats) {
    return null;
  }

  return (
    <>
      <StatsTexts statsRef={journal?.stats} />
      <GroupDates statsRef={journal?.stats} />
    </>
  );
};

const JournalStats = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Journal Stats</Heading>
      <Suspense>
        <JournalStatusPreloader />
      </Suspense>
    </Flex>
  );
};

export default JournalStats;

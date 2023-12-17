'use client';

import { Box, Flex, Heading, Text } from '@ttoss/ui';
import { JournalStatsGroupDate_journalStatsGroupDate$key } from './__generated__/JournalStatsGroupDate_journalStatsGroupDate.graphql';
import { JournalStatsGroupDates_journalStats$key } from './__generated__/JournalStatsGroupDates_journalStats.graphql';
import { JournalStatsTexts_journalStats$key } from './__generated__/JournalStatsTexts_journalStats.graphql';
import {
  type SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/navigation';
import JournalStatsQueryNode, {
  JournalStatsQuery,
} from './__generated__/JournalStatsQuery.graphql';

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
  const backgroundColor = (() => {
    if (missing) {
      return 'red';
    }

    return 'transparent';
  })();

  return (
    <Box
      sx={{
        padding: 'lg',
        border: '1px solid',
        borderColor: 'black',
        backgroundColor,
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
  const router = useRouter();

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
                router.push(`/my/journal/${date}`);
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

export const JournalStats = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalStatsQueryNode,
    JournalStatsQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const { journal } = usePreloadedQuery(
    graphql`
      query JournalStatsQuery($today: String!) {
        journal {
          stats(today: $today) {
            ...JournalStatsTexts_journalStats
            ...JournalStatsGroupDates_journalStats
          }
        }
      }
    `,
    queryRef
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

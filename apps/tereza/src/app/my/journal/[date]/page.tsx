'use client';

import { Box, Flex, Heading } from '@ttoss/ui';
import { DatePicker } from 'src/modules/Date/DatePicker';
import { useRouter } from 'next/navigation';

const JournalDatePage = () => {
  const router = useRouter();

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Journal Day</Heading>
      <DatePicker
        value={'2022-02-02'}
        onChange={(date) => {
          router.push(`/my/journal/${date}`);
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
      </Box>
    </Flex>
  );
};

export default JournalDatePage;

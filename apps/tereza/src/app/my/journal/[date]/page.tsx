'use client';

import { DatePicker } from 'src/modules/Date/DatePicker';
import { Heading } from '@ttoss/ui';
import { useRouter } from 'next/navigation';

const JournalDatePage = ({ params }: { params: { date: string } }) => {
  const router = useRouter();

  return (
    <>
      <Heading as="h1">Journal Day</Heading>
      <DatePicker
        value={params.date}
        onChange={(date) => {
          router.push(`/my/journal/${date}`);
        }}
      />
    </>
  );
};

export default JournalDatePage;

'use client';

import { DatePicker } from 'src/modules/Date/DatePicker';
import { useRouter } from 'next/navigation';

const JournalDatePage = ({ params }: { params: { date: string } }) => {
  const router = useRouter();

  return (
    <>
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

'use client';

// import { usePathname } from 'next/navigation';

const JournalDateLayout = ({
  children,
  journalDay,
}: {
  children: React.ReactNode;
  journalDay: React.ReactNode;
}) => {
  // const pathname = usePathname();

  return (
    <>
      {children}
      {journalDay}
    </>
  );
};

export default JournalDateLayout;

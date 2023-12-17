'use client';

import { Heading } from '@ttoss/ui';

const JournalLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  journalSummary: React.ReactNode;
  title: React.ReactNode;
}) => {
  return (
    <>
      <Heading as="h1">{title}</Heading>
      {children}
    </>
  );
};

export default JournalLayout;

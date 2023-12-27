'use client';

import { usePathname } from 'next/navigation';

const JournalDateLayout = ({
  children,
  journal,
  params,
}: {
  children: React.ReactNode;
  journal: React.ReactNode;
  params: {
    date: string;
  };
}) => {
  const pathname = usePathname();

  if (pathname === `/my/journal/${params.date}`) {
    return (
      <>
        {children}
        {journal}
      </>
    );
  }

  return <>{children}</>;
};

export default JournalDateLayout;

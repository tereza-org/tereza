'use client';

import { FormattedMessage } from '@ttoss/react-i18n';
import { Heading } from '@ttoss/ui';
import { usePathname } from 'next/navigation';

const JournalLayout = ({
  children,
  journalSummary,
}: {
  children: React.ReactNode;
  journalSummary: React.ReactNode;
}) => {
  const pathname = usePathname();

  if (pathname === '/my/journal') {
    return (
      <>
        <Heading as="h1">
          <FormattedMessage
            defaultMessage="Journal Summary"
            description="Journal summary page title"
          />
        </Heading>
        {journalSummary}
      </>
    );
  }

  return <>{children}</>;
};

export default JournalLayout;

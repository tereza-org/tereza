'use client';

import { FormattedMessage } from '@ttoss/react-i18n';
import { Heading } from '@ttoss/ui';

const JournalDayEditorLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Heading as="h1">
        <FormattedMessage
          defaultMessage="Journal Summary"
          description="Journal summary page title"
        />
      </Heading>
      {children}
    </>
  );
};

export default JournalDayEditorLayout;

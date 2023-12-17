'use client';

import { FormattedMessage } from '@ttoss/react-i18n';
import { Heading } from '@ttoss/ui';

const JournalPage = () => {
  return (
    <>
      <Heading as="h1">
        <FormattedMessage
          defaultMessage="Journal Summary"
          description="Journal summary page title"
        />
      </Heading>
    </>
  );
};

export default JournalPage;

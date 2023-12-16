'use client';

import { Flex, Heading } from '@ttoss/ui';
import { FormattedMessage } from '@ttoss/react-i18n';

const JournalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">
        <FormattedMessage
          defaultMessage="Journal Summary"
          description="Journal summary page title"
        />
      </Heading>
      {children}
    </Flex>
  );
};

export default JournalLayout;

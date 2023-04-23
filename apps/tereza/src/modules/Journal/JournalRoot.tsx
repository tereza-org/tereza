import { Flex, Icon } from '@ttoss/ui';
import { ModuleContainer } from '../Layout/ModuleContainer';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToday } from '../Date/utils';
import { useI18n } from '@ttoss/react-i18n';

export const JournalRoot = () => {
  const navigate = useNavigate();

  const { intl } = useI18n();

  return (
    <ModuleContainer
      title="Journal"
      links={[
        {
          label: intl.formatMessage({
            defaultMessage: 'Home',
            description: 'Home page',
          }),
          to: '/journal',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Day',
            description: 'Represents the current day',
          }),
          to: `/journal/${getToday()}`,
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Stats',
            description: 'Statistics abbreviation',
          }),
          to: '/journal/stats',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Questions',
            description: 'Journal questions',
          }),
          to: '/journal/questions',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'All',
            description: 'All journal entries',
          }),
          to: '/journal/all',
        },
      ]}
    >
      <Outlet />
      <Flex
        onClick={() => {
          return navigate(`/journal/${getToday()}/edit`);
        }}
        sx={{
          position: 'absolute',
          bottom: 32,
          right: 32,
          fontSize: '3xl',
          backgroundColor: 'primary',
          color: 'white',
          padding: 'sm',
          borderRadius: '999px',
          cursor: 'pointer',
          width: '50px',
          height: '50px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon icon="material-symbols:edit" />
      </Flex>
    </ModuleContainer>
  );
};

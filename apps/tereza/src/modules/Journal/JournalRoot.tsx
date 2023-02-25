import { Flex, Icon } from '@ttoss/ui';
import { ModuleContainer } from '../Layout/ModuleContainer';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToday } from '../Date/utils';

export const JournalRoot = () => {
  const navigate = useNavigate();

  return (
    <ModuleContainer
      title="Journal"
      links={[
        { label: 'Day', to: `/journal/${getToday()}` },
        { label: 'Summary', to: '/journal' },
        { label: 'Stats', to: '/journal/stats' },
        { label: 'Questions', to: '/journal/questions' },
        { label: 'All', to: '/journal/all' },
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
        <Icon
          {...({
            icon: 'material-symbols:edit',
          } as any)}
        />
      </Flex>
    </ModuleContainer>
  );
};

import { ModuleContainer } from '../Layout/ModuleContainer';
import { Outlet } from 'react-router-dom';
import { getToday } from '../Date/utils';

export const JournalRoot = () => {
  return (
    <ModuleContainer
      title="Journal"
      links={[
        { label: 'Summary', to: '/journal' },
        { label: 'Day', to: `/journal/${getToday()}` },
        { label: 'Stats', to: '/journal/stats' },
      ]}
    >
      <Outlet />
    </ModuleContainer>
  );
};

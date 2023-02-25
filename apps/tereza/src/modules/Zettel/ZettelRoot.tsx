import { ModuleContainer } from '../Layout/ModuleContainer';
import { Outlet } from 'react-router-dom';

export const ZettelRoot = () => {
  return (
    <ModuleContainer
      title="Zettel"
      links={[
        { label: 'Home', to: '/zettel' },
        { label: 'New', to: '/zettel/editor' },
        { label: 'Tags', to: '/zettel/tags' },
      ]}
    >
      <Outlet />
    </ModuleContainer>
  );
};

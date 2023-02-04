import { Flex } from '@ttoss/ui';
import { Link } from 'react-router-dom';

export const AppsNav = () => {
  return (
    <Flex
      sx={{
        gap: 4,
        justifyContent: 'center',
        borderBottom: '1px solid',
        borderTop: '1px solid',
      }}
    >
      <Link to="/zettel">Zettel</Link>
      <Link to="/journal">Journal</Link>
      <Link to="/crm">Personal CRM</Link>
      <Link to="/gym">Gym</Link>
    </Flex>
  );
};

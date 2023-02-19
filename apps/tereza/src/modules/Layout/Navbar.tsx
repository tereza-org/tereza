import { Button, Flex, Text } from '@ttoss/ui';
import { Link } from 'react-router-dom';
import { useAuth } from '@ttoss/react-auth';

export const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        padding: 'lg',
      }}
    >
      <Text>Tereza App</Text>
      <Flex
        sx={{
          gap: 'lg',
        }}
      >
        <Link to="/zettel">Zettel</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/crm">Personal CRM</Link>
        <Link to="/gym">Gym</Link>
      </Flex>
      <Button onClick={signOut}>Sign out</Button>
    </Flex>
  );
};

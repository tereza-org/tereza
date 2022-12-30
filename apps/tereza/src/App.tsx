import { Auth, useAuth } from '@ttoss/react-auth';
import { Flex } from '@ttoss/ui';

export const App = () => {
  const { isAuthenticated, user, signOut } = useAuth();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <Flex>
      <h1>hello</h1>
      <p>{JSON.stringify(user, null, 2)}</p>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </Flex>
  );
};

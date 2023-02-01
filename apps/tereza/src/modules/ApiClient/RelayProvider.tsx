import { RelayEnvironmentProvider } from 'react-relay';
import { relayEnvironment } from './relayEnvironment';

export const RelayProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
};

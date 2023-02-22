import {
  MemoryRouter,
  RouteObject,
  useLoaderData,
  useRoutes,
} from 'react-router-dom';
import {
  MockPayloadGenerator,
  createMockEnvironment,
} from '@ttoss/test-utils/relay';
import { RelayEnvironmentProvider } from 'react-relay';
import { journalDayQuery } from '../../src/modules/Journal/JournalDayEditor';
import { render, screen } from '@ttoss/test-utils';
import { routes } from '../../src/routes';
import { vi } from 'vitest';

vi.mock('@ttoss/react-auth', async (importOriginal) => {
  const mod: any = await importOriginal();

  return {
    ...mod,
    useAuth: vi.fn().mockReturnValue({
      isAuthenticated: true,
    }),
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const mod: any = await importOriginal();

  return {
    ...mod,
    useLoaderData: vi.fn().mockReturnValue({ date: 'asd' }),
  };
});

const RoutesRenderer = ({
  routes,
  location,
}: {
  routes: RouteObject[];
  location?: Partial<Location> & { pathname: string };
}) => {
  return useRoutes(routes, location);
};

test('ad', () => {
  const date = '2023-02-20';

  (useLoaderData as jest.Mock).mockReturnValue({ date });

  const environment = createMockEnvironment();

  environment.mock.queueOperationResolver((operation) => {
    return MockPayloadGenerator.generate(operation, {
      CurrencyAmount: () => {
        return {
          formatted_amount: '1234$',
        };
      },
    });
  });

  const variables = {
    date,
  };

  environment.mock.queuePendingOperation(journalDayQuery, variables);

  render(
    <RelayEnvironmentProvider environment={environment}>
      <MemoryRouter initialEntries={[`/journal/${date}`]}>
        <RoutesRenderer routes={routes} />
      </MemoryRouter>
    </RelayEnvironmentProvider>
  );

  expect(screen.getByText('Journal')).toBeInTheDocument();
});

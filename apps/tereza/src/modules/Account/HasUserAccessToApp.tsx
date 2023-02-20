import { ComingSoon } from '../Layout/ComingSoon';
import { HasUserAccessToAppQuery } from './__generated__/HasUserAccessToAppQuery.graphql';
import { Outlet, useLoaderData } from 'react-router-dom';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';

const hasUserAccessToAppQuery = graphql`
  query HasUserAccessToAppQuery {
    me {
      allowed
    }
  }
`;

export const hasUserAccessToAppLoader = async () => {
  const queryRef = loadQuery<HasUserAccessToAppQuery>(
    relayEnvironment,
    hasUserAccessToAppQuery,
    {}
  );

  return { queryRef };
};

export const HasUserAccessToApp = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof hasUserAccessToAppLoader>
  >;

  const { me } = usePreloadedQuery(hasUserAccessToAppQuery, queryRef);

  if (!me.allowed) {
    return <ComingSoon />;
  }

  return <Outlet />;
};

import { ZettelHomeQuery } from './__generated__/ZettelHomeQuery.graphql';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';
import { useLoaderData } from 'react-router-dom';

const zettelHomeQuery = graphql`
  query ZettelHomeQuery {
    zettel {
      notes: getNotes {
        id
        title
      }
    }
  }
`;

export const zettelHomeLoader = async () => {
  const queryRef = loadQuery<ZettelHomeQuery>(
    relayEnvironment,
    zettelHomeQuery,
    {},
    {}
  );

  return { queryRef };
};

export const ZettelHome = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelHomeLoader>
  >;

  const { zettel } = usePreloadedQuery(zettelHomeQuery, queryRef);

  return (
    <span>
      {zettel?.notes.map((note) => {
        return <div key={note?.id}>{note?.title}</div>;
      })}
    </span>
  );
};

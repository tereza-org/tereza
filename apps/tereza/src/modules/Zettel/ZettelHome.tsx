import { Flex, Heading } from '@ttoss/ui';
import { FolderNotesList } from '@tereza-tech/components';
import { ZettelHomeQuery } from './__generated__/ZettelHomeQuery.graphql';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';
import { useLoaderData, useNavigate } from 'react-router-dom';

const zettelHomeQuery = graphql`
  query ZettelHomeQuery {
    zettel {
      notes {
        id
        title
        group
      }
    }
  }
`;

export const zettelHomeLoader = async () => {
  const queryRef = loadQuery<ZettelHomeQuery>(
    relayEnvironment,
    zettelHomeQuery,
    {},
    {
      fetchPolicy: 'store-and-network',
    }
  );

  return { queryRef };
};

export const ZettelHome = () => {
  const navigate = useNavigate();

  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelHomeLoader>
  >;

  const { zettel } = usePreloadedQuery(zettelHomeQuery, queryRef);

  const notes = (zettel?.notes || []).map(({ id, title, group }) => {
    return { id, title, group };
  });

  return (
    <Flex>
      <Heading as="h1">Journal Summary</Heading>
      <FolderNotesList
        notes={notes}
        onNoteClick={(note) => {
          navigate(`/zettel/note/${note.id}`);
        }}
      />
    </Flex>
  );
};

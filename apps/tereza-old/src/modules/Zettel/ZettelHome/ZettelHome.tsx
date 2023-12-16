import { Flex, Heading } from '@ttoss/ui';
import { FolderNotesList } from '@tereza-tech/components';
import { Suspense } from '../../Layout';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { usePreloadedQuery } from 'react-relay';
import { zettelHomeLoader, zettelHomeRootQuery } from './zettelHomeLoader';

const ZettelHomePreloader = () => {
  const navigate = useNavigate();

  const { zettelHomeRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelHomeLoader>
  >;

  const { zettel } = usePreloadedQuery(
    zettelHomeRootQuery,
    zettelHomeRootQueryRef
  );

  const notes = (zettel?.notes?.edges || [])
    .map(({ node }) => {
      return node;
    })
    .map(({ id, title, group }) => {
      return { id, title, group };
    });

  return (
    <FolderNotesList
      notes={notes}
      onNoteClick={(note) => {
        navigate(`/zettel/note/${note.id}`);
      }}
    />
  );
};

const ZettelHome = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Heading as="h1">Notes</Heading>
      <Suspense>
        <ZettelHomePreloader />
      </Suspense>
    </Flex>
  );
};

export default ZettelHome;

import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';
import { NoteSummary } from '../components/NoteSummary';
import { zettel } from '../lib/zettel';

export const getStaticProps: GetStaticProps = async () => {
  const flashcard = await zettel.getFlashcard();

  return {
    props: { flashcard },
  };
};

const FlashcardPage = ({
  flashcard,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const text = `This note is ${flashcard.diffWeeks.weeks} weeks and ${flashcard.diffWeeks.days} days old.`;
  return (
    <>
      <p>{text}</p>
      <NoteSummary note={flashcard} />
    </>
  );
};

export default FlashcardPage;

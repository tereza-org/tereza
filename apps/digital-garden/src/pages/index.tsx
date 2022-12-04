import { GetStaticProps } from 'next';
import { Recommendations } from '../components/Recommendations';
import { zettel } from '../lib/zettel';

export const getStaticProps: GetStaticProps = async () => {
  const recommendations = await zettel.getRecommendations();

  return {
    props: { recommendations },
  };
};

export default Recommendations;

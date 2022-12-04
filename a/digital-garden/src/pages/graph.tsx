import { InferGetStaticPropsType } from 'next';
import { zettel } from '../lib/zettel';
import dynamic from 'next/dynamic';

const Graph = dynamic(
  () => {
    return import('@tereza-tech/react-zettel').then((mod) => {
      return mod.Graph;
    });
  },
  {
    ssr: false,
  }
);

export const getStaticProps = async () => {
  const graphData = await zettel.getGraph();
  return {
    props: { graphData },
  };
};

const GraphPage = ({
  graphData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Graph graphData={graphData} width={1000} height={600} />;
};

export default GraphPage;

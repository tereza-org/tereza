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
  const graph = await zettel.getGraph();
  return {
    props: { graph },
  };
};

const GraphPage = ({
  graph,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Graph graph={graph} width={1000} height={600} />;
};

export default GraphPage;

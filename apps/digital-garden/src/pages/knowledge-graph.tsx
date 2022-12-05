import { InferGetStaticPropsType } from 'next';
import { zettel } from '../lib/zettel';
import dynamic from 'next/dynamic';

const KnowledgeGraph = dynamic(
  () => {
    return import('@tereza-tech/react-zettel').then((mod) => {
      return mod.KnowledgeGraph;
    });
  },
  {
    ssr: false,
  }
);

export const getStaticProps = async () => {
  const graphData = await zettel.getGraphData();
  return {
    props: { graphData },
  };
};

const GraphPage = ({
  graphData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <KnowledgeGraph graphData={graphData} width={1000} height={600} />;
};

export default GraphPage;

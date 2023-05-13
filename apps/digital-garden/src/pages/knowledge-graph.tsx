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
  return (
    <div
      style={{
        width: '100%',
        height: '70vh',
      }}
    >
      <KnowledgeGraph graphData={graphData} />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default GraphPage;

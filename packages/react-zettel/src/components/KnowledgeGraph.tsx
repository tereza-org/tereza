import * as React from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import type { GraphData } from '@tereza-tech/zettel/src/graph';

export type { GraphData };

export type KnowledgeGraphProps = {
  height: number;
  width: number;
  graphData: GraphData;
};

export const KnowledgeGraph = ({
  height,
  width,
  graphData,
}: KnowledgeGraphProps) => {
  const newGraphData = React.useMemo(() => {
    const nodes = (graphData?.nodes || []).map((node) => {
      return {
        val: node.group === 'notes' ? 10 : 1,
        ...node,
      };
    });

    const links = (graphData?.links || []).map((link) => {
      return {
        ...link,
      };
    });

    return { nodes, links };
  }, [graphData?.links, graphData?.nodes]);

  const graphCommonProps = {
    height,
    width,
    graphData: newGraphData,
    nodeOpacity: 0.9,
    nodeResolution: 32,
    nodeAutoColorBy: 'group',
    linkWidth: 0.3,
    linkDirectionalParticles: 2,
    linkDirectionalParticleWidth: 3,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    onDagError: (loopNodeIds) => {},
  };

  return (
    <ForceGraph3D
      {...graphCommonProps}
      dagMode="bu"
      nodeThreeObjectExtend={true}
      nodeThreeObject={(node: any) => {
        const sprite = new SpriteText(node.label);
        sprite.color = 'white';
        sprite.textHeight = 4;
        return sprite;
      }}
    />
  );
};

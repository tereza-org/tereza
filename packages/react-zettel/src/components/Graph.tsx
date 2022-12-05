import * as React from 'react';
import { Graph as GraphData } from '@tereza-tech/zettel/src/graph';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

export const Graph = ({
  height,
  width,
  graph,
}: {
  height: number;
  width: number;
  graph: GraphData;
}) => {
  const newGraphData = React.useMemo(() => {
    const nodes = (graph?.nodes || []).map((node) => {
      return {
        val: node.group === 'notes' ? 10 : 1,
        ...node,
      };
    });

    const links = (graph?.links || []).map((link) => {
      return {
        ...link,
      };
    });

    return { nodes, links };
  }, [graph?.links, graph?.nodes]);

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

export default Graph;

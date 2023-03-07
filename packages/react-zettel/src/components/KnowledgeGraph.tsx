import * as React from 'react';
import { Box, Button, useTheme } from '@ttoss/ui';
import ForceGraph2D, {
  ForceGraphMethods as ForceGraphMethods2D,
  ForceGraphProps as ForceGraphProps2D,
} from 'react-force-graph-2d';
import ForceGraph3D, {
  ForceGraphMethods as ForceGraphMethods3D,
  ForceGraphProps as ForceGraphProps3D,
} from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import type {
  GraphData,
  GraphGroup,
} from '@tereza-tech/zettel/src/knowledgeGraph';

export type { GraphData, GraphGroup };

export type KnowledgeGraphProps = {
  height?: number;
  width?: number;
  graphData: GraphData;
};

export const KnowledgeGraph = ({
  height,
  width,
  graphData,
}: KnowledgeGraphProps) => {
  const { theme } = useTheme();

  const containerRef = React.useRef<HTMLDivElement>(null);

  /**
   * Refs to the 2D and 3D graphs.
   * NOTE: it always undefined on the first render.
   */
  const graph2DRef = React.useRef<ForceGraphMethods2D | undefined>(undefined);
  const graph3DRef = React.useRef<ForceGraphMethods3D | undefined>(undefined);

  const [dimensions, setDimensions] = React.useState({
    height,
    width,
  });

  /**
   * Get dimensions of the parent element but only if the height and width
   * props are not provided.
   */
  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        /**
         * Get parent element dimensions
         */
        const parentDimensions =
          containerRef.current.parentElement?.getBoundingClientRect();

        /**
         * Set dimensions state if the height and width props are not provided.
         */
        setDimensions({
          height: height || parentDimensions?.height || 1000,
          width: width || parentDimensions?.width || 1000,
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  const newGraphData = React.useMemo(() => {
    const nodes = (graphData?.nodes || []).map((node) => {
      return {
        val: node.group === 'note' ? 10 : 1,
        color:
          node.group === 'note' ? theme.rawColors?.note : theme.rawColors?.tag,
        ...node,
      };
    });

    const links = (graphData?.links || []).map((link) => {
      return {
        ...link,
      };
    });

    return { nodes, links };
  }, [graphData?.links, graphData?.nodes, theme.rawColors]);

  const [is3D, setIs3D] = React.useState(true);

  const [dagMode, setDagMode] =
    React.useState<ForceGraphProps2D['dagMode']>('radialin');

  const dagLevelDistance = React.useMemo(() => {
    const numberOfNodes = graphData.nodes.length;
    const minDagLevelDistance = 25;
    return minDagLevelDistance * (Math.log10(numberOfNodes + 1) + 1);
  }, [graphData.nodes.length]);

  const graphCommonProps: ForceGraphProps3D & ForceGraphProps2D = {
    ...dimensions,
    dagMode,
    dagLevelDistance,
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
    <Box ref={containerRef}>
      {is3D ? (
        <ForceGraph3D
          ref={graph3DRef}
          {...graphCommonProps}
          nodeThreeObjectExtend={true}
          nodeThreeObject={(node: any) => {
            const sprite = new SpriteText(node.label);
            sprite.color = 'white';
            sprite.textHeight = 4;
            return sprite;
          }}
        />
      ) : (
        <ForceGraph2D ref={graph2DRef} {...graphCommonProps} />
      )}
      <Box>
        <Button
          onClick={() => {
            setIs3D(!is3D);
          }}
        >
          {is3D ? '2D' : '3D'}
        </Button>
        <Button
          onClick={() => {
            setDagMode(dagMode === 'bu' ? 'radialin' : 'bu');
          }}
        >
          {dagMode === 'bu' ? 'Radial' : 'Bottom Up'}
        </Button>
      </Box>
    </Box>
  );
};

import * as React from 'react';
import ForceGraph2D, {
  ForceGraphProps as ForceGraphProps2D,
} from 'react-force-graph-2d';
import ForceGraph3D, {
  ForceGraphProps as ForceGraphProps3D,
} from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import type { GraphData } from '@tereza-tech/zettel/src/knowledgeGraph';

export type { GraphData };

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
  const containerRef = React.useRef<HTMLDivElement>(null);

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
        val: node.group === 'notes' ? 7 : 1,
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

  const [is3D, setIs3D] = React.useState(true);

  const [dagMode, setDagMode] =
    React.useState<ForceGraphProps2D['dagMode']>('radialin');

  const graphCommonProps: ForceGraphProps3D & ForceGraphProps2D = {
    ...dimensions,
    dagMode,
    dagLevelDistance: 50,
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
    <div ref={containerRef}>
      {is3D ? (
        <ForceGraph3D
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
        <ForceGraph2D {...graphCommonProps} />
      )}
      <div>
        <button
          onClick={() => {
            setIs3D(!is3D);
          }}
        >
          {is3D ? '2D' : '3D'}
        </button>
        <button
          onClick={() => {
            setDagMode(dagMode === 'bu' ? 'radialin' : 'bu');
          }}
        >
          {dagMode === 'bu' ? 'Radial' : 'Bottom Up'}
        </button>
      </div>
    </div>
  );
};

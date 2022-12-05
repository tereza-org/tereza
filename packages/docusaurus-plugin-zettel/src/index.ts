import {
  GraphData,
  Zettelkasten,
  ZettelkastenConfig,
} from '@tereza-tech/zettel';
import { LoadContext, Plugin } from '@docusaurus/types';

type PluginOptions = ZettelkastenConfig & {
  knowledgeGraph: {
    path?: string;
    component: string;
  };
};

export type PluginContent = { graphData: GraphData };

/**
 * https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis
 */
const docusaurusPluginZettel = (
  context: LoadContext,
  options: PluginOptions
): Plugin<PluginContent> => {
  return {
    name: 'docusaurus-plugin-zettel',
    loadContent: async () => {
      const zettelkasten = new Zettelkasten(options);
      const graphData = await zettelkasten.getGraphData();
      return {
        graphData,
      };
    },
    contentLoaded: async ({ content, actions }) => {
      const { createData, addRoute } = actions;

      const graphDataJsonPath = await createData(
        'graphData.json',
        JSON.stringify(content.graphData)
      );

      addRoute({
        path: options.knowledgeGraph.path || '/knowledge-graph',
        component: options.knowledgeGraph.component,
        modules: {
          graphData: graphDataJsonPath,
        },
        exact: true,
      });
    },
  };
};

export default docusaurusPluginZettel;

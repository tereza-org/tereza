import { Graph, Zettelkasten, ZettelkastenConfig } from '@tereza-tech/zettel';
import { LoadContext, Plugin } from '@docusaurus/types';

/**
 * https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis
 */
const docusaurusPluginZettel = (
  context: LoadContext,
  options: ZettelkastenConfig
): Plugin<{ graph: Graph }> => {
  return {
    name: 'docusaurus-plugin-zettel',
    loadContent: async () => {
      const zettelkasten = new Zettelkasten(options);
      const graph = await zettelkasten.getGraph();
      return {
        graph,
      };
    },
    contentLoaded: async ({ content, actions }) => {
      const { createData, addRoute } = actions;

      const graphJsonPath = await createData(
        'graph.json',
        JSON.stringify(content.graph)
      );

      addRoute({
        path: '/graph',
        component: '@tereza-tech/react-zettel/src/components/Graph',
        modules: {
          graph: graphJsonPath,
        },
        exact: true,
      });
    },
  };
};

export default docusaurusPluginZettel;

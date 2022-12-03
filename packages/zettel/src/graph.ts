import { ZettelkastenConfig } from './config';
import { getPosts, getTags } from './files';

export type GraphGroup = 'posts' | 'tags';

export type GraphNode = {
  id: string;
  group: GraphGroup;
  label?: string;
};

export type GraphLink = {
  source: string;
  target: string;
};

export type Graph = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export const getGraph = async (config: ZettelkastenConfig): Promise<Graph> => {
  const [allPosts, allTags] = await Promise.all([
    getPosts(config),
    getTags(config),
  ]);

  const postsNodes = allPosts.map((post) => {
    return {
      id: post.id,
      group: 'posts' as GraphGroup,
      label: post.title,
    };
  });

  const tagsNodes = allTags.map((tag) => {
    return {
      id: tag,
      group: 'tags' as GraphGroup,
      label: '#' + tag,
    };
  });

  const nodes = [...postsNodes, ...tagsNodes].map((node) => {
    return {
      ...node,
    };
  });

  const referencesLinks = allPosts.flatMap(({ references, id }) => {
    return (references || []).map((reference) => {
      return {
        target: id,
        source: reference.id,
      };
    });
  });

  const tagsLinks = allPosts.flatMap(({ id, tags }) => {
    return tags.map((tag) => {
      return {
        target: id,
        source: tag,
      };
    });
  });

  const links = [...referencesLinks, ...tagsLinks]
    .map((link) => {
      return {
        ...link,
      };
    })
    /**
     * Remove duplicates.
     */
    .filter((link, index, self) => {
      return (
        self.findIndex((l) => {
          return l.source === link.source && l.target === link.target;
        }) === index
      );
    });

  return { nodes, links };
};

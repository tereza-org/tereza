import { ZettelkastenConfig } from './config';
import { getPosts, getTags } from './files';

export const getGraph = async (config: ZettelkastenConfig) => {
  const [allPosts, allTags] = await Promise.all([
    getPosts(config),
    getTags(config),
  ]);

  const postsNodes = allPosts.map(({ id, title }) => {
    return {
      id,
      group: 'post',
      name: title,
    };
  });

  const tagsNodes = allTags.map((tag) => {
    return {
      id: tag,
      group: 'tag',
      name: `#${tag}`,
    };
  });

  const nodes = [...postsNodes, ...tagsNodes].map((node) => {
    return {
      ...node,
    };
  });

  const backlinksLinks = allPosts.flatMap(({ backlinks, id }) => {
    return (backlinks || []).map((backlink) => {
      return {
        target: id,
        source: backlink.id,
      };
    });
  });

  const backlinksLinks2 = allPosts.flatMap(({ backlinks, id }) => {
    return (backlinks || []).map((backlink) => {
      return {
        target: backlink.id,
        source: id,
      };
    });
  });

  const referencesLinks = allPosts.flatMap(({ references, id }) => {
    return (references || []).map((reference) => {
      return {
        target: reference.id,
        source: id,
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

  const links = [...backlinksLinks, ...tagsLinks, ...referencesLinks]
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

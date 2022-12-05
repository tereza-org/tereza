import { ZettelkastenConfig } from './config';
import { getNotes, getTags } from './notes';

export type GraphGroup = 'notes' | 'tags';

export type GraphNode = {
  id: string;
  group: GraphGroup;
  label?: string;
};

export type GraphLink = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export const getGraphData = async (
  config: ZettelkastenConfig
): Promise<GraphData> => {
  const [allNotes, allTags] = await Promise.all([
    getNotes(config),
    getTags(config),
  ]);

  const notesNodes = allNotes.map((note) => {
    return {
      id: note.id,
      group: 'notes' as GraphGroup,
      label: note.title,
    };
  });

  const getTagId = (tag: string) => {
    return '#' + tag;
  };

  const tagsNodes = allTags.map((tag) => {
    return {
      id: getTagId(tag),
      group: 'tags' as GraphGroup,
      label: getTagId(tag),
    };
  });

  const nodes = [...notesNodes, ...tagsNodes].map((node) => {
    return {
      ...node,
    };
  });

  const referencesLinks = allNotes.flatMap(({ references, id }) => {
    return (references || []).map((reference) => {
      return {
        target: id,
        source: reference.id,
      };
    });
  });

  const tagsLinks = allNotes.flatMap(({ id, tags }) => {
    return tags.map((tag) => {
      return {
        target: id,
        source: getTagId(tag),
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

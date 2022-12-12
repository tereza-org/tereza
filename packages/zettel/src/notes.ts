import * as dateFns from 'date-fns';
import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_CONFIG, ZettelkastenConfig } from './config';
import { normalizeTags } from './normalizeTags';
import { sortObjectByKey } from './sortObjectByKey';
import { titleCase } from 'title-case';
import NodeCache from 'node-cache';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const cache = new NodeCache();

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Book = {
  authors: string[];
  link: string;
  image?: string;
  ASIN?: string;
  ISBN?: string;
};

export type NoteMetadata = {
  group: string;
  slug: string;
  id: string;
  title?: string;
  description?: string;
  draft?: boolean;
  date?: string;
  formattedDate?: string;
  tags: string[];
  book?: Book;
  [key: string]: any;
};

const metadataSortOrder = [
  'title',
  'id',
  'group',
  'slug',
  'draft',
  'date',
  'description',
  'tags',
  'book',
];

export type SimpleNote = NoteMetadata & {
  content: string;
};

const getDirectories = async (dir: string) => {
  const cacheKey = `getDirectories-${dir}`;

  if (!cache.has(cacheKey)) {
    const directories = (
      await fs.promises.readdir(dir, { withFileTypes: true })
    )
      .filter((dirent) => {
        return dirent.isDirectory();
      })
      .map((dirent) => {
        return dirent.name;
      });

    cache.set(cacheKey, directories);
  }

  return cache.get<string[]>(cacheKey) || [];
};

/**
 * Groups are all folders in the notesDir directory.
 */
export const getGroups = async (config: ZettelkastenConfig) => {
  const groups = [
    '/',
    ...(await getDirectories(config.notesDir)).map((group) => {
      return `/${group}`;
    }),
  ];

  return groups.filter((group) => {
    if (config.ignoreGroups) {
      return !config.ignoreGroups.includes(group);
    }

    return true;
  });
};

type MarkdownFile = {
  data: {
    [key: string]: any;
  };
  content: string;
};

export const readMarkdownFile = async (
  filePath: string
): Promise<MarkdownFile | undefined> => {
  const cacheKey = `readMarkdownFile-${filePath}`;

  if (!cache.has(cacheKey)) {
    try {
      const fileContents = await fs.promises.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      cache.set(cacheKey, { data, content });
    } catch (err) {
      cache.set(cacheKey, undefined);
    }
  }

  return cache.get<MarkdownFile>(cacheKey);
};

export const readAllMarkdownFilesFromDir = async (dir: string) => {
  const cacheKey = `readAllMarkdownFilesFromDir-${dir}`;

  if (!cache.has(cacheKey)) {
    const files = await fs.promises.readdir(dir);

    const promises = files
      .filter((filename) => {
        return filename.endsWith('.md');
      })
      .map(async (filename) => {
        const filePath = path.join(dir, filename);

        const markdown = await readMarkdownFile(filePath);

        if (markdown?.data) {
          markdown.data.slug = filename.replace('.md', '');
        }

        return markdown;
      });

    const markdowns = (await Promise.all(promises)).filter(
      (markdown): markdown is MarkdownFile => {
        return markdown !== undefined;
      }
    );

    cache.set(cacheKey, markdowns);
  }

  return cache.get<MarkdownFile[]>(cacheKey) || [];
};

const readAllMarkdownFiles = async (config: ZettelkastenConfig) => {
  const groups = await getGroups(config);

  const promises = groups.map(async (group) => {
    const groupDir = path.join(config.notesDir, group);

    const markdowns = await readAllMarkdownFilesFromDir(groupDir);

    markdowns.forEach((markdown) => {
      return (markdown.data.group = group);
    });

    return markdowns;
  });

  const allMarkdowns = (await Promise.all(promises)).flat();

  return allMarkdowns;
};

const getSimpleNoteFromMarkdownFile = (
  config: ZettelkastenConfig,
  markdownFile: MarkdownFile
): SimpleNote => {
  const { data, content } = markdownFile;

  const note: SimpleNote = {
    ...data,
    group: data.group,
    slug: data.slug,
    content,
  } as SimpleNote;

  note.title = note.title || titleCase(note.slug);

  note.id = note.id || path.join(note.group, note.slug);

  const date = (() => {
    if (note.date) {
      const d = new Date(note.date);
      return dateFns.addMinutes(d, d.getTimezoneOffset());
    }

    return undefined;
  })();

  if (date) {
    note.date = dateFns.format(date, 'yyyy-MM-dd');
    note.formattedDate = dateFns.format(
      date,
      config.dateFormat || DEFAULT_CONFIG.dateFormat
    );
  }

  note.tags = normalizeTags(note.tags);

  note.draft = (() => {
    /**
     * If draft is explicitly set to true, then return true.
     */
    if (typeof note.draft === 'boolean' && note.draft === true) {
      return true;
    }

    if (!note.content) {
      return true;
    }

    const hasAllRequiredMetadata = config.requiredMetadata?.every((key) => {
      return key in note;
    });

    /**
     * Even ff draft is explicitly set to false, but the note is missing
     * required metadata, then return false.
     */
    return !hasAllRequiredMetadata;
  })();

  return note;
};

const getAllSimpleNotesCacheKey = (config: ZettelkastenConfig) => {
  return JSON.stringify(config);
};

/**
 * Get all notes including drafts.
 */
const getAllSimpleNotes = async (config: ZettelkastenConfig) => {
  const cacheKey = getAllSimpleNotesCacheKey(config);

  if (!cache.has(cacheKey)) {
    const markdowns = await readAllMarkdownFiles(config);

    const notes = markdowns.map((markdown) => {
      return getSimpleNoteFromMarkdownFile(config, markdown);
    });

    cache.set(cacheKey, notes);
  }

  return cache.get<SimpleNote[]>(cacheKey) || [];
};

export type GetNotesParams = {
  groups?: string | string[];
  includeDrafts?: boolean;
};

const removeContent = (note: SimpleNote): NoteMetadata => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...rest } = note;
  return rest;
};

/**
 * Add new metadata to notes, like references and backlinks
 * and apply draft rules.
 */
const getNotesWithoutRecommendations = async (
  config: ZettelkastenConfig,
  params?: GetNotesParams
) => {
  const allSimpleNotes = await getAllSimpleNotes(config);

  const allNotesWithFullMetadata = allSimpleNotes
    /**
     * All notes with drafts rules applied.
     */
    .filter((note) => {
      const { groups = [], includeDrafts = false } = params || {};

      const finalGroups = Array.isArray(groups) ? groups : [groups];

      /**
       * Filter out notes that are not in the specified groups.
       */
      if (finalGroups.length > 0 && !finalGroups.includes(note.group)) {
        return false;
      }

      /**
       * Filter out drafts if includeDrafts is false.
       */
      if (!includeDrafts && note.draft) {
        return false;
      }

      return true;
    })
    .map((note) => {
      return {
        ...note,
        href: note.id,
        readingTime: Math.round(readingTime(note.content).minutes) || 1,
      };
    })
    .map((note, _, allNotes) => {
      /**
       * Array of all note ids that `note` use as references.
       */
      const references = allNotes.reduce((acc, recommendation) => {
        if (note.content.includes(`(${recommendation.href})`)) {
          return [removeContent(recommendation), ...acc];
        }

        return acc;
      }, [] as NoteMetadata[]);

      /**
       * Add backlinks to note. Backlinks are all notes that
       * reference current `note`.
       */
      const backlinks = allNotes
        .filter(({ content }) => {
          return content.includes(`(${note.href})`);
        })
        .map((note) => {
          return removeContent(note);
        });

      return { ...note, references, backlinks };
    });

  return allNotesWithFullMetadata;
};

type NoteWithoutRecommendations = ThenArg<
  ReturnType<typeof getNotesWithoutRecommendations>
>[number];

export type GetNoteParams =
  | {
      group: string;
      slug: string;
    }
  | { id: string }
  | { title: string }
  | string;

const filterNoteFromNotesArray = <P extends SimpleNote>(
  allNotes: P[],
  params: GetNoteParams
): P | undefined => {
  /**
   * If params is a string, then it is note id.
   */
  if (typeof params === 'string') {
    return allNotes.find((note) => {
      return note.id === params;
    });
  }

  if ('id' in params) {
    return allNotes.find((note) => {
      return note.id === params.id;
    });
  }

  if ('title' in params) {
    return allNotes.find((note) => {
      return note.title === params.title;
    });
  }

  const note = allNotes.find((note) => {
    return note.group === params.group && note.slug === params.slug;
  });

  return note;
};

export const getNotes = async (
  config: ZettelkastenConfig,
  params?: GetNotesParams
) => {
  const notes = await getNotesWithoutRecommendations(config, params);

  return notes;
};

export type Note = ThenArg<ReturnType<typeof getNotes>>[number];

export const getNote = async (
  config: ZettelkastenConfig,
  params: GetNoteParams
): Promise<Note | undefined> => {
  const allNotes = await getNotes(config, { includeDrafts: true });
  const note = filterNoteFromNotesArray(allNotes, params);
  return note;
};

/**
 * Save note as markdown file.
 */
export const saveNote = async (
  config: ZettelkastenConfig,
  note: SimpleNote
): Promise<void> => {
  /**
   * Save markdown file.
   */
  const { content, ...metadata } = note;

  const filePath = path.join(config.notesDir, note.group, `${note.slug}.md`);

  const sortedMetadata = sortObjectByKey(metadata, metadataSortOrder);

  const md = matter.stringify(content || '', sortedMetadata);

  await fs.promises.writeFile(filePath, md);

  /**
   * Cache has not been initialized.
   */
  if (!cache.has(getAllSimpleNotesCacheKey(config))) {
    return;
  }

  /**
   * Update cache.
   */
  const oldMarkdownFiles = await readAllMarkdownFiles(config);

  const newMarkdownFiles = oldMarkdownFiles.filter((markdownFile) => {
    return (
      markdownFile.data.group !== note.group ||
      markdownFile.data.slug !== note.slug
    );
  });

  const { content: newContent, ...newData } = getSimpleNoteFromMarkdownFile(
    config,
    {
      content: note.content,
      data: sortedMetadata,
    }
  );

  newMarkdownFiles.push({
    content: newContent,
    data: newData,
  });

  cache.set(getAllSimpleNotesCacheKey(config), newMarkdownFiles);
};

export const getTags = async (
  config: ZettelkastenConfig,
  params?: GetNotesParams
) => {
  const notes = await getNotes(config, params);

  const tags = notes
    .flatMap((note) => {
      return note.tags;
    })
    /**
     * Remove duplicates.
     */
    .filter((tag, index, arr) => {
      return arr.indexOf(tag) === index;
    })
    .filter((tag): tag is string => {
      return tag !== undefined;
    })
    .sort((tagA, tagB) => {
      return tagA.localeCompare(tagB);
    });

  return tags;
};

export const normalizeNotes = async (config: ZettelkastenConfig) => {
  const [allNotes, allTags] = await Promise.all([
    getAllSimpleNotes(config),
    getTags(config, { includeDrafts: true }),
  ]);

  /**
   * Normalize the set of tags: if another note has a tag that is the same as
   * current note slug, then add the tag to the current note.
   */
  allNotes.forEach((note) => {
    const doAllTagsContainsNoteSlug = allTags.includes(note.slug);

    if (doAllTagsContainsNoteSlug) {
      note.tags = normalizeTags([...(note.tags || []), note.slug]);
    }
  });

  const promises = allNotes.map((note) => {
    return saveNote(config, note);
  });

  await Promise.all(promises);
};

const getNoteRecommendations = async (
  config: ZettelkastenConfig,
  params: GetNoteParams
): Promise<NoteMetadata[]> => {
  const allNotes = await getNotesWithoutRecommendations(config);

  const note = filterNoteFromNotesArray(allNotes, params);

  const scoreMap = allNotes.reduce<{ [key: string]: number }>((acc, { id }) => {
    acc[id] = 0;
    return acc;
  }, {});

  /**
   * All notes that the current note references scores.
   */
  note?.references.forEach((reference) => {
    scoreMap[reference.id] += 6;
  });

  /**
   * All notes that reference the current note scores.
   */
  note?.backlinks.forEach((backlink) => {
    scoreMap[backlink.id] += 3;
  });

  /**
   * All notes that have the same tags as the current note scores.
   */
  note?.tags?.forEach((tag) => {
    allNotes.forEach(({ tags, id }) => {
      if (tags?.includes(tag)) {
        scoreMap[id] += 1;
      }
    });
  });

  const recommendations = Object.entries(scoreMap)
    .map(([id, score]) => {
      const note = allNotes.find((note) => {
        return note.id === id;
      });
      return { note, score };
    })
    .filter(({ score }) => {
      return score > 0;
    })
    .sort(({ score: scoreA }, { score: scoreB }) => {
      return scoreB - scoreA;
    })
    .map(({ note }) => {
      return note;
    })
    .filter((note): note is NoteWithoutRecommendations => {
      return !!note;
    })
    .map((note) => {
      return removeContent(note);
    })
    /**
     * Remove itself from recommendations.
     */
    .filter(({ href }) => {
      return href !== note?.href;
    })
    .slice(0, config.recommendationsLimit)
    .map((recommendation) => {
      /**
       * Check if the recommendation is referenced by the current note.
       */
      const isReference = !!note?.references.find((reference) => {
        return reference.id === recommendation.id;
      });

      return { ...recommendation, isReference };
    });

  return recommendations;
};

export type GetRecommendationsParams = {
  note?: GetNoteParams;
  group?: string;
  tag?: string;
  limit?: boolean;
};

/**
 * Group or tags recommendations.
 */
export const getRecommendations = async (
  config: ZettelkastenConfig,
  params?: GetRecommendationsParams
) => {
  const { tag, group, note } = params || {};

  const allRecommendations = await (async () => {
    if (note) {
      return getNoteRecommendations(config, note);
    }

    /**
     * Tag recommendations.
     */
    if (tag) {
      const allNotes = await getNotes(config);
      return allNotes.filter(({ tags }) => {
        return (tags || []).includes(tag);
      });
    }

    /**
     * Group recommendations.
     */
    if (group) {
      return getNotes(config, { groups: [group] });
    }

    return getNotes(config);
  })();

  const limit = params?.limit ? config.recommendationsLimit : undefined;

  const recommendations = allRecommendations
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content, ...metadata }) => {
      return metadata;
    })
    .slice(0, limit)
    /**
     * Sort by date.
     */
    .sort((noteA, noteB) => {
      if (!noteA.date || !noteB.date) {
        return 0;
      }

      return noteA?.date > noteB?.date ? -1 : 1;
    });

  return recommendations;
};

import { paramCase } from 'change-case';

// const mapTags = {
//   queues: 'queueing-theory',
//   queue: 'queueing-theory',
// };

export const normalizeTags = (tags: string[] = []) => {
  return (
    [...tags]
      /**
       * Remove invalid tags.
       */
      .filter((tag) => {
        return !!tag;
      })
      /**
       * https://stackoverflow.com/a/37511463/8786986
       */
      .map((tag) => {
        return tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      })
      .map((tag) => {
        return paramCase(tag);
      })
      // .map((tag) => {
      //   if (mapTags[tag]) {
      //     console.error(
      //       `Tag "${tag}" is deprecated. Use "${mapTags[tag]}" instead.`
      //     );
      //     process.exit(1);
      //   }

      //   return tag;
      // })
      /**
       * Remove duplicated tags.
       * https://stackoverflow.com/a/56757215/8786986
       */
      .filter((tag, index, array) => {
        return array.indexOf(tag) === index;
      })
      .sort((tagA, tagB) => {
        return tagA.localeCompare(tagB);
      })
  );
};

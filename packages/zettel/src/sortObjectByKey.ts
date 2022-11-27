export const sortObjectByKey = (obj: any, sortSequence: string[]) => {
  return Object.keys(obj)
    .sort((a, b) => {
      return sortSequence.indexOf(a) - sortSequence.indexOf(b);
    })
    .reduce((o, key) => {
      o[key] = obj[key];
      return obj;
    }, {} as any);
};

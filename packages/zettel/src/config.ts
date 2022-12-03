export type ZettelkastenConfig = {
  postsDir: string;
  ignoreGroups?: string[];
  requiredMetadata?: string[];
  normalizeOnInit?: boolean;
  recommendationsLimit?: number;
  /**
   * https://date-fns.org/v2.29.3/docs/format
   */
  dateFormat?: string;
};

export const DEFAULT_CONFIG = {
  requiredMetadata: ['title', 'date', 'excerpt'],
  normalizeOnInit: false,
  recommendationsLimit: 5,
  dateFormat: 'PPP',
};

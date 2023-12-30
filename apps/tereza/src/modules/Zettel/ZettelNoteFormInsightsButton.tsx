'use client';

import * as React from 'react';
import { Button, Stack } from '@ttoss/ui';
import {
  type PreloadedQuery,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { type ZettelNoteFormInsightsButtonQuery } from './__generated__/ZettelNoteFormInsightsButtonQuery.graphql';
import { useWatch } from '@ttoss/forms';

const zettelNoteFormInsightsButtonQuery = graphql`
  query ZettelNoteFormInsightsButtonQuery($content: String!) {
    zettel {
      insights(content: $content) {
        title
        description
        tags
        division
        insights
      }
    }
  }
`;

const Insights = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<ZettelNoteFormInsightsButtonQuery>;
}) => {
  const query = usePreloadedQuery<ZettelNoteFormInsightsButtonQuery>(
    zettelNoteFormInsightsButtonQuery,
    queryRef
  );

  const insights = query.zettel?.insights;

  return <pre>{JSON.stringify(insights, null, 2)}</pre>;
};

export const ZettelNoteFormInsightsButton = () => {
  const [content] = useWatch({
    name: ['content'],
  });

  const [queryRef, loadInsights, disposeQuery] =
    useQueryLoader<ZettelNoteFormInsightsButtonQuery>(
      zettelNoteFormInsightsButtonQuery
    );

  React.useEffect(() => {
    return () => {
      disposeQuery();
    };
  }, [disposeQuery]);

  return (
    <Stack>
      <Button
        onClick={() => {
          loadInsights({ content });
        }}
      >
        Insights
      </Button>
      <React.Suspense fallback={null}>
        {queryRef && <Insights queryRef={queryRef} />}
      </React.Suspense>
    </Stack>
  );
};

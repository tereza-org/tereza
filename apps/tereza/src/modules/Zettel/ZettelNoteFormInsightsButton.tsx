'use client';

import * as React from 'react';
import { Box, Button, Stack, Text } from '@ttoss/ui';
import { Loading } from '../Layout/Loading';
import {
  type PreloadedQuery,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { type ZettelNoteFormInsightsButtonQuery } from './__generated__/ZettelNoteFormInsightsButtonQuery.graphql';
import { useFormContext, useWatch } from '@ttoss/forms';

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

const HandleInsights = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<ZettelNoteFormInsightsButtonQuery>;
}) => {
  const [title, description, tags] = useWatch({
    name: ['title', 'descripton', 'tags'],
  });

  const { setValue } = useFormContext();

  const query = usePreloadedQuery<ZettelNoteFormInsightsButtonQuery>(
    zettelNoteFormInsightsButtonQuery,
    queryRef
  );

  const insights = query.zettel?.insights || {
    title: '',
    description: '',
    tags: [],
    division: [],
    insights: [],
  };

  React.useEffect(() => {
    setValue('insights', insights.insights);
    setValue('division', insights.division);

    if (!title) {
      setValue('title', insights.title);
    }

    if (!description) {
      setValue('description', insights.description);
    }

    if (!tags || tags.length === 0) {
      if (insights.tags) {
        setValue('tags', insights.tags);
      }
    }
  }, [
    description,
    insights.description,
    insights.division,
    insights.insights,
    insights.tags,
    insights.title,
    setValue,
    tags,
    title,
  ]);

  return null;
};

const Insights = ({
  insights,
  division,
}: {
  insights?: string[];
  division?: string[];
}) => {
  return (
    <Stack>
      <Text sx={{ fontSize: 'lg' }}>Insights</Text>
      <Box as="ul">
        {insights?.map((insight) => {
          return (
            <Text key={insight} as="li">
              {insight}
            </Text>
          );
        })}
      </Box>
      <Text sx={{ fontSize: 'lg' }}>Division</Text>
      <Box as="ul">
        {division?.map((division) => {
          return (
            <Text key={division} as="li">
              {division}
            </Text>
          );
        })}
      </Box>
    </Stack>
  );
};

export const ZettelNoteFormInsightsButton = () => {
  const [content, insights, division] = useWatch({
    name: ['content', 'insights', 'division'],
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
      {!queryRef && (
        <Button
          onClick={() => {
            loadInsights({ content });
          }}
        >
          Insights
        </Button>
      )}
      <React.Suspense fallback={<Loading />}>
        {queryRef && <HandleInsights queryRef={queryRef} />}
      </React.Suspense>
      <Insights insights={insights} division={division} />
    </Stack>
  );
};

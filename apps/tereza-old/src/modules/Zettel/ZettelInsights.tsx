import * as React from 'react';
import { Button, Flex, Text } from '@ttoss/ui';
import {
  PreloadedQuery,
  graphql,
  useFragment,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import {
  ZettelInsightsQuery,
  ZettelInsightsQuery$variables,
} from './__generated__/ZettelInsightsQuery.graphql';
import { ZettelInsights_insight$key } from './__generated__/ZettelInsights_insight.graphql';

const zettelInsightQuery = graphql`
  query ZettelInsightsQuery($note: ZettelNoteInput!) {
    zettel {
      insights(note: $note) {
        ...ZettelInsights_insight
      }
    }
  }
`;

const Insight = ({ insightRef }: { insightRef: any }) => {
  const insight = useFragment<ZettelInsights_insight$key>(
    graphql`
      fragment ZettelInsights_insight on ZettelInsight {
        text
      }
    `,
    insightRef
  );

  return (
    <Text
      as="p"
      sx={{
        whiteSpace: 'pre-wrap',
      }}
    >
      {insight.text}
    </Text>
  );
};

const Insights = ({
  zettelInsightQueryRef,
}: {
  zettelInsightQueryRef: PreloadedQuery<ZettelInsightsQuery>;
}) => {
  const { zettel } = usePreloadedQuery(
    zettelInsightQuery,
    zettelInsightQueryRef
  );

  const insights = zettel?.insights || [];

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {insights.map((insightRef, index) => {
        return <Insight key={index} insightRef={insightRef} />;
      })}
    </Flex>
  );
};

export const ZettelInsights = ({
  title,
  content,
}: Partial<ZettelInsightsQuery$variables['note']>) => {
  const [zettelInsightQueryRef, loadQuery] =
    useQueryLoader<ZettelInsightsQuery>(zettelInsightQuery);

  const isDisabled = !title || !content;

  return (
    <Flex
      sx={{
        gap: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginY: 4,
      }}
    >
      <Button
        type="button"
        disabled={isDisabled}
        onClick={() => {
          if (isDisabled) {
            return;
          }

          loadQuery({
            note: {
              title,
              content,
            },
          });
        }}
      >
        Insights
      </Button>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        {zettelInsightQueryRef && (
          <Insights zettelInsightQueryRef={zettelInsightQueryRef} />
        )}
      </React.Suspense>
    </Flex>
  );
};

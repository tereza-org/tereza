import * as React from 'react';
import { Box, Flex, Heading, Text } from '@ttoss/ui';
import { JournalQuestionsQuery } from './__generated__/JournalQuestionsQuery.graphql';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';
import { useLoaderData } from 'react-router-dom';

const journalQuestions = graphql`
  query JournalQuestionsQuery {
    journal {
      questions {
        system {
          question
        }
      }
    }
  }
`;

export const journalQuestionsLoader = async () => {
  const queryRef = loadQuery<JournalQuestionsQuery>(
    relayEnvironment,
    journalQuestions,
    {}
  );

  return { queryRef };
};

export const JournalQuestionsPreloader = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalQuestionsLoader>
  >;

  const { journal } = usePreloadedQuery(journalQuestions, queryRef);

  const questions = journal?.questions?.system || [];

  return (
    <Box as="ol">
      {questions.map((question, index) => {
        return (
          <Text
            key={index}
            as="li"
            sx={{
              marginY: 'md',
            }}
          >
            {question.question}
          </Text>
        );
      })}
    </Box>
  );
};

export const JournalQuestions = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Journal Questions</Heading>
      <Text
        as="p"
        sx={{
          fontStyle: 'italic',
        }}
      >
        The questions below are the ones that will be asked to you when you
        apply the journal daily questions.
      </Text>
      <React.Suspense fallback={<div>Loading...</div>}>
        <JournalQuestionsPreloader />
      </React.Suspense>
    </Flex>
  );
};

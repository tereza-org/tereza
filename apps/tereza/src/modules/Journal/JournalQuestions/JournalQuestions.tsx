import { Box, Flex, Heading, Text } from '@ttoss/ui';
import { JournalQuestionsList_journalQuestions$key } from './__generated__/JournalQuestionsList_journalQuestions.graphql';
import { Suspense } from '../../Layout';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import {
  journalQuestionsLoader,
  journalQuestionsRootQuery,
} from './journalQuestionsLoader';
import { useLoaderData } from 'react-router-dom';

const QuestionsList = ({
  journalQuestionsRef,
}: {
  journalQuestionsRef: JournalQuestionsList_journalQuestions$key;
}) => {
  const questions = useFragment(
    graphql`
      fragment JournalQuestionsList_journalQuestions on JournalQuestions {
        system {
          question
        }
      }
    `,
    journalQuestionsRef
  );

  const systemQuestions = questions.system.map((question) => {
    return question.question;
  });

  return (
    <Box as="ol">
      {systemQuestions.map((question, index) => {
        return (
          <Text
            key={index}
            as="li"
            sx={{
              marginY: 'md',
            }}
          >
            {question}
          </Text>
        );
      })}
    </Box>
  );
};

const JournalQuestionsPreloader = () => {
  const { journalQuestionsRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalQuestionsLoader>
  >;

  const { journal } = usePreloadedQuery(
    journalQuestionsRootQuery,
    journalQuestionsRootQueryRef
  );

  if (!journal?.questions) {
    return null;
  }

  return <QuestionsList journalQuestionsRef={journal.questions} />;
};

const JournalQuestions = () => {
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
      <Suspense>
        <JournalQuestionsPreloader />
      </Suspense>
    </Flex>
  );
};

export default JournalQuestions;

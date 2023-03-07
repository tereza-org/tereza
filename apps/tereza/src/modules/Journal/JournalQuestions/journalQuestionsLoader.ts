import { graphql, loadQuery } from 'react-relay';
import { journalQuestionsLoaderRootQuery } from './__generated__/journalQuestionsLoaderRootQuery.graphql';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';

export const journalQuestionsRootQuery = graphql`
  query journalQuestionsLoaderRootQuery {
    journal {
      questions {
        ...JournalQuestionsList_journalQuestions
      }
    }
  }
`;

export const journalQuestionsLoader = async () => {
  const journalQuestionsRootQueryRef =
    loadQuery<journalQuestionsLoaderRootQuery>(
      relayEnvironment,
      journalQuestionsRootQuery,
      {}
    );

  return { journalQuestionsRootQueryRef };
};

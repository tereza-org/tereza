import { NoteMetadata } from '@tereza-tech/zettel';
import { NoteSummary } from './NoteSummary';

export const Recommendations = ({
  recommendations,
}: {
  recommendations: NoteMetadata[];
}) => {
  return (
    <div>
      <h2>Recommendations</h2>
      {recommendations.map((note) => {
        return <NoteSummary key={note.id} note={note} />;
      })}
    </div>
  );
};

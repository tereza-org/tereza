import { Journal } from '@tereza-tech/components';
import { useNavigate } from 'react-router-dom';

export const JournalMarkdown = ({
  date,
  label,
  text,
}: {
  date: string;
  label: string;
  text: string;
}) => {
  const navigate = useNavigate();

  return (
    <Journal
      label={label}
      text={text}
      onEdit={() => {
        return navigate(`/journal/${date}/edit`);
      }}
      onLabelClick={() => {
        return navigate(`/journal/${date}`);
      }}
    />
  );
};

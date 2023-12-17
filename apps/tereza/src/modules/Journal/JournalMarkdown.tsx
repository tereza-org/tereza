import { Journal } from '@tereza-tech/components';
import { useRouter } from 'next/navigation';

export const JournalMarkdown = ({
  date,
  label,
  text,
}: {
  date: string;
  label: string;
  text: string;
}) => {
  const router = useRouter();

  return (
    <Journal
      label={label}
      text={text}
      onEdit={() => {
        return router.push(`/my/journal/${date}/edit`);
      }}
      onLabelClick={() => {
        return router.push(`/my/journal/${date}`);
      }}
    />
  );
};

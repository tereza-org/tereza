import { useParams } from 'react-router-dom';

export const ZettelNote = () => {
  const params = useParams();

  return <pre> {JSON.stringify(params, null, 2)} </pre>;
};

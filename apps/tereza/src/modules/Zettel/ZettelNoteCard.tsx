'use client';

import { Stack, Text } from '@ttoss/ui';
import Link from 'next/link';

export const ZettelNoteCard = ({
  note,
}: {
  note: {
    id: string;
    title?: string | null;
    content?: string | null;
  };
}) => {
  return (
    <Stack sx={{ gap: 'lg' }}>
      <Text sx={{ fontSize: 'lg' }}>{note?.title}</Text>
      <Link href={`/my/zettel/${note?.id}/editor`}>Edit</Link>
      <Text>{note?.content}</Text>
    </Stack>
  );
};

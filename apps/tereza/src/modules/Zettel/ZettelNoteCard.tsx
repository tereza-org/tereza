'use client';

import { Markdown } from '@tereza-tech/components';
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
      <Markdown>{note?.content || ''}</Markdown>
    </Stack>
  );
};

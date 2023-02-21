import { Box, Flex, Icon, Text } from '@ttoss/ui';
import { Markdown } from './Markdown';

export type JournalProps = {
  label: string;
  text: string;
  onEdit?: () => void;
};

const TempIcon = Icon as any;

export const Journal = ({ label, text, onEdit }: JournalProps) => {
  const missing = !text;

  const finalText = missing ? '_No journal entry for this day_ 😢' : text;

  return (
    <Flex
      onClick={onEdit}
      sx={{
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        padding: 'md',
        border: '1px solid',
        borderColor: missing ? 'red' : 'transparent',
        borderRadius: '4px',
        cursor: onEdit ? 'pointer' : 'default',
        ':hover': {
          backgroundColor: '#f7f7f7',
        },
      }}
    >
      <Text
        as="p"
        sx={{
          fontWeight: 'bold',
          fontSize: 'lg',
        }}
      >
        {label}
        {onEdit && (
          <Text
            sx={{
              marginLeft: 'md',
            }}
          >
            <TempIcon icon="material-symbols:edit" />
          </Text>
        )}
      </Text>
      <Box
        sx={{
          height: '1px',
          borderTop: '1px solid',
          borderColor: '#ccc',
          marginY: 'md',
        }}
      />
      <Markdown>{finalText}</Markdown>
    </Flex>
  );
};

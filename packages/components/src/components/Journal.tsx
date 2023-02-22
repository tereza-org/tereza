import { Box, Flex, Icon, Text } from '@ttoss/ui';
import { Markdown } from './Markdown';

export type JournalProps = {
  label: string;
  text: string;
  onEdit?: () => void;
  onLabelClick?: () => void;
};

const TempIcon = Icon as any;

export const Journal = ({
  label,
  text,
  onEdit,
  onLabelClick,
}: JournalProps) => {
  const missing = !text;

  const finalText = missing ? '_No journal entry for this day_ 😢' : text;

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        padding: 'xl',
        border: '1px solid',
        borderColor: missing ? 'red' : 'transparent',
        borderRadius: '4px',
      }}
    >
      <Text
        as="p"
        sx={{
          fontWeight: 'bold',
          fontSize: 'lg',
        }}
      >
        <Text
          onClick={onLabelClick}
          sx={{
            cursor: onLabelClick ? 'pointer' : 'default',
            ':hover': {
              textDecoration: onLabelClick ? 'underline' : 'none',
            },
          }}
        >
          {label}
        </Text>
        {onEdit && (
          <Text
            onClick={onEdit}
            sx={{
              marginLeft: 'md',
              cursor: 'pointer',
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

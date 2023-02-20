import { Button, Flex, Input } from '@ttoss/ui';
import { addToDate, getToday, isValidDate } from './utils';

export const DatePicker = ({
  onChange,
  value,
}: {
  onChange: (date: string) => void;
  value: string;
}) => {
  const handleDateChange = (date: string) => {
    if (!isValidDate(date)) {
      return;
    }

    if (date > getToday()) {
      onChange(getToday());
      return;
    }

    onChange(date);
  };

  return (
    <Flex
      sx={{
        gap: 'lg',
      }}
    >
      <Button
        onClick={() => {
          handleDateChange(addToDate(value, { days: -1 }));
        }}
        sx={{
          width: '100px',
        }}
      >
        Prev
      </Button>
      <Input
        type="date"
        value={value}
        max={getToday()}
        onChange={(e) => {
          handleDateChange(e.target.value);
        }}
      />
      <Button
        disabled={value === getToday()}
        onClick={() => {
          handleDateChange(addToDate(value, { days: 1 }));
        }}
        sx={{
          width: '100px',
        }}
      >
        Next
      </Button>
    </Flex>
  );
};

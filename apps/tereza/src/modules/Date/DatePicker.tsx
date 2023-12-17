'use client';

import * as dateFns from 'date-fns';
import { Button, Flex, Input } from '@ttoss/ui';
import { getToday } from './getToday';

/**
 * Check if date is valid in format yyyy-MM-dd and has the format yyyy-MM-dd.
 */
const isValidDate = (date: string) => {
  if (date.length !== 10) {
    return false;
  }

  return dateFns.isValid(new Date(date));
};

const addToDate = (date: string, add: dateFns.Duration) => {
  const format = 'yyyy-MM-dd';

  const parsedDate = dateFns.parse(date, format, new Date());

  const addDay = dateFns.add(parsedDate, add);

  return dateFns.format(addDay, format);
};

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
      >
        Next
      </Button>
    </Flex>
  );
};

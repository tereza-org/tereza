import {
  FolderNotesList,
  FolderNotesListProps,
} from '@tereza-tech/components/src';
import { Story } from '@storybook/react';

export default {
  title: 'react-zettel/FolderNotesList',
  component: FolderNotesList,
};

const Template: Story<FolderNotesListProps> = (args) => {
  return <FolderNotesList {...args} />;
};

export const Example = Template.bind({});

Example.args = {
  notes: [
    {
      group: '/',
      title: 'Example Note 1',
    },
    {
      group: '/',
      title: 'Example Note 2',
    },
  ],
};

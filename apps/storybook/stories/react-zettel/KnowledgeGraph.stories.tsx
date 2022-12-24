import { Box } from '@ttoss/ui';
import { KnowledgeGraph, KnowledgeGraphProps } from '@tereza-tech/react-zettel';
import { Story } from '@storybook/react';
import { fewData, manyData } from './graphData';

export default {
  title: 'react-zettel/KnowledgeGraph',
  component: KnowledgeGraph,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story<KnowledgeGraphProps> = (args) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
      }}
    >
      <KnowledgeGraph {...args} />
    </Box>
  );
};

export const FewData = Template.bind({});
FewData.args = {
  graphData: fewData,
};

export const ManyData = Template.bind({});
ManyData.args = {
  graphData: manyData,
};

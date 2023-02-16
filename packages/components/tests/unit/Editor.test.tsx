import { Editor } from '../../src';
import { act, render, screen } from '@ttoss/test-utils';

const initialMarkdown = `
# Heading 1

## Heading 2

Some Text
`;

test('should render initial markdown', () => {
  render(<Editor initialValue={initialMarkdown} />);

  expect(screen.getByText('Heading 1')).toBeInTheDocument();
  expect(screen.getByText('Heading 2')).toBeInTheDocument();
  expect(screen.getByText('Some Text')).toBeInTheDocument();
});

test('should return markdown on change', () => {
  let changedMarkdown = '';

  const onChange = jest.fn((value) => {
    changedMarkdown = value;
  });

  render(<Editor initialValue={initialMarkdown} onChange={onChange} />);

  act(() => {
    jest.runAllTimers();
  });

  expect(changedMarkdown).toContain('# Heading 1');
  expect(changedMarkdown).toContain('## Heading 2');
  expect(changedMarkdown).toContain('Some Text');
});

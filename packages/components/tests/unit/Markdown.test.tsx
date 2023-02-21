import { Markdown } from '../../src';
import { render, screen } from '@ttoss/test-utils';

test('should render h1', () => {
  render(<Markdown># Hello</Markdown>);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello');
  expect(screen.getByRole('heading', { level: 1 })).not.toHaveTextContent('#');
});

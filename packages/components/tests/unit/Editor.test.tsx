import * as React from 'react';
import { Button, Flex } from '@ttoss/ui';
import { Editor, EditorRef } from '../../src';
import { act, render, screen, userEvent, waitFor } from '@ttoss/test-utils';

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

test('should update editor value', async () => {
  const valueToSet = 'New Value';

  const onChange = jest.fn();

  const UpdateEditor = () => {
    const editorRef = React.useRef<EditorRef>(null);

    return (
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 'xl',
        }}
      >
        <Button
          onClick={() => {
            editorRef.current?.updateValue(valueToSet);
          }}
        >
          Update Editor
        </Button>
        <Editor initialValue="" onChange={onChange} ref={editorRef} />
      </Flex>
    );
  };

  const user = userEvent.setup({ delay: null });

  render(<UpdateEditor />);

  await user.click(screen.getByText('Update Editor'));

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByText(valueToSet)).toBeInTheDocument();
  expect(onChange).not.toHaveBeenCalled();
});

test('should show saving message and then saved message', async () => {
  const onSaveDelay = 1000;

  const onSave = jest.fn().mockImplementation(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, onSaveDelay);
    });
  });

  render(<Editor initialValue={initialMarkdown} onSave={onSave} />);

  const user = userEvent.setup({ delay: null });

  const saveButton = screen.getByLabelText('Save');

  await user.click(saveButton);

  expect(screen.getByText('Saving...')).toBeInTheDocument();

  expect(onSave).toHaveBeenCalledWith(initialMarkdown.trim());

  await act(() => {
    return jest.advanceTimersByTimeAsync(onSaveDelay * 2);
  });

  expect(screen.getByText('Saved')).toBeInTheDocument();
});

// test.only('should not autosave if autoSaveConfig.enabled is false', async () => {
//   const onSave = jest.fn().mockResolvedValue(true);

//   const delay = 1000;

//   render(
//     <Editor
//       initialValue=""
//       onSave={onSave}
//       autoSaveConfig={{ enabled: true, delay }}
//     />
//   );

//   const user = userEvent.setup({ delay: null });

//   await act(async () => {
//     await user.type(screen.getByTestId('editor-input'), 'New Text');
//     return jest.runAllTimers();
//   });

//   await waitFor(() => {
//     return expect(screen.getByText('New Text')).toBeInTheDocument();
//   });

//   // // await waitFor(() => {
//   // jest.advanceTimersByTime(2 * delay);
//   // // });

//   // expect(onSave).not.toHaveBeenCalled();
// });

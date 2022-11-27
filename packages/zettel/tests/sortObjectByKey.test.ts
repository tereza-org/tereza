import { sortObjectByKey } from '../src/sortObjectByKey';

const unsortedObject = {
  d: 'd',
  a: 'a',
  b: 'b',
  c: 'c',
};

test('sortObjectByKey', () => {
  const sortedSequence = ['a', 'b', 'c', 'd'];
  const sortedObject = sortObjectByKey(unsortedObject, sortedSequence);
  expect(sortedObject).toEqual({
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
  });
});

test('sortObjectByKey and keep the old sequence 1', () => {
  const sortedSequence = ['a', 'b'];
  const sortedObject = sortObjectByKey(unsortedObject, sortedSequence);
  expect(sortedObject).toEqual({
    a: 'a',
    b: 'b',
    d: 'd',
    c: 'c',
  });
});

test('sortObjectByKey and keep the old sequence 2', () => {
  const sortedSequence = ['b'];
  const sortedObject = sortObjectByKey(unsortedObject, sortedSequence);
  expect(sortedObject).toEqual({
    b: 'b',
    d: 'd',
    a: 'a',
    c: 'c',
  });
});

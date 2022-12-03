import {
  getFlashcardByProbability,
  getFlashcards,
  getPNumber,
  getRandomInt,
} from '../src/flashcard';
import { zettelkasten } from './zettelkasten';

beforeAll(() => {
  jest.setSystemTime(new Date(2021, 5, 5, 8));
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(() => {
  jest.useRealTimers();
});

test.each([
  [0, 1],
  [0.1, 1],
  [0.2, 2],
  [0.3, 2],
  [0.4, 3],
  [0.5, 3],
  [0.6, 4],
  [0.7, 4],
  [0.8, 5],
  [0.9, 5],
  [0.999, 5],
])('getRandomInt between 1 and 5 #%#', (mathRandom, response) => {
  jest.spyOn(Math, 'random').mockReturnValue(mathRandom);
  expect(getRandomInt({ min: 1, max: 5 })).toEqual(response);
});

test.each([
  [7, 969],
  [14, 939],
  [28, 882],
  [56, 779],
  [112, 607],
])('pNumber: x=%d; y=%d', (x, y) => {
  expect(getPNumber(x)).toEqual(y);
});

test.each([
  [
    "don't return recent notes",
    [
      { date: '2020-02-02' },
      { date: '2020-07-28' },
      { date: '2020-12-07' },
      { date: '2021-03-15' },
      { date: '2021-05-28' },
      { date: '2021-05-29' },
      { date: '2021-05-30' },
      { date: '2021-05-31' },
      { date: '2021-06-01' },
      { date: '2021-06-02' },
      { date: '2021-06-03' },
      { date: '2021-06-04' },
      /**
       * This note is the only one that should not be returned because it was
       * created today.
       */
      { date: '2021-06-05' },
    ],
    [
      { date: '2020-02-02', diffDays: 489, pNumber: 50 },
      { date: '2020-07-28', diffDays: 312, pNumber: 0 },
      { date: '2020-12-07', diffDays: 180, pNumber: 1 },
      { date: '2021-03-15', diffDays: 82, pNumber: 0 },
      { date: '2021-05-28', diffDays: 8, pNumber: 137 },
      { date: '2021-05-29', diffDays: 7, pNumber: 969 },
      { date: '2021-05-30', diffDays: 6, pNumber: 67 },
      { date: '2021-05-31', diffDays: 5, pNumber: 0 },
      { date: '2021-06-01', diffDays: 4, pNumber: 139 },
      { date: '2021-06-02', diffDays: 3, pNumber: 68 },
      { date: '2021-06-03', diffDays: 2, pNumber: 140 },
      { date: '2021-06-04', diffDays: 1, pNumber: 141 },
    ],
  ],
])('getFlashcards test: %#', async (_, allNotes, returnedNotes) => {
  const flashcards = getFlashcards(allNotes as any).map(
    ({ date, diffDays, pNumber }) => {
      return { date, diffDays, pNumber };
    }
  );
  expect(flashcards).toEqual(returnedNotes);
});

describe('testing getFlashcardByProbability', () => {
  test.each([
    [0, '2021-02-01'],
    [0.1, '2021-02-01'],
    [0.249, '2021-02-01'],
    [0.25, '2021-02-01'],
    [0.251, '2021-02-02'],
    [0.499, '2021-02-02'],
    [0.5, '2021-02-02'],
    [0.501, '2021-02-03'],
    [1, '2021-02-09'],
  ])('random: %d', (random, date) => {
    const flashcards = [
      { date: '2021-02-01', pNumber: 250 },
      { date: '2021-02-02', pNumber: 250 },
      { date: '2021-02-03', pNumber: 100 },
      { date: '2021-02-04', pNumber: 100 },
      { date: '2021-02-05', pNumber: 100 },
      { date: '2021-02-06', pNumber: 50 },
      { date: '2021-02-07', pNumber: 50 },
      { date: '2021-02-08', pNumber: 50 },
      { date: '2021-02-09', pNumber: 50 },
    ] as any;

    jest.spyOn(global.Math, 'random').mockReturnValue(random);
    expect(getFlashcardByProbability(flashcards).date).toEqual(date);
  });

  test.each([
    [0],
    [0.1],
    [0.2],
    [0.3],
    [0.4],
    [0.5],
    [0.6],
    [0.7],
    [0.8],
    [0.9],
    [1],
  ])(
    'when all p-numbers is zero, must return the most recent note',
    (random) => {
      const flashcards = [
        { diffDays: 100, pNumber: 0 },
        { diffDays: 1, pNumber: 0 }, // Most recent note.
        { diffDays: 200, pNumber: 0 },
      ] as any;

      jest.spyOn(global.Math, 'random').mockReturnValue(random);
      expect(getFlashcardByProbability(flashcards).diffDays).toEqual(1);
    }
  );
});

test('getFlashcard', async () => {
  const flashcard = await zettelkasten.getFlashcard();
  expect(flashcard).toBeDefined();
  expect(flashcard.diffDays).toBeDefined();
  expect(flashcard.pNumber).toBeDefined();
  expect(flashcard.date).toBeDefined();
  expect(flashcard.diffWeeks.days).toBeDefined();
  expect(flashcard.diffWeeks.weeks).toBeDefined();
});

import { Direction } from '../src/components/types';
import { getDirectionColor } from '../src/utils/common';

describe('Common', () => {
  describe('getDirectionColor', () => {
    const cases: Array<[Direction, string]> = [
      [Direction.IN, 'text-green-600'],
      [Direction.OUT, 'text-red-600'],
    ];
    test.each(cases)(
      'given %p direction as arguments, returns %p',
      (direction, expectedResult) => {
        const result = getDirectionColor(direction as Direction);
        expect(result).toEqual(expectedResult);
      }
    );
  });
});

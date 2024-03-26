import { fDate, fDateTimeBritish, getStartOfWeek } from '../../utils/date';
import { format } from 'date-fns';

describe('fDate', () => {
  test('returns formatted date', () => {
    const formattedDate = fDate('2024-03-26');
    expect(formattedDate).toBe('26/03/2024');
  });
});

describe('fDateTimeBritish', () => {
  test('returns formatted date time', () => {
    const formattedDateTime = fDateTimeBritish('2024-03-26T12:30:00');
    const expectedDateTime = format(
      new Date('2024-03-26T12:30:00'),
      'dd/MM/yyyy hh:mm a'
    );
    expect(formattedDateTime).toBe(expectedDateTime);
  });

  test('returns undefined for null date', () => {
    const formattedDateTime = fDateTimeBritish(null as any);
    expect(formattedDateTime).toBeUndefined();
  });
});

describe('getStartOfWeek', () => {
  test('returns start of the week', () => {
    const mondayDate = new Date('2024-03-25T12:00:00');
    const toISOStringSpy = jest
      .spyOn(mondayDate, 'toISOString')
      .mockReturnValue('mockedISOString');
    const originalDate = (global as any).Date;
    (global as any).Date = jest.fn(() => mondayDate);

    const startOfWeek = getStartOfWeek();
    expect(startOfWeek).toBe('mockedISOString');

    (global as any).Date = originalDate;
    toISOStringSpy.mockRestore();
  });
});

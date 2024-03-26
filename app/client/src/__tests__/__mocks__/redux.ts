export const mockStore = {
  getState: jest.fn(),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
};

export const useSelector = jest.fn();
export const useDispatch = jest.fn();

test('placeholder', () => {
  expect(true).toBe(true);
});

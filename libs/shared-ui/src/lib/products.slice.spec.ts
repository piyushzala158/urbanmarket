import {
  fetchProducts,
  productsAdapter,
  productsReducer,
} from './products.slice';

describe('products reducer', () => {
  it('should handle initial state', () => {
    const expected = productsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(productsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchProducts', () => {
    let state = productsReducer(undefined, fetchProducts.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = productsReducer(state, fetchProducts.fulfilled([{ id: 1 }], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = productsReducer(
      state,
      fetchProducts.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});

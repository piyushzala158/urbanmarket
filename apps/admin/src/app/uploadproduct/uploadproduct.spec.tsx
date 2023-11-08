import { render } from '@testing-library/react';

import Uploadproduct from './uploadproduct';

describe('Uploadproduct', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Uploadproduct />);
    expect(baseElement).toBeTruthy();
  });
});

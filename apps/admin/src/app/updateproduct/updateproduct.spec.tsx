import { render } from '@testing-library/react';

import Updateproduct from './updateproduct';

describe('Updateproduct', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Updateproduct />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Productlisting from './productlisting';

describe('Productlisting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Productlisting />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Createcategory from './createcategory';

describe('Createcategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Createcategory />);
    expect(baseElement).toBeTruthy();
  });
});

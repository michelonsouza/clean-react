import React from 'react';
import { render } from '@testing-library/react';

import Login from '.';

describe('Login Page', () => {
  it('should not render error message on start', () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(0);
  });
});

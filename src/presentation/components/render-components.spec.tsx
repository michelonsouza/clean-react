import React from 'react';
import { render } from '@testing-library/react';

import { Logo, Spinner } from '.';

describe('RenderComponents', () => {
  it('should render Logo component', () => {
    const testId = 'logo-testid';
    const { getByTestId } = render(<Logo data-testid={testId} />);

    expect(getByTestId(testId)).toBeTruthy();
  });

  it('should render Spinner component', () => {
    const testId = 'spinner-testid';
    const { getByTestId } = render(<Spinner data-testid={testId} />);

    expect(getByTestId(testId)).toBeTruthy();
  });

  it('should render Spinner component with variant', () => {
    const testId = 'spinner-testid';
    const { getByTestId } = render(
      <Spinner data-testid={testId} variant="info" />,
    );

    const criclePoint = getByTestId('circle-point');

    expect(criclePoint).toBeTruthy();
  });
});

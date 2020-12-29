import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';

import { FormContext } from '@/presentation/contexts';

import Input from '.';

const makeSut = (testId: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input data-testid={testId} />
    </FormContext.Provider>,
  );
};

describe('InputComponent', () => {
  it('should set readonly to false on focus', () => {
    const testId = 'input-testid';
    const { getByTestId } = makeSut(testId);
    const inputComponent = getByTestId(testId) as HTMLInputElement;

    fireEvent.focus(inputComponent);

    expect(inputComponent.readOnly).toBe(false);
  });
  it('should set readonly to true on blur', () => {
    const testId = 'input-testid';
    const { getByTestId } = makeSut(testId);
    const inputComponent = getByTestId(testId) as HTMLInputElement;

    fireEvent.focus(inputComponent);

    expect(inputComponent.readOnly).toBe(false);

    fireEvent.blur(inputComponent);

    expect(inputComponent.readOnly).toBe(true);
  });
});

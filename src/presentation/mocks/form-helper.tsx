import { RenderResult } from '@testing-library/react';

export const testChildCount = (
  sut: RenderResult,
  elementTestId: string,
  count: number,
): void => {
  const element = sut.getByTestId(elementTestId);
  expect(element.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  sut: RenderResult,
  buttonTestId: string,
  isDisabled = true,
): void => {
  const button = sut.getByTestId(buttonTestId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const status = sut.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
};

import { ErrorCodeToMessagePipe } from './error-code-to-message.pipe';

describe('ErrorCodeToMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorCodeToMessagePipe();
    expect(pipe).toBeTruthy();
  });
});

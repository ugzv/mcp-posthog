import { textResult, readOnly, create, update, destroy } from '../src/tools/_helpers';

describe('_helpers', () => {
  it('textResult wraps strings verbatim', () => {
    expect(textResult('hi')).toEqual({ content: [{ type: 'text', text: 'hi' }] });
  });

  it('textResult JSON-serializes objects', () => {
    expect(textResult({ a: 1 })).toEqual({ content: [{ type: 'text', text: '{\n  "a": 1\n}' }] });
  });

  it('annotation presets are mutually exclusive where required', () => {
    expect(readOnly.readOnlyHint).toBe(true);
    expect(create.readOnlyHint).toBe(false);
    expect(update.readOnlyHint).toBe(false);
    expect(destroy.destructiveHint).toBe(true);
    expect(destroy.readOnlyHint).toBe(false);
    expect(readOnly.idempotentHint).toBe(true);
    expect(update.idempotentHint).toBe(true);
  });
});

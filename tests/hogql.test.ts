import { hogqlErrorHint, HOGQL_SCHEMA_SHORT, HOGQL_SCHEMA_FULL } from '../src/hogql';

describe('hogqlErrorHint', () => {
  it('hints on unresolved field errors (e.g. min_timestamp)', () => {
    const hint = hogqlErrorHint('Unable to resolve field: min_timestamp. Did you mean: timestamp?');
    expect(hint).toMatch(/does not exist/i);
    expect(hint).toMatch(/min\(timestamp\)/);
  });

  it('hints on string aggregate errors with a cast suggestion', () => {
    const hint = hogqlErrorHint('Illegal type String of argument for aggregate function avg.');
    expect(hint).toMatch(/toFloat64/);
  });

  it('hints on unsupported integer casts', () => {
    expect(hogqlErrorHint('Unknown function toInt64')).toMatch(/not supported/i);
  });

  it('returns null for unrecognized errors', () => {
    expect(hogqlErrorHint('rate limit exceeded')).toBeNull();
    expect(hogqlErrorHint('')).toBeNull();
  });
});

describe('HogQL schema guidance', () => {
  it('short guide warns about string properties and missing timestamp columns', () => {
    expect(HOGQL_SCHEMA_SHORT).toMatch(/min_timestamp/);
    expect(HOGQL_SCHEMA_SHORT).toMatch(/toFloat64/);
    expect(HOGQL_SCHEMA_SHORT).toMatch(/posthog:\/\/hogql\/schema/);
  });

  it('full guide documents casts, sessions, and $exception arrays', () => {
    expect(HOGQL_SCHEMA_FULL).toMatch(/toFloat64/);
    expect(HOGQL_SCHEMA_FULL).toMatch(/sessions/);
    expect(HOGQL_SCHEMA_FULL).toMatch(/\$exception_values/);
  });
});

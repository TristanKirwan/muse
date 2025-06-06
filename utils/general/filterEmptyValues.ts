// This is only used to help Typescript, as a normal filter func without this
// annotation wouldn't 'remove' null values from the possible types.
export default function filterEmptyValues<T>(
  val: T | null | undefined
): val is T {
  return val !== null && val !== undefined;
}

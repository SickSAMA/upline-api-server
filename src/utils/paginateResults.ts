import { Paginatable } from '../types/Paginatable';

export default function paginateResults<T extends Paginatable>({
  after: cursor,
  pageSize = 2,
  results,
}: {
  after?: string,
  pageSize?: number,
  results: T[]
}): T[] {
  if (pageSize < 1) return [];

  if (!cursor) {
    return results.slice(0, pageSize);
  }

  const cursorIndex = results.findIndex((item) => item.cursor === cursor);

  return cursorIndex >= 0 ?
    cursorIndex === results.length - 1 ?
      [] :
      results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
      ) :
    results.slice(0, pageSize);
}

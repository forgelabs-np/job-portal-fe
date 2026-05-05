export const generateNextPath = (
  path: string,
  params: Record<string, string | number>,
) => {
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(`:${key}`, String(params[key])),
    path,
  );
};

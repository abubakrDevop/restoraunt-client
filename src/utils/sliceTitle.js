export const sliceTitle = (title) => {
  if (!title) {
    return null;
  }

  if (title?.length > 32) {
    return title.substring(0, 32) + '...';
  }

  return title;
};
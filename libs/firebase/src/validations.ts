const isEmpty = (item: string): boolean => (!item ? true : false);

const validateName = (name: string): boolean => {
  if (isEmpty(name)) return false;
  if (name.split(' ').length < 2) return false;
  return true;
};

const validatTitle = (title: string): string => {
  if (isEmpty(title)) return 'Enter title';
  if (title.length < 10) return 'Title too short';
  if (title.length > 25) return 'Please summarize that';
  return '';
};

export { validateName, isEmpty, validatTitle };

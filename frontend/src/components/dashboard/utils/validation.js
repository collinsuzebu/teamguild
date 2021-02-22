// validate non empty fields in form
export const isValidInput = (obj) =>
  !Object.values(obj).some((x) => x === null || x == "");

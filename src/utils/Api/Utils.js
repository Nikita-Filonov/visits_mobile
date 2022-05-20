export const toQuery = async (object: Object) =>
  object ? '?' + new URLSearchParams(object).toString() : '';

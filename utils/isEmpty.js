const isEmpty = (data) => {
  if (
    !data ||
    (typeof data === "object" && (!data || Object.keys(data).length === 0))
  )
    return true;
  return false;
};
module.exports = isEmpty;

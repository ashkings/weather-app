import { CDN_URL } from "./constants";

export const arrayGroup = function (keyFn, arr = []) {
  return arr.reduce(function (groups, item) {
    const key = keyFn(item);
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
};

export const getIconUrl = (icon) => {
  return `${CDN_URL}/${icon}@2x.png`;
};

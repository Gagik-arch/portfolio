export const minNumberIndex = (arr:number[]):number => {
    return arr.reduce((r, v, i, a) => v > a[r] ? r : i, -1);
};

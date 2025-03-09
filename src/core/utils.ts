/**
 * 在[min, max)区间拿到一个随机数字
 * @param min
 * @param max
 * @returns
 */

export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

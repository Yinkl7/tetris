import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./type";
import { getRandom } from "./utils";

/**
 * 俄罗斯方块的所有类型
 */

// { x: 0, y: 0 }
export const TShape: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
];

export const LShape: Shape = [
  { x: -2, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
];

export const LMirrorShape: Shape = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
];

export const SShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
];

export const SMirrorShape: Shape = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const SquareShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const LineShape: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
];

export const colors: string[] = ["red", "#fff", "orange", "blue", "green"];

export const shapes = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape,
];

/**
 * 随机产生一个俄罗斯方块（颜色、形状随机）
 */
export function createTeris(centerPoint: Point) {
  return new SquareGroup(
    shapes[getRandom(0, shapes.length)],
    centerPoint,
    colors[getRandom(0, colors.length)]
  );
}

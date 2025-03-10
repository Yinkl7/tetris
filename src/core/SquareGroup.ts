import { Square } from "./Square";
import { Point, Shape } from "./type";

/**
 * 组合方块
 */
export class SquareGroup {
  private _squares: readonly Square[] = [];

  constructor(
    private _shape: Shape,
    private _center: Point,
    private _color: string
  ) {
    const arr: Square[] = [];
    this._shape.forEach((item) => {
      const sq = new Square();
      sq.point = {
        x: item.x + this._center.x,
        y: item.y + this._center.y,
      };
      sq.color = this._color;
      arr.push(sq);
    });
    this._squares = arr;
  }

  public get square() {
    return this._squares;
  }

  public get shape() {
    return this._shape;
  }

  public set center(val: Point) {
    this._center = val;
    // TODO
    this._shape.forEach((s, i) => {
      this._squares[i].point = {
        x: s.x + val.x,
        y: s.y + val.y,
      };
    });
  }

  public get center() {
    return this._center;
  }
}

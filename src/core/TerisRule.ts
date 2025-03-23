import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { Direction, Point, Shape } from "./type";

function isPoint(obj: any): obj is Point {
  if (obj.x !== undefined) {
    return true;
  }
  return false;
}

/**
 * 该类中提供一系列根据游戏规则判断的函数
 */

export class TerisRule {
  static canIMove(shape: Shape, targetPoint: Point, exist: Square[]): boolean {
    const target = shape.map((item) => {
      return {
        x: item.x + targetPoint.x,
        y: item.y + targetPoint.y,
      };
    });

    // 边界判断
    let flag = target.some((item) => {
      return (
        item.x < 0 ||
        item.x > GameConfig.pannelSize.width - 1 ||
        item.y < 0 ||
        item.y > GameConfig.pannelSize.height - 1
      );
    });
    if (flag) return false;

    // 判断是否与已有方块重叠
    flag = target.some((p) =>
      exist.some((sq) => sq.point.x === p.x && sq.point.y === p.y)
    );
    if (flag) return false;

    return true;
  }

  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point,
    exist: Square[]
  ): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Direction,
    exist: Square[]
  ): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | Direction,
    exist: Square[]
  ): boolean {
    // 目标点的情况
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(teris.shape, targetPointOrDirection, exist)) {
        teris.center = targetPointOrDirection;
        return true;
      }
    } else {
      // 方向的情况
      let targetPoint: Point;
      if (targetPointOrDirection === Direction.LEFT) {
        targetPoint = { x: teris.center.x - 1, y: teris.center.y };
      } else if (targetPointOrDirection === Direction.RIGHT) {
        targetPoint = { x: teris.center.x + 1, y: teris.center.y };
      } else if (targetPointOrDirection === Direction.BOTTOM) {
        targetPoint = { x: teris.center.x, y: teris.center.y + 1 };
      }
      return this.move(teris, targetPoint!, exist);
    }

    return false;
  }

  static moveDirectly(
    teris: SquareGroup,
    direction: Direction,
    exist: Square[]
  ) {
    while (this.move(teris, direction, exist)) {}
  }

  static rotate(teris: SquareGroup, exist: Square[]): boolean {
    const newShape = teris.afterRotateShape();
    if (this.canIMove(newShape, teris.center, exist)) {
      teris.rotate();
      return true;
    } else {
      return false;
    }
  }

  static getLineSquare(exist: Square[], y: number) {
    return exist.filter((p) => p.point.y === y);
  }

  static deleteSquare(exist: Square[]): number {
    const ys = exist.map((sq) => sq.point.y);
    const maxY = Math.max(...ys);
    const minY = Math.min(...ys);

    let num = 0;
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(exist, y)) {
        num++;
      }
    }
    return num;
  }

  static deleteLine(exist: Square[], y: number): boolean {
    const squareList = this.getLineSquare(exist, y);
    if (squareList.length === GameConfig.pannelSize.width) {
      squareList.forEach((sq) => {
        // 1、界面中移除
        sq.viewer && sq.viewer.remove();
        // 3、在exist中移除
        const index = exist.indexOf(sq);
        exist.splice(index, 1);
      });
      // 2、移动y坐标
      exist
        .filter((sq) => sq.point.y < y)
        .forEach((sq) => (sq.point = { x: sq.point.x, y: sq.point.y + 1 }));

      return true;
    }
    return false;
  }
}

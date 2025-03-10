import GameConfig from "./GameConfig";
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
  static canIMove(shape: Shape, targetPoint: Point): boolean {
    const target = shape.map((item) => {
      return {
        x: item.x + targetPoint.x,
        y: item.y + targetPoint.y,
      };
    });

    const flag = target.some((item) => {
      return (
        item.x < 0 ||
        item.x > GameConfig.pannelSize.width - 1 ||
        item.y < 0 ||
        item.y > GameConfig.pannelSize.height - 1
      );
    });

    return !flag;
  }

  static move(teris: SquareGroup, targetPointOrDirection: Point): boolean;
  static move(teris: SquareGroup, targetPointOrDirection: Direction): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | Direction
  ): boolean {
    // 目标点的情况
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(teris.shape, targetPointOrDirection)) {
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
      return this.move(teris, targetPoint!);
    }

    return false;
  }

  static moveDirectly(teris: SquareGroup, direction: Direction) {
    while(this.move(teris, direction)) {}
  }
}

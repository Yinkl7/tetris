import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  show(): void;
  remove(): void;
}

export type Shape = Point[];

export enum Direction {
  LEFT,
  RIGHT,
  BOTTOM,
}

export enum GameStauts {
  INIT,
  START,
  PAUSE,
  OVER,
}

export interface GameViewer {
  /**
   *
   * @param teris 下一个方块对象
   */
  showNext(teris: SquareGroup): void;
  /**
   *
   * @param teris 切换显示方块对象
   */
  switch(teris: SquareGroup): void;

  /**
   *
   * @param game
   */
  init(game: Game): void;

  showScore(score: number): void;
}

export enum KeyEvent {
  down = "ArrowDown",
  left = "ArrowLeft",
  right = "ArrowRight",
  rotate = "KeyJ",
  space = "Space",
}

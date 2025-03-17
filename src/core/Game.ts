import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { Direction, GameStauts, GameViewer } from "./type";

export class Game {
  // 游戏状态
  private _gameStatus: GameStauts = GameStauts.INIT;
  // 当前方块
  private _currentTeris?: SquareGroup;
  // 下一个方块
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  // 计时器
  private _timer?: NodeJS.Timeout;
  // 下落间隔事件
  private _duration: number = 1000;

  constructor(private _viewer: GameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }

  /**
   * 开始游戏
   */
  start() {
    // 判断状态
    if (this._gameStatus === GameStauts.START) {
      return;
    }
    this._gameStatus = GameStauts.START;
    // 切换方块
    if (!this._currentTeris) {
      this.switchTeris();
    }
    // 自由落下
    this.autoDrop();
  }

  /**
   *
   */
  pause() {
    if (this._gameStatus === GameStauts.START || this._timer) {
      this._gameStatus = GameStauts.PAUSE;
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  controlLeft() {
    if (this._currentTeris && this._gameStatus === GameStauts.START) {
      TerisRule.move(this._currentTeris, Direction.LEFT);
    }
  }

  controlRight() {
    if (this._currentTeris && this._gameStatus === GameStauts.START) {
      TerisRule.move(this._currentTeris, Direction.RIGHT);
    }
  }

  controlBottom() {
    if (this._currentTeris && this._gameStatus === GameStauts.START) {
      TerisRule.moveDirectly(this._currentTeris, Direction.BOTTOM);
    }
  }

  controlRotate() {
    if (this._currentTeris && this._gameStatus === GameStauts.START) {
      TerisRule.rotate(this._currentTeris);
    }
  }

  /**
   * 切换方块
   */
  private switchTeris() {
    this._currentTeris = this._nextTeris;
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.switch(this._currentTeris);
    this.resetCenterPoint(GameConfig.pannelSize.width, this._currentTeris);
    this._viewer.showNext(this._nextTeris);
  }

  /**
   * 自由落下
   */
  private autoDrop() {
    if (this._timer && this._gameStatus !== GameStauts.START) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._currentTeris) {
        TerisRule.move(this._currentTeris, Direction.BOTTOM);
      }
    }, this._duration);
  }

  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    teris.center = { x, y };
    while (teris.square.some((sq) => sq.point.y < 0)) {
      teris.square.forEach(
        (sq) =>
          (sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1,
          })
      );
    }
  }
}

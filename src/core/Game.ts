import GameConfig from "./GameConfig";
import { Square } from "./Square";
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
  private _nextTeris: SquareGroup;
  // 计时器
  private _timer?: NodeJS.Timeout;
  // 下落间隔事件
  private _duration: number = 1000;
  // 已存在的方块
  private _existSquare: Square[] = [];
  // 积分
  private _score: number = 0;

  get gameStatus() {
    return this._gameStatus;
  }

  constructor(private _viewer: GameViewer) {
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
    this._viewer.init(this);
  }

  private createNext() {
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }

  private init() {
    this._existSquare.forEach((sq) => {
      if (sq.viewer) {
        sq.viewer.remove();
      }
    });
    this._existSquare = [];
    this.createNext();
    this._currentTeris = undefined;
    this._duration = GameConfig.level[0].duration;
  }

  /**
   * 开始游戏
   */
  start() {
    // 判断状态
    if (this._gameStatus === GameStauts.START) {
      return;
    } else if (this._gameStatus === GameStauts.OVER) {
      this.init();
    }
    this._gameStatus = GameStauts.START;
    this._score = 0;
    this._viewer.showScore(this._score);
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
      TerisRule.move(this._currentTeris, Direction.LEFT, this._existSquare);
    }
  }

  controlRight() {
    if (this._currentTeris && this._gameStatus === GameStauts.START) {
      TerisRule.move(this._currentTeris, Direction.RIGHT, this._existSquare);
    }
  }

  controlBottom() {
    if (this._currentTeris && this._gameStatus === GameStauts.START) {
      TerisRule.moveDirectly(
        this._currentTeris,
        Direction.BOTTOM,
        this._existSquare
      );
      // 触底
      this.hitBottom();
    }
  }

  controlRotate() {
    if (this._currentTeris && this._gameStatus === GameStauts.START) {
      TerisRule.rotate(this._currentTeris, this._existSquare);
    }
  }

  /**
   * 切换方块
   */
  private switchTeris() {
    this._currentTeris = this._nextTeris;
    this._currentTeris.square.forEach((sq) => {
      if (sq.viewer) {
        sq.viewer.remove();
      }
    });
    this.resetCenterPoint(GameConfig.pannelSize.width, this._currentTeris);
    // 判断下一个方块是否和之前的方块出现重叠
    if (
      !TerisRule.canIMove(
        this._currentTeris.shape,
        this._currentTeris.center,
        this._existSquare
      )
    ) {
      this._gameStatus = GameStauts.OVER;
      clearInterval(this._timer);
      this._timer = undefined;
      return;
    }
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.switch(this._currentTeris);
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
        // 触底
        if (
          !TerisRule.move(
            this._currentTeris,
            Direction.BOTTOM,
            this._existSquare
          )
        ) {
          this.hitBottom();
        }
      }
    }, this._duration);
  }

  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    teris.center = { x, y };
    while (teris.square.some((sq) => sq.point.y < 0)) {
      teris.center = {
        x: teris.center.x,
        y: teris.center.y + 1,
      };
    }
  }

  /**
   * 触底操作
   * 1、保存当前方块
   * 2、消除处理
   * 3、胜负判断
   * 4、切换方块
   */
  private hitBottom() {
    this._existSquare.push(...this._currentTeris!.square);

    const num = TerisRule.deleteSquare(this._existSquare);
    this.addScore(num);
    // 切换方块
    this.switchTeris();
  }

  private addScore(lineNum: number) {
    if (lineNum === 0) {
      return;
    } else if (lineNum === 1) {
      this._score += 10;
    } else if (lineNum === 2) {
      this._score += 25;
    } else if (lineNum === 3) {
      this._score += 50;
    } else {
      this._score += 100;
    }
    this._viewer.showScore(this._score);
    let level = GameConfig.level
      .filter((item) => item.score < this._score)
      .pop();
    console.log("level=== ", level);
    if (level && level.duration !== this._duration) {
      clearInterval(this._timer);
      this._timer = undefined;
      this._duration = level.duration;
      this.autoDrop();
    }
  }
}

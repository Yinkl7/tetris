import { SquareGroup } from "../SquareGroup";
import { GameStauts, GameViewer, KeyEvent } from "../type";
import $ from "jquery";
import { SquarePageViewer } from "./SquarePageViewer";
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {
  private _pannelDom = $("#pannel");
  private _nextDom = $("#next");
  private _scoreDom = $("#score");

  init(game: Game): void {
    // 1、设置宽高
    this._pannelDom.css({
      width: GameConfig.pannelSize.width * PageConfig.SquareSize.width,
      height: GameConfig.pannelSize.height * PageConfig.SquareSize.height,
    });

    this._nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
      height: GameConfig.nextSize.height * PageConfig.SquareSize.height,
    });

    // 2、注册键盘事件
    $(document).keydown(function (e) {
      // console.log("key==== ", e);
      if (e.code === KeyEvent.down) {
        game.controlBottom();
      } else if (e.code === KeyEvent.left) {
        game.controlLeft();
      } else if (e.code === KeyEvent.right) {
        game.controlRight();
      } else if (e.code === KeyEvent.rotate) {
        game.controlRotate();
      } else if (e.code === KeyEvent.space) {
        if (game.gameStatus === GameStauts.START) {
          game.pause();
        } else {
          game.start();
        }
      }
    });
  }

  showScore(score: number): void {
    this._scoreDom.html(score.toString());
  }

  showNext(teris: SquareGroup): void {
    teris.square.forEach((sq) => {
      sq.viewer = new SquarePageViewer(sq, this._nextDom);
    });
  }

  switch(teris: SquareGroup): void {
    teris.square.forEach((sq) => {
      sq.viewer!.remove();
      sq.viewer = new SquarePageViewer(sq, this._pannelDom);
    });
  }
}

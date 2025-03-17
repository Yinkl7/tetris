import { SquareGroup } from "../SquareGroup";
import { GameViewer } from "../type";
import $ from "jquery";
import { SquarePageViewer } from "./SquarePageViewer";

export class GamePageViewer implements GameViewer {
  showNext(teris: SquareGroup): void {
    teris.square.forEach((sq) => {
      sq.viewer = new SquarePageViewer(sq, $("#next"));
    });
  }

  switch(teris: SquareGroup): void {
    teris.square.forEach((sq) => {
      sq.viewer!.remove();
      sq.viewer = new SquarePageViewer(sq, $("#pannel"));
    });
  }
}

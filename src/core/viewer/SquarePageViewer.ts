import { Square } from "../Square";
import $ from "jquery";
import { IViewer } from "../type";
import pageConfig from "./PageConfig";

export class SquarePageViewer implements IViewer {
  private dom?: JQuery<HTMLElement>;
  private isRemove: boolean = false;

  constructor(private square: Square, private container: JQuery<HTMLElement>) {}
  show(): void {
    if (this.isRemove) {
      return;
    }
    if (!this.dom) {
      this.dom = $("<div>")
        .css({
          width: pageConfig.SquareSize.width,
          height: pageConfig.SquareSize.height,
          border: pageConfig.SquareBorder,
          position: "absolute",
          boxSizing: "border-box",
        })
        .appendTo(this.container);
    }
    this.dom.css({
      left: pageConfig.SquareSize.width * this.square.point.x,
      top: pageConfig.SquareSize.height * this.square.point.y,
      backgroundColor: this.square.color,
    });
  }
  remove(): void {
    if (this.dom) {
      this.dom.remove();
      this.isRemove = true;
    }
  }
}

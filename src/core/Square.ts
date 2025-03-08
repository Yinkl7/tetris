import { IViewer, Point } from "./type";

export class Square {
  private _point: Point = {
    x: 0,
    y: 0,
  };

  private _color: string = "red";

  private _viewer?: IViewer;

  public set point(val: Point) {
    this._point = val;
    if (this._viewer) {
      this._viewer.show();
    }
  }

  public get point() {
    return this._point;
  }

  public set color(val: string) {
    this._color = val;
  }

  public get color() {
    return this._color;
  }

  public set viewer(val: IViewer) {
    this._viewer = val;
    if (val) {
      val.show();
    }
  }

  public get viewer(): IViewer | undefined {
    return this._viewer;
  }
}

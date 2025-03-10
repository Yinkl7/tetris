import { SquareGroup } from "./core/SquareGroup";
import { createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRule";
import { Direction, Shape } from "./core/type";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";

const teris = createTeris({ x: 3, y: 2 });

teris.square.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $("#root"));
});

$("#to-bottom").click(function () {
  // const tp = {
  //   x: teris.center.x,
  //   y: teris.center.y + 1,
  // };
  // if (TerisRule.canIMove(teris.shape, tp)) {
  //   teris.center = tp;
  // }
  TerisRule.moveDirectly(teris, Direction.BOTTOM);
});

$("#to-top").click(function () {
  const tp = {
    x: teris.center.x,
    y: teris.center.y - 1,
  };
  // if (TerisRule.canIMove(teris.shape, tp)) {
  //   teris.center = tp;
  // }
  TerisRule.move(teris, tp);
});

$("#to-right").click(function () {
  // const tp = {
  //   x: teris.center.x + 1,
  //   y: teris.center.y,
  // };
  // if (TerisRule.canIMove(teris.shape, tp)) {
  //   teris.center = tp;
  // }
  TerisRule.moveDirectly(teris, Direction.RIGHT);
});

$("#to-left").click(function () {
  // const tp = {
  //   x: teris.center.x - 1,
  //   y: teris.center.y,
  // };
  // if (TerisRule.canIMove(teris.shape, tp)) {
  //   teris.center = tp;
  // }
  TerisRule.moveDirectly(teris, Direction.LEFT);
});

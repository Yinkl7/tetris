// import { SquareGroup } from "./core/SquareGroup";
// import { createTeris } from "./core/Teris";
// import { TerisRule } from "./core/TerisRule";
// import { Direction, Shape } from "./core/type";
// import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
// import $ from "jquery";

import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from "jquery";

const g = new Game(new GamePageViewer());

$("#to-right").click(function () {
  g.controlRight();
});
$("#to-left").click(function () {
  g.controlLeft();
});
$("#to-bottom").click(function () {
  g.controlBottom();
});
$("#rotate-clock").click(function () {
  g.controlRotate();
});
$("#start").click(function () {
  g.start();
});
// pause
$("#pause").click(function () {
  g.pause();
});

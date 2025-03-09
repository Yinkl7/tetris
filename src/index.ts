import { SquareGroup } from "./core/SquareGroup";
import { createTeris } from "./core/Teris";
import { Shape } from "./core/type";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";

const teris = createTeris({ x: 3, y: 2 });

teris.square.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $("#root"));
});

$("#to-bottom").click(function () {
  teris.center = {
    x: teris.center.x,
    y: teris.center.y + 1,
  };
});

$("#to-top").click(function () {
  teris.center = {
    x: teris.center.x,
    y: teris.center.y - 1,
  };
});

$("#to-right").click(function () {
  teris.center = {
    x: teris.center.x + 1,
    y: teris.center.y,
  };
});

$("#to-left").click(function () {
  teris.center = {
    x: teris.center.x - 1,
    y: teris.center.y,
  };
});

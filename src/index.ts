import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";

const sq = new Square();
sq.viewer = new SquarePageViewer(sq, $("#root"));

sq.point = {
  x: 4,
  y: 3,
};

sq.color = "red";

// setInterval(() => {
//   sq.point = {
//     x: sq.point.x,
//     y: sq.point.y + 1,
//   };
// }, 1000);

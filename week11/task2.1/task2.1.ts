import * as d3 from "d3";
import { randomInts, removeRandom } from "./task2.1-helpers";


let data = randomInts(10, 20, true);
let prefix = 'x';

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", 2000)
  .attr("height", 200);


const clear = () => {
  svg.selectAll("circle")
    .transition()
    .duration(500)
    .attr("fill", "red")
    .attr("r", 0)
    .remove();

  prefix = 'x';
}

const render = (data: number[], withClear = false, prefix = "x") => {
  console.log('Rendering with data:', data, 'and prefix:', prefix);


  if (withClear) {
    svg.selectAll("circle")
      .transition()
      .duration(500)
      .attr("fill", "red")
      .attr("r", 0)
      .remove();
  }

  const circles = svg
    .selectAll("circle")
    .data(data, (d) => `${prefix}-${d}`)
    .join(
      (enter) => {
        const circles = enter
          .append("circle")
          .each((d, i, arr) => {
            console.log('Entering element:', { d, i });
          })
          // .attr("cx", (d, i) => d * 50)
          .attr("cx", (d, i) => (i + 1) * 50)
          .attr("cy", 100)
          .attr("r", 0)

        circles.transition()
          .delay(500)
          .duration(500)
          .attr("r", d => d)
          .attr("fill", "green")

        return circles;
      },
      (update) => {
        update.each((d, i, arr) => {
          console.log('Updating element:', { d, i });
        })
        .transition()
        .duration(500)
        .attr("r", 0)
        .delay(500)
        .duration(500)
        .attr("cx", (d, i) => (i + 1) * 50)
        .attr("cy", 100 + prefix.split('').length * 2)
        .attr("r", d => d)
        .attr("fill", "blue");
      },
      (exit) => exit
        .each((d, i, arr) => {
          console.log('Exiting element:', { d, i });
        })
        .transition()
        .duration(500)
        .attr("fill", "red")
        .attr("r", 0)
        .remove()
    )

  // const transition = circles.transition()
  //   .duration(500)
  //   .attr("r", (d) => d + 5);
}

render(data);

d3.select("#app")
  .append("button")
  .text("Remove random")
  .on("click", () => {
    data = removeRandom(data);
    render(data, false, prefix);
  });
d3.select("#app")
  .append("button")
  .text("Reset")
  .on("click", () => {
    data = randomInts(10, 20, true);
    prefix += 'x';
    render(data, false, prefix);
  });
d3.select("#app")
  .append("button")
  .text("Clear")
  .on("click", () => {
    clear();
  });

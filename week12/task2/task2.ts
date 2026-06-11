import * as d3 from "d3";
import { isEven } from "./task2-helpers";


const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
const ul = d3.select("#chart").append("ul");

// const li = ul.selectAll("li").data(fruits)
// li.enter()
//   .append("li")
//   .text((d) => {
//     console.log(d);
//     return d;
//   })

// // li.exit()
// //   .classed("exited")

// setTimeout(() => {
//   console.log('Updating data...');
//   const newFruits = ["Fig", "Grape", "Honeydew"];
//   // fruits.concat(newFruits);
//   // ul.selectAll("li").data(fruits).join("li").text((d) => d);
//   const li2 = ul.selectAll("li").data(newFruits)
//   // handle updated elements
//   li2.text(d => d).attr("style", "color: blue;");
//   // handle new elements
//   li2.enter().append("li").text((d) => d);
//   // handle removed elements
//   li2.exit().classed("exited", true)
// }, 1000)

const drawList = (
  container: d3.Selection<HTMLUListElement, unknown, HTMLElement, any>,
  data: string[],
  removeExited = false
) => {
  const liElements = container.selectAll("li").data(data);

  const defaultColorStyle = "color: black;";
  const updatedColorStyle = "color: blue;";

  const hasExited = (i: number, arr: any[]): boolean => arr[i]?.classList.contains("exited") ?? false;

  // Update existing elements
  liElements.text((d, i) => {
    console.log('Updating element:', { d, i });
    return d
  })
    .attr("style", (d, i, arr) => {
      if (hasExited(i, arr as any)) {
        console.log('Element has exited, skipping style update:', { d, i });
        return defaultColorStyle;
      }
      return updatedColorStyle;
    })
    .classed("exited", false);

  // Add new elements
  liElements
    .enter()
    .append("li")
    .text((d, i) => {
      console.log('Adding element:', { d, i });
      return d;
    })
    .attr("style", defaultColorStyle)
    .classed("even", isEven);

  // Remove old elements
  const exit = liElements.exit()
  if (removeExited) {
    exit.remove();
  } else {
    exit
      .attr("style", defaultColorStyle)
      .classed("exited", (d, i) => {
        console.log('Removing element:', { d, i });
        return true;
      })
  }
}

const wait = (time = 1000) => new Promise((resolve) => setTimeout(resolve, time));
const fn = async () => {
  console.log('Initial draw...');
  drawList(ul, fruits);
  await wait(3000);

  debugger;

  console.log('Updating data with identity');
  drawList(ul, fruits);
  await wait(3000);

  debugger;

  console.log('Clearing data...');
  drawList(ul, []);
  await wait(3000);

  debugger;

  console.log('Re-drawing with original data...');
  drawList(ul, fruits);
}

fn()
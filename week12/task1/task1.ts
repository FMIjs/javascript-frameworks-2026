import * as d3 from "d3";
import { isEven } from "./task1-helpers";


const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

const ul = d3.select("#chart").append("ul");

// ul.attr("style", "width: 200px; border: 1px solid black; padding: 10px;");

// fruits --> in the `ul` as `li` elements
ul.selectAll('li')
  .data(fruits)
  .join('li')
  .text((d, i, a) => {
    console.log({ d, i, a });
    debugger;
    return d;
  })
  .classed('even', isEven)

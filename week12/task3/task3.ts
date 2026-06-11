import * as d3 from "d3";
import { randomInts } from "./task3-helpers";

const margin = { top: 200, right: 20, bottom: 20, left: 80 };
const totalWidth = 800;
const totalHeight = 2000;
const innerWidth = totalWidth - margin.left - margin.right; // 700
const rowSpacing = 140;



// const colorScale = d3.scaleLinear([0, 100], ["red", "blue"])
// console.log(colorScale(0));
// console.log(colorScale(50));
// console.log(colorScale(100));
// console.log('--- ---');

// const numberScaler = d3.scaleLinear([0, 100], [100, 0])
// console.log(numberScaler(0));
// console.log(numberScaler(50));
// console.log(numberScaler(100));
// console.log('--- ---');

// const numberScaler2 = d3.scaleLinear([0, 100], [0, 1])
// console.log(numberScaler2(0));
// console.log(numberScaler2(50));
// console.log(numberScaler2(100));
// console.log('---');
// console.log(numberScaler2.invert(0.5));



// // ── SVG canvas ───────────────────────────────────────────────────────────────
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", totalWidth)
  .attr("height", totalHeight)
  .style("font-family", "sans-serif");

const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

function addRow(label: string, rowIndex: number) {
  const row = g.append("g")
    .attr("transform", `translate(0,${rowIndex * rowSpacing})`);

  row.append("text")
    .attr("x", -10)
    .attr("y", 40)
    .attr("text-anchor", "end")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .style("fill", "#888")
    .text(label);

  return row;
}

// ── Row 0: Linear scale ──────────────────────────────────────────────────────
const xData = d3.sort(randomInts(10, 1000));
const yData = randomInts(10, 1000);

const linearScale = d3.scaleLinear()
  .domain([0, d3.max(xData) || 1000])
  .range([0, innerWidth])
  .nice();

const linearScale2 = d3.scaleLinear()
  .domain([0, d3.max(yData) || 1000])
  .range([0, 100])
  .nice();

const linearRow = addRow("Linear", 0);

linearRow.append("line")
  .attr("x1", 0).attr("x2", innerWidth)
  .attr("y1", 40).attr("y2", 40)
  .style("stroke", "#ddd").style("stroke-width", 2);

// domain min/max annotations
const [domMin, domMax] = linearScale.domain();
[{ x: 0, v: domMin }, { x: innerWidth, v: domMax }].forEach(({ x, v }) => {
  linearRow.append("text")
    .attr("x", x).attr("y", 78)
    .attr("text-anchor", "middle")
    .style("font-size", "10px").style("fill", "#bbb")
    .text(v);
  // .text(Math.round(v));
});

// data point circles + value labels
xData.forEach((val, i) => {
  const cx = linearScale(val);
  const val2 = yData[i];
  const cy = (linearScale2(val2) + 40) * -1;


  linearRow.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    // .attr("cy", 40)
    .attr("r", 3)
    .style("fill", "#4e79a7").style("opacity", 0.85);

  let prevX = 0
  let prevY = 40

  if (i > 0) {
    const prevVal = xData[i - 1];
    const prevVal2 = yData[i - 1];
    prevX = linearScale(prevVal);
    prevY = (linearScale2(prevVal2) + 40) * -1;
  }


  const points: [number, number][] = [
    [0, 40],
    ...xData.map((val, i) => [
      linearScale(val),
      (linearScale2(yData[i]) + 40) * -1,
    ] as [number, number]),
    [linearScale(domMax), (linearScale2(yData[yData.length - 1]) + 40) * -1],
  ];

  linearRow.append("line")
    .attr("x1", prevX).attr("y1", prevY)
    .attr("x2", cx).attr("y2", cy)
    .style("stroke", "#4e79a7").style("stroke-width", 1)
    .style("opacity", 0.2);


  const lineGenerator = d3.line<[number, number]>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveCatmullRom.alpha(0.5));

  linearRow.append("path")
    .attr("d", lineGenerator(points)!)
    .style("fill", "none")
    .style("stroke", "#4e79a7")
    .style("stroke-width", 1.5)
    .style("opacity", 0.7);


  linearRow.append("text")
    .attr("x", cx).attr("y", 63)
    .attr("text-anchor", "middle")
    .style("font-size", "9px").style("fill", "#555")
    .text(val);
});

// ── Row 1: Band scale ────────────────────────────────────────────────────────
const bandRow = addRow("Band", 1);

bandRow.attr("transform", `translate(0,${margin.top})`)

const categories = ["A", "B", "C", "D", "E"];
const categoryValues = randomInts(categories.length, 100);

const bandScale = d3.scaleBand()
  .domain(categories)
  .range([0, innerWidth])
  .padding(0.1);

categories.forEach((cat, i) => {
  const x = bandScale(cat)!;
  const bw = bandScale.bandwidth();

  const catValue = categoryValues[i];

  bandRow.append("rect")
    .attr("x", x).attr("y", 5 + (100 - catValue))
    .attr("width", bw).attr("height", catValue)
    .style("fill", d3.schemeCategory10[i]);

  bandRow.append("text")
    .attr("x", x + bw / 2).attr("y", 120)
    .attr("text-anchor", "middle")
    .style("font-size", "12px").style("fill", "#555")
    .text(cat);
});

// ── Row 2: Ordinal color scale ───────────────────────────────────────────────

categories.push("F")
categories.push("G")
categories.push("H")
categories.push("I")
categories.push("J")
categories.push("K")
categories.push("L")
categories.push("M")

const colorScale = d3.scaleOrdinal<string>()
  .domain(categories)
  .range(d3.schemeCategory10);

const ordinalRow = addRow("Ordinal", 3);
const slot = innerWidth / categories.length;


const categoryRadiuses = randomInts(categories.length, 30);

categories.forEach((cat, i) => {
  const cx = slot * i + slot / 2;
  const color = colorScale(cat);

  ordinalRow.append("circle")
    .attr("cx", cx).attr("cy", 30).attr("r", Math.min(categoryRadiuses[i], 10))
    .style("fill", color);

  ordinalRow.append("text")
    .attr("x", cx).attr("y", 62)
    .attr("text-anchor", "middle")
    .style("font-size", "12px").style("fill", "#555")
    .text(cat);

  ordinalRow.append("text")
    .attr("x", cx).attr("y", 76)
    .attr("text-anchor", "middle")
    .style("font-size", "9px").style("fill", "#bbb")
    .text(color);
});

// ── Row 3: Time scale ────────────────────────────────────────────────────────

const startDate = new Date(2024, 0, 1);
const endDate = new Date(2024, 11, 31);

const timeScale = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, innerWidth]);

const timeRow = addRow("Time", 4);

timeRow.append("line")
  .attr("x1", 0).attr("x2", innerWidth)
  .attr("y1", 50).attr("y2", 50)
  .style("stroke", "#ddd").style("stroke-width", 2);

// monthly ticks + labels
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

d3.timeMonths(startDate, endDate).forEach((date, i) => {
  const x = timeScale(date);
  timeRow.append("line")
    .attr("x1", x).attr("x2", x)
    .attr("y1", 43).attr("y2", 57)
    .style("stroke", "#ccc").style("stroke-width", 1);
  timeRow.append("text")
    .attr("x", x).attr("y", 70)
    .attr("text-anchor", "middle")
    .style("font-size", "9px").style("fill", "#999")
    .text(monthNames[i]);
});

// highlighted quarterly dates
const highlights = [
  new Date(2024, 1, 10),
  new Date(2024, 3, 1),
  new Date(2024, 6, 19),
  new Date(2024, 9, 3),
];

highlights.forEach(date => {
  const x = timeScale(date);
  const date2 = timeScale.invert(x);

  // dashed connector
  timeRow.append("line")
    .attr("x1", x).attr("x2", x)
    .attr("y1", 32).attr("y2", 44)
    .style("stroke", "#e15759").style("stroke-width", 1)
    .style("stroke-dasharray", "2,2");

  timeRow.append("circle")
    .attr("cx", x).attr("cy", 50).attr("r", 6)
    .style("fill", "#e15759");

  timeRow.append("text")
    .attr("x", x).attr("y", 27)
    .attr("text-anchor", "middle")
    .style("font-size", "10px").style("fill", "#e15759")
    .text(`${monthNames[date2.getMonth()]} ${date2.getDate()}`);
});

// // ── Console probes ───────────────────────────────────────────────────────────
// console.log("Sales data:", salesData);
// console.log("Linear (sales → px):");
// salesData.forEach(v => console.log(`  ${v} → ${linearScale(v).toFixed(1)}`));
// console.log("Band (category → x):");
// categories.forEach(c => console.log(`  ${c} → ${bandScale(c)}`));
// console.log("Ordinal (category → colour):");
// categories.forEach(c => console.log(`  ${c} → ${colorScale(c)}`));
// console.log("Time (date → px):");
// highlights.forEach(d => console.log(`  ${d.toDateString()} → ${timeScale(d).toFixed(1)}`));

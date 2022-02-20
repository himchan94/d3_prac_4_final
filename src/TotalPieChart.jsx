import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Card from "./Card";

const 만점 = 500;
const 학생총점 = 350;
const 목표점수 = 250;

const width = 384;
const height = 272;

const labelData = [
  { title: "목표 점수", color: "#9799F7" },
  { title: "학생 점수", color: "#FDB515" },
];

const TotalPieChart = () => {
  const pieChart = useRef();

  useEffect(() => {
    const piedata = d3.pie();
    const arc = (inner, outer) => {
      return d3.arc().innerRadius(`${inner}`).outerRadius(`${outer}`);
    };

    const studentGrade = [
      (학생총점 / 만점) * 100,
      100 - (학생총점 / 만점) * 100,
    ];
    const targetGrade = [
      (목표점수 / 만점) * 100,
      100 - (목표점수 / 만점) * 100,
    ];

    const svg = d3
      .select(pieChart.current)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2}) `);

    const chartGroup = svg.append("g").attr("transform", `translate(-52,2) `);

    // draw background
    chartGroup
      .selectAll("path")
      .data(piedata(studentGrade))
      .join("path")
      .attr("fill", "#f2f2f2")
      .attr("d", arc(86, 106.45));

    // draw pie chart

    // add 학생총점 text
    const numberDOM = chartGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-weight", 700)
      .attr("font-size", "2.055em")
      .attr("dy", ".3em");

    // numberDOM.text(학생총점);

    chartGroup
      .append("g")
      .selectAll("path")
      .data(piedata(studentGrade))
      .enter()
      .append("path")
      .attr("fill", (d, i) => {
        return i > 0 ? "none" : "#F4B34B";
      })
      .transition()

      .duration(1000)
      .attrTween("d", function (d) {
        const interpolateGage = d3.interpolate(d.startAngle, d.endAngle);
        const interpolateText = d3.interpolate(0, 학생총점);
        return function (t) {
          numberDOM.text(d3.format(",d")(interpolateText(t)));
          d.endAngle = interpolateGage(t);
          return arc(59.625, 72.25)
            .startAngle(-d.startAngle)
            .endAngle(-d.endAngle)
            .cornerRadius(10)();
        };
      });

    chartGroup
      .append("g")
      .selectAll("path")
      .data(piedata(targetGrade))
      .enter()
      .append("path")
      .attr("fill", (d, i) => {
        return i > 0 ? "none" : "#9799F7";
      })
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(86, 106.45)
            .startAngle(-d.startAngle)
            .endAngle(-d.endAngle)
            .cornerRadius(10)();
        };
      });

    // draw label
    const labelGroup = svg
      .append("g")
      .attr("transform", `translate(80,0) `)
      .selectAll("g")
      .data(labelData)
      .join("g");

    labelGroup
      .append("circle")
      .attr("r", "5")
      .attr("fill", (d, i) => {
        return d.color;
      })
      .attr("cy", (d, i) => 3 * i - 1 + 16 * i);

    labelGroup
      .append("text")
      .text((d) => d.title)
      .attr("font-size", "0.875em")
      .attr("font-weight", 500)
      .attr("line-height", "1.563em")
      .attr("dominant-baseline", "middle")
      .attr("x", 18)
      .attr("y", (d, i) => i * 20);
  }, []);

  return (
    <Card>
      <svg
        ref={pieChart}
        width='100%'
        height='100%'
        viewBox={`0 0 ${width} ${height}`}></svg>
    </Card>
  );
};

export default TotalPieChart;

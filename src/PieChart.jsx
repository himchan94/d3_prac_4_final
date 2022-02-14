import React, { useMemo } from "react";
import { arc, pie } from "d3";

const db = [
  { subject: "국어", time: 43, color: "#01E2A6" },
  { subject: "영어", time: 123, color: "#FD9402" },
  { subject: "한국사", time: 140, color: "#FED802" },
];

const width = 200;
const height = 200;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc()
  .innerRadius(width / 4)
  .outerRadius(width / 2);

const dbPie = pie().value((d) => d.time);
const PieChart = () => {
  const totalTime = useMemo(() => {
    return db.reduce((acc, cur) => {
      return acc + cur.time;
    }, 0);
  }, []);

  return (
    <div className='container'>
      <svg width='100%' height='100%' viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${centerX},${centerY})`}>
          {dbPie(db).map((d) => (
            <g key={d.data.subject}>
              <path fill={d.data.color} d={pieArc(d)} />
              <text transform={`translate(${pieArc.centroid(d)})`}>
                {`${Math.floor((d.data.time / totalTime) * 100)}%`}
              </text>
            </g>
          ))}
        </g>
        <g transform={`translate(${width / 6},${height - 20})`}>
          {db.map((d, i) => (
            <g>
              <circle fill={d.color} cx={40 * i} r='5'></circle>
              <text className='title' x={20 * (i * 2) + 20} y='4'>
                {d.subject}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default PieChart;

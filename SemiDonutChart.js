import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Present", value: 70 },
  
  { name: "Absent", value: 30 },
];

const COLORS = [ "#00C49F","#FF8042", "#FFBB28", "#0088FE"];

const SemiDonutChart = () => {
  return (
    <PieChart width={400} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="100%" // Moves the pie upward
        startAngle={180}
        endAngle={0}
        outerRadius={100}
        innerRadius={60} // Creates the donut effect
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SemiDonutChart;

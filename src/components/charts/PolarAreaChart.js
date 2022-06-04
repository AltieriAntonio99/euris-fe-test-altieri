import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { productAPI } from "../helpers/api/api";
import randomColor from "randomcolor";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const getProductsCategory = async () => {
    const result = await productAPI.getCategories("ijpxNJLM732vm8AeajMR");
    let categories = [];
    let numbersOfProducts = [];
    let backgroundColors = [];
    result?.data?.forEach((item) => {
      categories.push(item.category);
      numbersOfProducts.push(item.numberOfProducts);
      let color = randomColor();
      if (!backgroundColors.includes(color)) {
        backgroundColors.push(color);
      }
    });
    let data = {
      labels: categories,
      datasets: [
        {
          label: "Category",
          data: numbersOfProducts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
    setData(data);
  };

  useEffect(() => {
    getProductsCategory();
  }, []);

  return (
    <div style={{ height: "400px", width: "400px" }}>
      <PolarArea data={data}></PolarArea>
    </div>
  );
};

export default PolarAreaChart;

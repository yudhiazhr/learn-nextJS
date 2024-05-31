/* eslint-disable react/no-unescaped-entities */
"use client";
import { ProductContext } from "@/app/context/ProductContext";
import { useContext, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const About = () => {
  const { averagePrice, totalPrice, countCategory } =
    useContext(ProductContext);

  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      /* get a key of object ex: 
        [
            men : 2,
            women: 5,
        ] 

        we only get that's property [men, women]
      */
      const categoryLabels = Object.keys(countCategory);
      console.log("category labels :" , categoryLabels)

      /* mapping object ex: [ 2,5,8 ] */
      const categoryData = categoryLabels.map(label => countCategory[label]);
      console.log ("category data :" , categoryData)

      const newChart = new Chart(context, {
        type: 'doughnut',
        data: {
          labels: categoryLabels,
          datasets: [
            {
              label: 'Data',
              data: categoryData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
            responsive: true,
            
        }
      });
      chartRef.current.chart = newChart
    }
  }, );

  return (
    <>
      <section className="h-[80dvh] flex flex-col gap-4 justify-center items-center text-balance ">
        <h1 className="font-bold">All products</h1>
        <h1 className="font-bold">Total Prices: ${totalPrice}</h1>
        <h1 className="font-bold">Average Prices: ${averagePrice}</h1>
        <div>
          <h1>Category Counts</h1>
          <ul>
            <li>Men's Clothing: {countCategory["men's clothing"]}</li>
            <li>Jewelery: {countCategory.jewelery}</li>
            <li>Electronics: {countCategory.electronics}</li>
            <li>Women's Clothing: {countCategory["women's clothing"]}</li>
          </ul>
        </div>
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
      </section>
    </>
  );
};

export default About;

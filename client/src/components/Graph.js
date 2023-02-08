import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";
import { chart_data, getTotal } from "../helper/helper";
import { default as api } from "../redux/api/apiSlice";

Chart.register(ArcElement);

function Graph() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

  let graph_data;

  if (isFetching) {
    graph_data = <div>Fetching</div>;
  } else if (isSuccess) {
    graph_data = <Doughnut {...chart_data(data)} />;
  } else if (isError) {
    graph_data = <div>error</div>;
  }
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graph_data}
          <h3 className="mb-4 font-bold title ">
            {" "}
            Total <span className="block text-3xl text-emerald-400">₹{getTotal(data)}</span>
          </h3>
        </div>
        <div className="flex flex-col py-2 gap-4"></div>
        <Labels />
      </div>
    </div>
  );
}

export default Graph;

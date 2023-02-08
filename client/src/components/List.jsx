import React from "react";
import "boxicons";
import { default as api } from "../redux/api/apiSlice";

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation()
  let Transactions;

  const handleClick = (e) => {
    if(!e.target.dataset.id) return 0;
    deleteTransaction({_id:e.target.dataset.id})
  };

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={handleClick}></Transaction>
    ));
  } else if (isError) {
    Transactions = <div>error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category,handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#f9c74f"}` }}
    >
      <button className="px-3" onClick={handler}>
        <box-icon data-id={category._id ?? ""} name="trash" color={category.color ?? "#f9c74f"}></box-icon>
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
}

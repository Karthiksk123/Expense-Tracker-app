import React from "react";
import { useForm } from "react-hook-form";
import List from "./List";
import { default as api } from "../redux/api/apiSlice";

function Form() {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    await addTransaction(data).unwrap();
    resetField('name')
    resetField('amount')

  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">transaction</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group ">
            <input
              type="text"
              placeholder="Salary, House rent"
              className="form-input"
              {...register("name")}
            />
          </div>
          <select name="" id="" className="form-input" {...register("type")}>
            <option value="Investments">Investments</option>
            <option value="Expenses">Expenses</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group mb-2">
            <input
              type="text"
              placeholder="Amount"
              className="form-input"
              {...register("amount")}
            />
          </div>
        </div>
        <div className="submit-btn">
          <button className="border py-2 text-white bg-indigo-500 w-full">
            Make Transaction
          </button>
        </div>
      </form>
      <List />
    </div>
  );
}

export default Form;

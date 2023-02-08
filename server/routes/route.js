import express from "express";
import {
  createCategories,
  createTransactions,
  deleteTransactions,
  getCategories,
  getLabels,
  getTransactions,
} from "../controller/controller.js";

const route = express.Router();

route.post("/api/categories", createCategories);
route.get("/api/categories", getCategories);

route.post("/api/transaction", createTransactions);
route.get("/api/transaction", getTransactions);
route.delete("/api/transaction", deleteTransactions);

route.get("/api/labels", getLabels);

export default route;

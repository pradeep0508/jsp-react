import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import purchaseReducer from "../features/PurchaseOrder/PurchaseSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    purchase: purchaseReducer,
  },
});

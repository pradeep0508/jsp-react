import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchPurchaseOrderList,
  fetchVendorList,
  fetchMonthlySupplyByPurchaseId,
  fetchAllInvoiceInfo,
  insertInvoice,
  fetchInvoiceInfo,
} from "./purchaseAPI";

const initialState = {
  value: 0,
  status: "idle",
};

export const getVendorListAsync = createAsyncThunk(
  "vendor/fetchVendorList",
  async () => {
    const response = await fetchVendorList();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getAllInvoiceInfoAsync = createAsyncThunk(
  "vendor/fetchInvoiceList",
  async () => {
    const response = await fetchAllInvoiceInfo();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const getPurchaseOrderListAsync = createAsyncThunk(
  "vendor/fetchPurchaseOrderList",
  async (vendorId) => {
    const response = await fetchPurchaseOrderList(vendorId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchMonthlySupplyByPurchaseIdAsync = createAsyncThunk(
  "vendor/fetchMonthlySupplyByPurchaseId",
  async (purchaseId) => {
    const response = await fetchMonthlySupplyByPurchaseId(purchaseId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchInvoiceInfoAsync = createAsyncThunk(
  "vendor/fetchInvoiceInfo",
  async (invoiceId) => {
    const response = await fetchInvoiceInfo(invoiceId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const insertInvoiceAsync = createAsyncThunk(
  "vendor/insertInvoice",
  async (invoiceInfo) => {
    const response = await insertInvoice(invoiceInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const PurchaseSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getVendorList: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.vendorList = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getVendorListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVendorListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.vendorList = action?.payload?.documents || [];
      })
      .addCase(getPurchaseOrderListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPurchaseOrderListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.purchaseOrder = action?.payload?.documents || [];
      })
      .addCase(fetchMonthlySupplyByPurchaseIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMonthlySupplyByPurchaseIdAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.monthlyPurchaseSupply = action?.payload?.documents || [];
        }
      )
      .addCase(insertInvoiceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(insertInvoiceAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.InsertedInvoiceStatus = action?.payload?.documents || [];
      })
      .addCase(getAllInvoiceInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllInvoiceInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.invoiceList = action?.payload?.documents || [];
      })
      .addCase(fetchInvoiceInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoiceInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.invoiceInfo = action?.payload?.document || [];
      });
  },
});

export const { getVendorList } = PurchaseSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchAllVendor = () => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(getVendorList());
  }
};

export default PurchaseSlice.reducer;

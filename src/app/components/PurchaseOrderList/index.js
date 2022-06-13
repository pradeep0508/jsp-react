import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";
import { getPurchaseOrderListAsync } from "../../../features/PurchaseOrder/PurchaseSlice";

const VendorListList = () => {
  const dispatch = useDispatch();
  const useFormik = useFormikContext();
  const { purchaseOrderList } = useSelector((state) => ({
    purchaseOrderList: state?.purchase?.purchaseOrder || [],
  }));

  React.useEffect(() => {
    if (useFormik.values.vendor_id) {
      dispatch(getPurchaseOrderListAsync(useFormik.values.vendor_id));
    }
  }, [useFormik.values.vendor_id]);

  return (
    <Autocomplete
      id="country-select-demo"
      options={purchaseOrderList}
      autoHighlight
      onChange={(event, newValue) => {
        useFormik.setFieldValue("purchase_id", newValue.purchaseOrderNumber);
        useFormik.setFieldValue("purchase_date", newValue.date);
      }}
      disabled={useFormik.values.vendor_id ? false : true}
      getOptionLabel={(option) => option.purchaseOrderNumber}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.purchaseOrderNumber}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a purchase order"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off", // disable
          }}
        />
      )}
    />
  );
};

export default VendorListList;

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import { getVendorListAsync } from "../../../features/PurchaseOrder/PurchaseSlice";

const VendorListList = (props) => {
  const dispatch = useDispatch();
  const useFormik = useFormikContext();
  const { vendorList } = useSelector((state) => ({
    vendorList: state?.purchase?.vendorList || [],
  }));

  React.useEffect(() => {
    dispatch(getVendorListAsync());
  }, []);

  return (
    <Autocomplete
      {...props}
      options={vendorList}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name}
        </Box>
      )}
      onChange={(event, newValue) => {
        useFormik.setFieldValue("vendor_id", newValue._id);
        useFormik.setFieldValue("vendor_info", newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a vendor"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default VendorListList;

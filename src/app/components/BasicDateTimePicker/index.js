import * as React from "react";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BasicDateTimePicker(props) {
  const useFormik = useFormikContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Invoice date"
        value={useFormik.values.invoice_date}
        onChange={(newValue) => {
          useFormik.setFieldValue("invoice_date", newValue);
        }}
        {...props}
      />
    </LocalizationProvider>
  );
}

import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import _remove from "lodash/remove";
import _sumBy from "lodash/sumBy";
import _sum from "lodash/sum";
import _update from "lodash/update";
import Typography from "@material-ui/core/Typography";

const renderMenuItem = ({ partNumberList }) => {
  if (partNumberList) {
    return partNumberList.map((item) => {
      return <MenuItem value={item}>{item.partNumber}</MenuItem>;
    });
  }
};

const invoiceColumns = (invoiceSupply, useFormik) => [
  {
    cell: (row) => (
      <DeleteIcon
        color="primary"
        onClick={() => {
          _remove(invoiceSupply, (item) => item.SNO === row.SNO);
          const resetInvoiceSupply = invoiceSupply.map((item, index) => ({
            ...item,
            SNO: index + 1,
          }));
          useFormik.setFieldValue("invoice_supply", resetInvoiceSupply);
        }}
      />
    ),
    selector: "partNumber",
    minWidth: "5%",
  },
  {
    name: "#",
    selector: "SNO",
    sortable: true,
    minWidth: "5%",
  },

  {
    cell: (row) => (
      <FormControl fullWidth>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(event) => {
            const partNumber = event.target.value;
            row.selectedPartNumber = partNumber.partNumber;
            row.rate = partNumber.rate;
            row.partDescription = partNumber.partDescription;
            row.hsnCode = partNumber.hsnCode;
          }}
        >
          {renderMenuItem(row)}
        </Select>
      </FormControl>
    ),
    ignoreRowClick: true,
    selector: "partNumberList",
    allowOverflow: true,
    name: "Part Number",
    button: true,
    minWidth: "40%",
  },
  {
    name: "Quantity",
    cell: (row) => (
      <TextField
        id="filled-number"
        variant="outlined"
        onChange={(event) => {
          row.qty = Number(event.target.value);
          if (row.rate > 0) {
            row.total = row.qty * row.rate;
            _update(invoiceSupply, `[${row.SNO - 1}].total`, row.total);

            const totalInvoicePrice = _sumBy(
              invoiceSupply,
              (item) => item.total
            );
            const sgst = Number((totalInvoicePrice * 0.09).toFixed(2));
            const cgst = Number((totalInvoicePrice * 0.09).toFixed(2));
            const invoiceTotalAfterTax = Number(
              _sum([totalInvoicePrice, sgst, cgst]).toFixed(2)
            );
            useFormik.setFieldValue("invoice_supply", invoiceSupply);
            useFormik.setFieldValue("totalInvoicePrice", totalInvoicePrice);
            useFormik.setFieldValue("sgst", sgst);
            useFormik.setFieldValue("cgst", cgst);
            useFormik.setFieldValue(
              "invoiceTotalAfterTax",
              invoiceTotalAfterTax
            );
          }
        }}
        type="number"
        fullWidth
        inputProps={{ min: 0, max: 10000 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    selector: "qty",
    grow: 2,
    minWidth: "30%",
  },
  {
    name: "Total Price",
    cell: (row) => (
      <Stack spacing={2}>
        <Typography variant="h5" gutterBottom>
          {row.total}
        </Typography>
      </Stack>
    ),
    selector: "total",
    grow: 2,
    minWidth: "10%",
  },
];

export default invoiceColumns;

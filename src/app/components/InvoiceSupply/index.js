import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DataTable from "react-data-table-component";
import _remove from "lodash/remove";
import _sumBy from "lodash/sumBy";
import _sum from "lodash/sum";
import _update from "lodash/update";
import Typography from "@material-ui/core/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import invoiceColumns from "./invoiceColumns";

const InvoiceSupply = () => {
  const useFormik = useFormikContext();
  const invoiceSupply = useFormik.values.invoice_supply;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const { purchaseOrderList } = useSelector((state) => ({
    purchaseOrderList: state?.purchase?.purchaseOrder || [],
  }));

  useEffect(() => {
    if (useFormik.values.purchase_id) {
      const data = [
        {
          SNO: 1,
          partNumberList: purchaseOrderList[0]?.partDetailList,
          qty: 12,
          selectedPartNumber: "",
          total: 0,
        },
      ];
      useFormik.setFieldValue("invoice_supply", data);
    }
  }, [useFormik.values.purchase_id, purchaseOrderList]);

  const showMoreButton = () => (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        marginTop: 2,
      }}
    >
      {purchaseOrderList[0]?.partDetailList.length >
        useFormik.values.invoice_supply.length && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            invoiceSupply.push({
              SNO: invoiceSupply.length + 1,
              partNumberList: purchaseOrderList[0]?.partDetailList,
              qty: 12,
              selectedPartNumber: "",
              total: 0,
            });
            useFormik.setFieldValue("invoice_supply", invoiceSupply);
          }}
        >
          Add More Item
        </Button>
      )}
    </Stack>
  );

  const renderTaxSummary = () => (
    <Grid spacing={1} xs={12}>
      <Stack
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={2}
        sx={{
          marginTop: 2,
          marginBottom: 2,
          marginRight: 0,
        }}
      >
        <Item>
          <Typography variant="h5" gutterBottom>
            Total Invoice Price: {useFormik.values.totalInvoicePrice}
          </Typography>
        </Item>
        <Item>
          <Typography variant="h5" gutterBottom>
            SGST: {useFormik.values.sgst}
          </Typography>
        </Item>
        <Item>
          <Typography variant="h5" gutterBottom>
            CGST: {useFormik.values.cgst}
          </Typography>
        </Item>
        <Item>
          <Typography variant="h5" gutterBottom>
            Invoice Total: {useFormik.values.invoiceTotalAfterTax}
          </Typography>
        </Item>
      </Stack>
    </Grid>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <DataTable
            title="Invoice Supply"
            data={invoiceSupply}
            columns={invoiceColumns(invoiceSupply, useFormik)}
            customStyles={{
              row: {
                style: {
                  marginTop: 5,
                },
              },
            }}
            onSelectedRowsChange={() => {}}
          />
          {showMoreButton()}
        </Grid>
      </Box>
      {renderTaxSummary()}
    </Container>
  );
};

export default InvoiceSupply;

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import _times from "lodash/times";
import VendorListList from "../../app/components/VendorListList";
import PurchaseOrderList from "../../app/components/PurchaseOrderList";
import BasicDateTimePicker from "../../app/components/BasicDateTimePicker";
import InvoiceSupply from "../../app/components/InvoiceSupply";
import { insertInvoiceAsync } from "../PurchaseOrder/PurchaseSlice";

const PurchaseOrder = () => {
  const dispatch = useDispatch();

  const initialValues = {
    vendor_id: "",
    purchase_id: "",
    invoice_date: new Date(),
    invoice_supply: [],
    totalInvoicePrice: 0,
    purchase_date: null,
    sgst: 0,
    cgst: 0,
    invoice_no: null,
    vendor_info: null,
    purchase_info: null,
    invoiceTotalAfterTax: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const invoiceSupply = values.invoice_supply.map(
          ({
            SNO,
            qty,
            selectedPartNumber,
            total,
            rate,
            partDescription,
            hsnCode,
          }) => ({
            SNO,
            qty,
            selectedPartNumber,
            total,
            rate,
            partDescription,
            hsnCode,
          })
        );
        const prepareInvoiceInfo = {
          _id: {
            $oid: `${_times(24, () =>
              ((Math.random() * 0xf) << 0).toString(16)
            ).join("")}`,
          },
          vendor: values.vendor_info,
          taxes: {
            sgst: values.sgst,
            cgst: values.cgst,
            totalInvoicePrice: values.totalInvoicePrice,
            invoiceTotalAfterTax: values.invoiceTotalAfterTax,
          },
          invoiceSupply,
          invoiceDate: values.invoice_date,
          purchaseOrderNo: values.purchase_id,
          purchaseDate: values.invoice_date,
          invoiceNo: values.invoice_no,
        };
        // console.log("prepareInvoiceInfo", prepareInvoiceInfo);
        dispatch(insertInvoiceAsync(prepareInvoiceInfo));
      }}
    >
      {({ handleChange, values, setFieldValue, touched, errors }) => (
        <Form>
          <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <Grid item xs={4}>
                    <VendorListList id="vendor_id" name="vendor_id" />
                  </Grid>
                  <Grid item xs={4}>
                    <PurchaseOrderList />
                  </Grid>
                  <Grid item xs={3}>
                    <BasicDateTimePicker
                      label="Invoice date"
                      name="invoice-date"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, marginTop: 3 }}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                  <InvoiceSupply />
                </Grid>
              </Grid>
            </Box>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <TextField
                id="invoice_no"
                name="invoice_no"
                label="Invoice No"
                variant="outlined"
                value={values.invoice_no}
                onChange={handleChange}
                error={touched.invoice_no && Boolean(errors.invoice_no)}
                helperText={touched.invoice_no && errors.invoice_no}
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default PurchaseOrder;

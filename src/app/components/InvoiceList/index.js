import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import DataTable from "react-data-table-component";
import _remove from "lodash/remove";
import _sumBy from "lodash/sumBy";
import _sum from "lodash/sum";
import _update from "lodash/update";
import { getAllInvoiceInfoAsync } from "../../../features/PurchaseOrder/PurchaseSlice";

const InvoiceList = (props) => {
  const dispatch = useDispatch();

  const decorateInvoiceList = (iList = []) => {
    const displayInvoiceList = [];
    if (iList.length > 0) {
      const invList = iList.map((item, index) => ({
        SNO: index,
        vendorName: item.vendor.name,
        purchaseOrderNo: item.purchaseOrderNo,
        invoiceNo: item.invoiceNo,
        sgst: item.taxes.sgst,
        cgst: item.taxes.cgst,
        totalInvoicePrice: item.taxes.totalInvoicePrice,
        invoiceTotalAfterTax: item.taxes.invoiceTotalAfterTax,
        invoiceRaw: item,
      }));
      displayInvoiceList.push(...invList);
    }
    return displayInvoiceList;
  };

  const { invoiceList } = useSelector((state) => ({
    invoiceList: decorateInvoiceList(state?.purchase?.invoiceList || []),
  }));

  React.useEffect(() => {
    dispatch(getAllInvoiceInfoAsync());
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <DataTable
              title="Invoice List"
              data={invoiceList}
              columns={[
                {
                  name: "Invoice No",
                  cell: (row) => (
                    <Link
                      href="#"
                      onClick={() => {
                        props.setSelectedInvoice(row.invoiceRaw);
                      }}
                    >
                      {row.invoiceNo}
                    </Link>
                  ),
                },
                {
                  name: "Vendor Name",
                  selector: (row) => row.vendorName,
                },
                {
                  name: "Purchase No",
                  selector: (row) => row.purchaseOrderNo,
                },
                {
                  name: "Invoice Total",
                  selector: (row) => row.totalInvoicePrice,
                },
                {
                  name: "sgst",
                  selector: (row) => row.sgst,
                },
                {
                  name: "cgst",
                  selector: (row) => row.cgst,
                },
                {
                  name: "Grand Total",
                  selector: (row) => row.invoiceTotalAfterTax,
                },
              ]}
              customStyles={{
                row: {
                  style: {
                    marginTop: 5,
                  },
                },
              }}
              onSelectedRowsChange={() => {}}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default InvoiceList;

import * as React from "react";
import moment from "moment";
import "./style.css";

export default class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { invoiceNo: invoiceInfo } = this.props.props;
    return (
      <div className="print_container">
        <div className="invoice_number_section">
          <div className="invoice_number">{invoiceInfo.invoiceNo}</div>
          <div>{new Date(invoiceInfo.invoiceDate).toLocaleDateString()}</div>
        </div>
        <div className="vendor_info">
          <div className="vendor_address">
            <div>{invoiceInfo.vendor.code}</div>
            <div>{invoiceInfo.vendor.name}</div>
            <div>{invoiceInfo.vendor.address.street1}</div>
            <div>{invoiceInfo.vendor.address.street2}</div>
            <div>{invoiceInfo.vendor.address.pin}</div>
          </div>
          <div className="vendor_purchase">
            <div className="purchase_info">
              <div className="purchase_number">
                {invoiceInfo?.purchaseOrderNo}
              </div>
              <div className="invoice_date">
                {new Date(invoiceInfo.purchaseDate).toLocaleDateString()}
              </div>
            </div>
            <div className="purchase_payment_term">
              <div className="purchase_number">
                {invoiceInfo.vendor.paymentTerms}
              </div>
            </div>
          </div>
        </div>
        <div className="customer_gst">{invoiceInfo.vendor.gst}</div>
        <div className="invoice_supply_container">
          {invoiceInfo.invoiceSupply.map((item) => (
            <div className="invoice_supply_list">
              <div className="invoice_slno">{item.SNO}</div>
              <div className="invoice_item">{item.selectedPartNumber}</div>
              <div className="invoice_item_des">GASKET </div>
              <div className="invoice_item_hsn">HSN CODE</div>
              <div className="invoice_item_qty">{item.qty}</div>
              <div className="invoice_item_rate">{item.rate}</div>
              <div className="invoice_item_total">{item.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="invoice_taxes">
          <div className="invoice_tax_item">
            <div className="tax_label">Total Basic Amount</div>
            <div className="tax_label_value">
              {invoiceInfo.taxes.totalInvoicePrice.toFixed(2)}
            </div>
          </div>
          <div className="invoice_tax_item">
            <div className="tax_label">SGST</div>
            <div className="tax_label_value">
              {invoiceInfo.taxes.sgst.toFixed(2)}
            </div>
          </div>
          <div className="invoice_tax_item">
            <div className="tax_label">CGST</div>
            <div className="tax_label_value">
              {invoiceInfo.taxes.cgst.toFixed(2)}
            </div>
          </div>
          <div className="invoice_final_total">
            <div className="tax_label"></div>
            <div className="tax_label_value">
              {invoiceInfo.taxes.invoiceTotalAfterTax.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

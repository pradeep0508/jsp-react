import axios from "axios";
import {
  URL_ENDPOINT,
  CONTENT_TYPE,
  API_KEY,
  DATA_SOURCE,
  DATABASE,
  PURCHASE_ORDER_TABLE,
  MONTHLY_SUPPLY_TABLE,
  VENDORS_TABLE,
  INVOICE,
} from "../../utils/constants";

const body = {
  dataSource: DATA_SOURCE,
  database: DATABASE,
};

var headers = {
  "Content-Type": CONTENT_TYPE,
  "api-key": API_KEY,
};

const fetchVendorList = async () => {
  const collection = {
    collection: VENDORS_TABLE,
  };
  const url = `${URL_ENDPOINT}/action/find`;
  return await axios.post(
    url,
    {
      ...collection,
      ...body,
    },
    { headers }
  );
};

const fetchAllInvoiceInfo = async () => {
  const collection = {
    collection: INVOICE,
  };

  const url = `${URL_ENDPOINT}/action/find`;
  return await axios.post(
    url,
    {
      ...collection,
      ...body,
    },
    { headers }
  );
};

const fetchInvoiceInfo = async (invoiceId) => {
  const collection = {
    collection: INVOICE,
    filter: {
      _id: {
        $oid: invoiceId,
      },
    },
  };

  const url = `${URL_ENDPOINT}/action/findOne`;
  return await axios.post(
    url,
    {
      ...collection,
      ...body,
    },
    { headers }
  );
};

const fetchPurchaseOrderList = async (vendorId) => {
  const collection = {
    collection: PURCHASE_ORDER_TABLE,
    filter: {
      vendorId: {
        $oid: vendorId,
      },
    },
  };

  const url = `${URL_ENDPOINT}/action/find`;
  return await axios.post(
    url,
    {
      ...collection,
      ...body,
    },
    { headers }
  );
};

const fetchMonthlySupplyByPurchaseId = async (vendorId) => {
  const collection = {
    collection: MONTHLY_SUPPLY_TABLE,
    filter: {
      purchaseNumber: vendorId,
    },
  };

  const url = `${URL_ENDPOINT}/action/find`;
  return await axios.post(
    url,
    {
      ...collection,
      ...body,
    },
    { headers }
  );
};

const insertInvoice = async (invoiceInfo) => {
  const collection = {
    collection: INVOICE,
    document: {
      ...invoiceInfo,
    },
  };

  const url = `${URL_ENDPOINT}/action/insertOne`;
  return await axios.post(
    url,
    {
      ...collection,
      ...body,
    },
    { headers }
  );
};

export {
  fetchVendorList,
  fetchPurchaseOrderList,
  fetchMonthlySupplyByPurchaseId,
  fetchInvoiceInfo,
  insertInvoice,
  fetchAllInvoiceInfo,
};

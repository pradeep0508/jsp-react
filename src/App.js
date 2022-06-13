import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import MenuBar from "./app/components/MenuBar";
import PurchaseOrder from "./features/PurchaseOrder";
import PrintInvoice from "./app/components/PrintInvoice";
import InvoiceList from "./app/components/InvoiceList";

import "./App.css";

function App() {
  const [selectedMenu, setSelectedMenu] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState();

  useEffect(() => {
    setSelectedInvoice();
  }, [selectedMenu]);

  function DisplayBody() {
    switch (selectedMenu) {
      case "Vendors":
        return <div>Vendors</div>;
      case "Purchase Order":
        return <PurchaseOrder />;
      case "Monthly Supply":
        return <div>Monthly Supply</div>;
      case "Tariff":
        return <div>Tariff</div>;

      case "Invoice List":
        return (
          <div>
            <InvoiceList setSelectedInvoice={setSelectedInvoice} />
          </div>
        );
      default:
        return (
          <div>
            <InvoiceList setSelectedInvoice={setSelectedInvoice} />
          </div>
        );
    }
  }

  return (
    <div className="App">
      <MenuBar setSelectedMenu={setSelectedMenu} />
      <div className="app-body">
        {selectedInvoice ? (
          <PrintInvoice invoiceNo={selectedInvoice} />
        ) : (
          <DisplayBody />
        )}
      </div>
    </div>
  );
}

export default App;

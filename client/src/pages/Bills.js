import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import { Button, Modal, Table } from "antd";
import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function Bills() {
  const [billsData, setBillsData] = useState([]);
  const [printBillModalVisbility, setPrintBillModalVisbility] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const dispatch = useDispatch();
  const componentRef = useRef();

  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data;
        data.reverse();
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    { title: "Id", dataIndex: "_id" },
    {
      title: "Castomer ",
      dataIndex: "castomerName",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record);
              setPrintBillModalVisbility(true);
            }}
          />
        </div>
      ),
    },
  ];

  const cartColumns = [
    { title: "Name", dataIndex: "name" },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
    {
      title: "Total fare",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity * record.price}</b>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Itmes</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />

      {printBillModalVisbility && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisbility(false);
          }}
          visible={printBillModalVisbility}
          title="Bill Details"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1>SR MARKET</h1>
              </div>
              <div>
                <p>Hyderabd</p>
                <p>Amberpet 500013</p>
                <p>9854789542</p>
              </div>
            </div>
            <div className="bill-customer-details my-2 ">
              <p>
                <b> Name </b>: {selectedBill.castomerName}
              </p>
              <p>
                <b> Phone Number </b>: {selectedBill.castomerPhoneNumber}
              </p>
              <p>
                <b> Date </b>:{" "}
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>
            <Table
              dataSource={selectedBill.cartItems}
              columns={cartColumns}
              pagination={false}
            />

            <div className="dotted-border ">
              <p>
                <b>Sub Total</b> : {selectedBill.subTotal}
              </p>
              <p>
                <b>Tax</b> : {selectedBill.tax}
              </p>
            </div>
            <div>
              <h2>
                <b>Grand Total : {selectedBill.totalAmount}</b>
              </h2>
            </div>
            <div className="dotted-border"></div>
            <div className="text-center">
              <p>Thanks</p>
              <p>Visit Again :)</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={handlePrint}>
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

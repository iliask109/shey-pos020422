import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import { Button, Modal, Table } from "antd";
import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function Customers() {
  const [billsData, setBillsData] = useState([]);

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
    {
      title: "Castomer ",
      dataIndex: "castomerName",
    },
    {
      title: "Phone Number",
      dataIndex: "castomerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
  ];

  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
    </DefaultLayout>
  );
}

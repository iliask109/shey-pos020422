import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resourses/auth.css";
import axios from "axios";
import { useDispatch } from "react-redux";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/register", values)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success("success");
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("error");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) navigate("/home");
  }, []);
  return (
    <div className="auth">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>
              <b>SHEY POS</b>
            </h1>
            <hr />
            <h3>Register</h3>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registed ? Click Here To Login</Link>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

// import React from "react";
// import { Form, Input, Button, Card, Spin } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../hook/hooks";
// import { loginUser } from "../../stores/slices/authSlice";
// import Navbar from "../../components/common/Navbar";

// const LoginPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading } = useAppSelector((state) => state.auth);

//   const onFinish = async (values: any) => {
//     try {
//       const user = await dispatch(loginUser(values)).unwrap();
//       // Nếu muốn không phân biệt admin/user, chỉ redirect về HomePage
//       navigate("/dashboard"); 
//     } catch (err: any) {
//       alert(err?.message || "Đăng nhập thất bại. Vui lòng thử lại!");
//     }
//   };

//   return (
//     <>
//       {/* Navbar hiển thị, activePage="login" */}
//       <Navbar activePage="login" onChangePage={(page) => navigate(page === "login" ? "/login" : "/register")} />

//       <Card title={<h2 style={{ textAlign: "center" }}>Login</h2>} style={{ maxWidth: 400, margin: "50px auto 0 auto" }}>
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email is required" }]}>
//             <Input placeholder="Enter email" />
//           </Form.Item>
//           <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>
//           <Button type="primary" htmlType="submit" block disabled={loading}>
//             {loading ? <Spin /> : "Login"}
//           </Button>
//         </Form>
//       </Card>
//     </>
//   );
// };

// export default LoginPage;


// pages/LoginPage.tsx
import React from "react";
import { Card } from "antd";
import Navbar from "../../components/common/Navbar";
import LoginForm from "../../components/forms/LoginForm";


const LoginPage: React.FC = () => {
  return (
    <>
      <Navbar activePage="login" onChangePage={(page) => {
        window.location.href = page === "login" ? "/login" : "/register";
      }} />

      <Card
        title={<h2 style={{ textAlign: "center" }}>Login</h2>}
        style={{ maxWidth: 400, margin: "50px auto 0 auto" }}
      >
        <LoginForm />
      </Card>
    </>
  );
};

export default LoginPage;
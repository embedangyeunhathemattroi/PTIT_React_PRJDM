// import React from "react";
// import { Navigate } from "react-router-dom"; // Dùng để chuyển hướng
// import { useSelector } from "react-redux";   // Dùng để lấy state từ Redux
// import type { RootState } from "../../../stores/store"; // Kiểu RootState của Redux

// // Props cho component ProtectedRoutes
// interface ProtectedRoutesProps {
//   children: React.ReactNode; // Các component con sẽ được render nếu user đã đăng nhập
// }

// const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
//   // Lấy thông tin user từ Redux state
//   const user = useSelector((state: RootState) => state.auth.user);

//   // Nếu chưa có user (chưa đăng nhập)
//   if (!user) {
//     // Chuyển hướng về trang login
//     return <Navigate to="/login" replace />;
//   }

//   // Nếu đã đăng nhập, render các component con
//   return <>{children}</>;
// };

// export default ProtectedRoutes;



import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../stores/store";


interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
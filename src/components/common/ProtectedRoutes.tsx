// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../stores/store";

// interface ProtectedRoutesProps {
//   children: React.ReactNode;
// }

// const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
//   const user = useSelector((state: RootState) => state.auth.user);

//   // Nếu chưa login => chuyển về login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Nếu đã login => render component con
//   return <>{children}</>;
// };

// export default ProtectedRoutes;

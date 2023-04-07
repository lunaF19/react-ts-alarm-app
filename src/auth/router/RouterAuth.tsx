 import { Route, Routes, Navigate } from "react-router-dom";


//Componentes
import { PageAuthLogin, PageAuthRegister, PageLogout } from '../pages'
 
export const RouterAuth = () => {
  return (
    <> 
      <Routes>
        <Route path="/login" element={<PageAuthLogin />} />
        <Route path="/register" element={<PageAuthRegister />} />
        <Route path="/logout" element={<PageLogout />} />
        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};
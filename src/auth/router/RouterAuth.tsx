import { useAppSelector } from "../../store/hooks"

import { RootState } from "../../store";
import { Route, Routes, Navigate } from "react-router-dom";

//Componentes
import { PageAuthLogin, PageAuthRegister, PageLogout } from '../pages'

export const RouterAuth = () => {
  const { logged } = useAppSelector((store: RootState) => store.auth)

  return (
    <>
      <Routes>
        {
          logged ? (
            <>
              <Route path="/logout" element={<PageLogout />} />
              <Route path="/*" element={<Navigate to="/alarms" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<PageAuthLogin />} />
              <Route path="/register" element={<PageAuthRegister />} />

              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>

          )
        }

      </Routes>
    </>
  );
};
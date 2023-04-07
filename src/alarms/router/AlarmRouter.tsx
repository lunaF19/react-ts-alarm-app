import { Route, Routes, Navigate } from "react-router-dom";

import { useSelector } from "react-redux"
import { RootState } from "../../store/index"
//Componentes
import { PageAlarms } from '../pages'



export const RouterAlarms = () => {
  const { logged } = useSelector((store: RootState) => store.auth)

  return (
    <Routes>
      {
        !logged ? (
          <>
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<PageAlarms />} />
            <Route path="/*" element={<Navigate to="/alarms" />} />
          </>
        )
      }
    </Routes>
  );
};
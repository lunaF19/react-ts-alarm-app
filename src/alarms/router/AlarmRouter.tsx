import { Route, Routes, Navigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/index"
//Componentes
import { PageAlarms } from '../pages'


export const RouterAlarms = () => {
  const { logged } = useAppSelector((store: RootState) => store.auth)

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
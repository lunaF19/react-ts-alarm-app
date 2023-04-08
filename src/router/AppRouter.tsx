import { Route, Routes, Navigate } from "react-router-dom";


import { useAppSelector } from "../store/hooks"
import { RootState } from "../store/index"

import { RouterAuth } from "../auth/router/RouterAuth"
import { RouterAlarms } from "../alarms/router/AlarmRouter"


const AppRouter = () => {
  const { logged } = useAppSelector((store: RootState) => store.auth)
  return (
    <>
      <Routes>

        <>
          <Route
            path="/alarms/*"
            element={
              <RouterAlarms />}
          />

          <Route
            path="/auth/*"
            element={
              <RouterAuth />}
          />
          <Route
            path="/*"
            element={
              <Navigate to="/alarms" />}
          />

        </>



      </Routes>
    </>
  );
};

export default AppRouter
import { Container, Box, Drawer, CssBaseline } from '@mui/material';
import AppRouter from "./router/AppRouter"
import MenuAppBar from "./components/NavBar"




import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Flip } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: '#212529' }}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}

      />

      <Box>
        <CssBaseline />
        <MenuAppBar />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <AppRouter />
        </Box>
      </Box>
    </>
  )
}

export default App

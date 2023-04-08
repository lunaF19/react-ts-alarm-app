import { } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Google from '@mui/icons-material/Google';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme } from '@mui/material/styles';

import { useAuth } from "../hooks/useAuth"


type FormValues = {
  email: string;
  password: string;
};

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export const PageAuthLogin = () => {

  const {
    handleSubmit,
    control,
    formState
  } = useForm<FormValues>()

  const {
    errors
  } = formState

  const {
    authGoogleLogin,
    authLogin

  } = useAuth()


  const onSubmit = (data: FormValues) => {
    authLogin(data)
  };

  return (

    <Container component="main" maxWidth="xs">

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            rules={{
              required: "The email is required",
            }}
            control={control}
            name="email"

            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <TextField
                type="email"
                margin="normal"
                fullWidth
                label="Email Address"
                name={name}
                autoFocus
                value={value}
                onChange={onChange}
                error={Boolean(error && error.message)}
                helperText={error && error.message}
              />

            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "The email is required",
            }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <TextField
                type="password"
                margin="normal"
                fullWidth
                label="Password"
                name={name}
                value={value}
                onChange={onChange}
                error={Boolean(error && error.message)}
                helperText={error && error.message}
              />
            )}
          />


          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => authGoogleLogin()}
          >
            <Google />
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>

  );
}
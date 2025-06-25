'use client';
import {
  CustomTextField,
  PageContainer,
  SingleSnackbar,
} from '@abasv3/shared-components';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import * as Yup from 'yup';
import LoginBackground from '../../../../public/images/login-background.png';
import { loginAction } from '@abasv3/actions';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

type LoginState = {
  error: string | null;
  token?: string;
};

const initialState: LoginState = {
  error: null,
};

async function loginReducer(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const result = await loginAction(formData);
  return result ?? { error: null };
}

const Page = () => {
  const [state, formAction, isPending] = useActionState(
    loginReducer,
    initialState
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (state.token && !state.error) {
      router.push('/');
    }
  }, [state.token, state.error, router]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        setError('');
        setSnackbarOpen(true);
        router.push('/');
      } catch (err: any) {
        setError(err.message);
        setSnackbarOpen(true);
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <PageContainer title="Login">
      <Grid
        container
        sx={{
          height: '100vh',
          backgroundColor: '#FFFFFF',
        }}
      >
        {!isMobile && (
          <Grid size={{ md: 6 }} sx={{ zIndex: 1 }}>
            <Box
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #3949AB, #A1D2FA)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                src={LoginBackground}
                alt="Login Background"
                objectFit="cover"
                style={{ opacity: 0.8 }}
              />
            </Box>
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 4,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={600}
                sx={{ color: '#3C3E42' }}
                mb={3}
              >
                Avega Business Automation System v.3
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ width: { xs: '100%', md: '70%', lg: '50%' } }}>
                <Box mb={3}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        color: '#3C3E42',
                        fontSize: '20px',
                        fontWeight: 600,
                      }}
                    >
                      Welcome to Avega
                    </div>
                    <div
                      style={{
                        color: '#3C3E42',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                    >
                      Login to access your account
                    </div>
                  </div>
                </Box>

                <form action={formAction}>
                  <Stack spacing={3}>
                    {/* Username Field */}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="username"
                        mb="5px"
                      >
                        Username
                      </Typography>
                      <CustomTextField
                        id="username"
                        name="username"
                        type="text"
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isPending}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <PermIdentityIcon />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      {formik.touched.username && formik.errors.username && (
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: 'italic', color: 'red' }}
                        >
                          {formik.errors.username}
                        </Typography>
                      )}
                    </Box>

                    {/* Password Field */}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="password"
                        mb="5px"
                      >
                        Password
                      </Typography>
                      <CustomTextField
                        id="password"
                        name="password"
                        type="password"
                        fullWidth
                        size="small"
                        variant="outlined"
                        disabled={isPending}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <HttpsOutlinedIcon />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: 'italic', color: 'red' }}
                        >
                          {formik.errors.password}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {/* Submit Button */}
                  <Box mt={4}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="small"
                      fullWidth
                      loading={formik.isSubmitting}
                      disabled={formik.isSubmitting}
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      }}
                    >
                      Login
                    </LoadingButton>
                  </Box>

                  {/* Snackbar */}
                  <SingleSnackbar
                    open={snackbarOpen}
                    severity={error ? 'error' : 'success'}
                    message={error || 'Login successful!'}
                    onClose={handleSnackbarClose}
                  />
                </form>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Page;

import { gql, useMutation } from '@apollo/client';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { logUserIn } from '../../apollo';
import AuthLayout from '../../components/auth/AuthLayout';
import BottomBox from '../../components/auth/BottomBox';
import Button from '../../components/auth/Button';
import FormBox from '../../components/auth/FormBox';
import FormError from '../../components/auth/FormError';
import Input from '../../components/auth/Input';
import Separator from '../../components/auth/Separator';
import PageTitle from '../../components/PageTitle';
import routes from '../../routes';

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

type FormValues = {
  username: string;
  password: string;
  result: string;
};

interface LocationState {
  message: string;
  username: string;
  password: string;
  string: string;
}

const Login: React.FC = () => {
  const location = useLocation<LocationState>();
  console.log(location);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError('result', {
        message: error,
      });
    }

    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors('result');
  };

  return (
    <AuthLayout>
      <PageTitle title='Login' />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size='3x' />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              minLength: {
                value: 4,
                message: 'Username should be longer than 4 chars.',
                // pattern : "" // reg vaildate
                // validate: (currentValue) => currentValue.includes("potato")
              },
            })}
            onChange={clearLoginError}
            type='text'
            placeholder='Username'
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('password')}
            onChange={clearLoginError}
            type='password'
            placeholder='Password'
          />
          <FormError message={errors?.password?.message} />
          <Button
            type='submit'
            value={loading ? 'Loading...' : 'Log in'}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText='Sign up'
        link={routes.signUp}
      />
    </AuthLayout>
  );
};
export default Login;

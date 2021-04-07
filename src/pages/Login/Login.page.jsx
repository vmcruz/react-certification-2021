import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import loginApi from 'api/login';
import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Layout from 'components/Layout';
import Title from 'components/Title';
import FlexContainer from 'components/FlexContainer';
import Text from 'components/Text';
import { Container, Submit, FormInput } from './styled';

function Login() {
  const { state, theme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const usernameInputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (state.user) {
      history.push(history.location?.state?.from || '/');
    }
  }, [state.user, history]);

  async function handleLogin() {
    if (username && password) {
      setError('');
      try {
        setIsLoading(true);
        const user = await loginApi(username, password);
        dispatch({
          type: 'LOGIN',
          payload: user,
        });
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
        setUsername('');
        setPassword('');
      }
    } else {
      setError('Missing username or password');
    }

    if (usernameInputRef && usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      handleLogin();
    }
  }

  return (
    <Layout>
      <Container padding={{ all: 'md' }}>
        <Title size="sm" margin={{ bottom: 'md' }} color={theme.login.colors.title}>
          Login
        </Title>
        <FlexContainer fluid margin={{ bottom: 'md' }}>
          <FormInput
            autoFocus
            placeholder="Username..."
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            color={theme.login.colors.input}
            onKeyUp={handleKeyUp}
            ref={usernameInputRef}
          />
        </FlexContainer>
        <FlexContainer fluid margin={{ bottom: 'md' }}>
          <FormInput
            placeholder="Password..."
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            color={theme.login.colors.input}
            type="password"
            onKeyUp={handleKeyUp}
          />
        </FlexContainer>
        <FlexContainer fluid justify="flex-end" margin={{ bottom: 'md' }}>
          <Submit
            onClick={handleLogin}
            icon={isLoading ? 'spinner' : ''}
            iconColor={theme.login.colors.submit}
            primary
          >
            <Text size="md" color={theme.login.colors.submit}>
              Submit
            </Text>
          </Submit>
        </FlexContainer>
        {error && (
          <FlexContainer fluid>
            <Text size="lg" color={theme.login.colors.error}>
              ⚠ {error}
            </Text>
          </FlexContainer>
        )}
      </Container>
    </Layout>
  );
}

export default Login;

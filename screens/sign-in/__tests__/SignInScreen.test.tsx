import React from 'react';
import {
  render,
  RenderAPI,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import SignInScreen from '../SignInScreen';
import {AuthContext} from '../../../components/auth/auth.context';
import * as authServices from '../../../services/auth';

describe('SingInScreen', () => {
  let setAccessToken: jest.Mock<string, any>;
  let setRefreshToken: jest.Mock<string, any>;
  let signInSpy: jest.Sp;

  const renderComponent = (): RenderAPI => {
    return render(
      <AuthContext.Provider value={{setAccessToken, setRefreshToken}}>
        <SignInScreen />
      </AuthContext.Provider>,
    );
  };

  beforeEach(() => {
    setAccessToken = jest.fn();
    setRefreshToken = jest.fn();
  });

  it('renders without crashing', () => {
    const {container} = renderComponent();
    expect(container).toBeDefined();
  });

  it('sets the tokens upon successful login', async () => {
    signInSpy = jest.spyOn(authServices, 'signIn').mockRejectedValueOnce({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    const {getByPlaceholderText, getByText} = renderComponent();
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    fireEvent.press(getByText('LOGIN'));

    await waitFor(() => {
      expect(signInSpy).toHaveBeenCalledWith({
        emailAddress: 'test@example.com',
        password: 'password',
      });
    });
  });
});

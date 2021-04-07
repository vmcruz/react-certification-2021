import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import * as GlobalProvider from 'providers/Global/Global.provider';
import { fireEvent, act, render } from 'testing-utils';
import Header from '../Header.component';

describe('Header component', () => {
  const dispatchMock = jest.fn();
  const stateMock = {
    state: {
      user: {
        id: '123',
        name: 'Wizeline',
        avatarUrl:
          'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
      },
      searchQuery: 'wizeline',
      config: {
        theme: 'light',
      },
    },
    toggleTheme: jest.fn(),
    theme: {
      header: {
        colors: {
          text: 'white',
          switch: 'white',
          background: 'white',
        },
      },
      sidebar: {
        colors: {
          text: 'white',
        },
      },
    },
  };
  const historyPush = jest.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    stateMock.toggleTheme.mockClear();
    historyPush.mockClear();

    jest
      .spyOn(GlobalProvider, 'useGlobalDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(GlobalProvider, 'useGlobalState').mockImplementation(() => stateMock);
    useLocation.mockImplementation(() => ({ pathname: 'locationPathNameTest' }));
    useParams.mockImplementation(() => ({ query: '' }));
    useHistory.mockImplementation(() => ({ push: historyPush }));
  });

  it('renders without user logged in', () => {
    const loggedOutState = {
      ...stateMock,
      state: {
        ...stateMock.state,
        user: null,
        searchQuery: 'testing',
      },
    };

    jest.spyOn(GlobalProvider, 'useGlobalState').mockImplementation(() => loggedOutState);

    const { getByTestId, queryByTestId } = render(<Header />);

    const searchInput = getByTestId('search-input');
    const logInOutButton = getByTestId('log-in-out-button');

    expect(getByTestId('open-sidebar-button')).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toEqual('testing');
    expect(getByTestId('toggle-theme-switch')).toBeInTheDocument();
    expect(queryByTestId('user-data-container')).not.toBeInTheDocument();
    expect(logInOutButton).toBeInTheDocument();
    expect(logInOutButton.textContent).toEqual('Login');
  });

  it('renders with user logged in', () => {
    const { getByTestId } = render(<Header />);

    const searchInput = getByTestId('search-input');
    const logInOutButton = getByTestId('log-in-out-button');

    expect(getByTestId('open-sidebar-button')).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toEqual('wizeline');
    expect(getByTestId('toggle-theme-switch')).toBeInTheDocument();
    expect(getByTestId('user-data-container')).toBeInTheDocument();
    expect(logInOutButton).toBeInTheDocument();
    expect(logInOutButton.textContent).toEqual('Logout');
  });

  describe('Searches for new query', () => {
    it('dispatches a new search query when user lands into a search url', () => {
      const { rerender } = render(<Header />);

      useParams.mockImplementation(() => ({ query: 'new_search' }));

      rerender(<Header />);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'SEARCH_QUERY',
        payload: { searchQuery: 'new_search' },
      });
    });

    it('dispatches a new search when user hits enter over the search input', () => {
      const { getByTestId } = render(<Header />);

      const searchInput = getByTestId('search-input');

      act(() => {
        fireEvent.change(searchInput, { target: { value: 'test' } });
      });

      act(() => {
        fireEvent.keyUp(searchInput, { keyCode: 13 });
      });

      expect(historyPush).toHaveBeenCalledTimes(1);
      expect(historyPush).toHaveBeenCalledWith('/search/test', {
        from: 'locationPathNameTest',
      });
    });
  });

  describe('User Session', () => {
    it('redirects the user to login page if not logged', () => {
      const loggedOutState = {
        ...stateMock,
        state: {
          ...stateMock.state,
          user: null,
        },
      };

      jest
        .spyOn(GlobalProvider, 'useGlobalState')
        .mockImplementation(() => loggedOutState);

      const { getByTestId } = render(<Header />);
      const logInOutButton = getByTestId('log-in-out-button');

      fireEvent.click(logInOutButton);

      expect(historyPush).toHaveBeenCalledTimes(1);
      expect(historyPush).toHaveBeenCalledWith('/login', {
        from: 'locationPathNameTest',
      });
    });

    it('dispatches a logout action if user is logged in', () => {
      const { getByTestId } = render(<Header />);
      const logInOutButton = getByTestId('log-in-out-button');

      fireEvent.click(logInOutButton);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'LOGOUT',
      });
    });
  });

  describe('UI interactions', () => {
    it('triggers the toggle theme action', () => {
      const { getByTestId } = render(<Header />);
      let toggleThemeSwitch = getByTestId('toggle-theme-switch');

      expect(toggleThemeSwitch.firstChild).toHaveClass('fa-toggle-off');

      act(() => {
        fireEvent.click(toggleThemeSwitch);
      });

      toggleThemeSwitch = getByTestId('toggle-theme-switch');

      expect(toggleThemeSwitch.firstChild).toHaveClass('fa-toggle-on');
      expect(stateMock.toggleTheme).toHaveBeenCalledTimes(1);
    });

    it('opens and closes the sidebar', () => {
      const { getByTestId, queryByTestId } = render(<Header />);
      const sidebarBtn = getByTestId('open-sidebar-button');
      expect(queryByTestId('sidebar')).not.toBeInTheDocument();

      act(() => {
        fireEvent.click(sidebarBtn);
      });

      const sidebarOverlay = getByTestId('sidebar');
      expect(sidebarOverlay).toBeInTheDocument();

      act(() => {
        fireEvent.click(sidebarOverlay);
      });

      expect(queryByTestId('sidebar')).not.toBeInTheDocument();
    });
  });
});

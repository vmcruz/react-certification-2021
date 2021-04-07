import React from 'react';
import { fireEvent, render } from 'testing-utils';
import * as GlobalProvider from 'providers/Global/Global.provider';
import Sidebar from '../Sidebar.component';

const mockHistory = {
  push: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  useHistory: () => mockHistory,
}));

describe('Sidebar component', () => {
  const props = {
    onClose: jest.fn(),
  };

  const defaultState = {
    theme: {
      sidebar: {
        colors: {
          text: 'white',
        },
      },
    },
  };

  beforeEach(() => {
    props.onClose.mockClear();
    mockHistory.push.mockClear();
  });

  it('renders the home item', () => {
    const dispatchMock = jest.fn();
    jest
      .spyOn(GlobalProvider, 'useGlobalDispatch')
      .mockImplementation(() => dispatchMock);
    const { getByTestId } = render(<Sidebar {...props} />);

    const goHomeItem = getByTestId('go-home-item');
    expect(goHomeItem).toBeInTheDocument();

    fireEvent.click(goHomeItem);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'SEARCH_QUERY',
      payload: {
        searchQuery: 'wizeline',
      },
    });
    expect(mockHistory.push).toHaveBeenCalledTimes(1);
    expect(mockHistory.push).toHaveBeenCalledWith('/');
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('doest not render the favs item if not logged in', () => {
    const useGlobalStateMock = () => ({
      ...defaultState,
      state: {
        user: null,
      },
    });

    jest.spyOn(GlobalProvider, 'useGlobalState').mockImplementation(useGlobalStateMock);

    const { queryByTestId } = render(<Sidebar {...props} />);

    expect(queryByTestId('go-favs-item')).not.toBeInTheDocument();
  });

  it('renders the favs item if user is logged in', () => {
    const useGlobalStateMock = () => ({
      ...defaultState,
      state: {
        user: {
          id: '123',
          name: 'Wizeline',
          avatarUrl:
            'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
        },
      },
    });

    jest.spyOn(GlobalProvider, 'useGlobalState').mockImplementation(useGlobalStateMock);

    const { getByTestId } = render(<Sidebar {...props} />);

    const goFavsItem = getByTestId('go-favs-item');
    expect(goFavsItem).toBeInTheDocument();

    fireEvent.click(goFavsItem);

    expect(mockHistory.push).toHaveBeenCalledTimes(1);
    expect(mockHistory.push).toHaveBeenCalledWith('/favorites');
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});

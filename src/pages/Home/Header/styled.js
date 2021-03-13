import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.header.colors.background};
  height: 65px;
  width: 100%;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 10px 0px rgb(0 0 0 / 12%);
  padding: 15px 20px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

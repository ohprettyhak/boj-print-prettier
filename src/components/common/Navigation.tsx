import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyle from '../../styles/global-style';

const TopNavigation = styled.nav`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 48px;
  background-color: white;
  border-bottom: 1px solid #eeeeee;
`;

const TopNavigationContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 6%;
  align-items: center;
  justify-content: space-between;
`;

const TopLinkWrap = styled.ul`
  display: flex;
  height: 100%;
  padding: 0;
  list-style: none;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const TopLinkList = styled.li`
  height: 100%;
  margin: 0 0 0 48px;
  opacity: 1;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }

  a {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0;
    color: #343a40;
    font-size: 0.95rem;
    font-weight: 400;
    text-decoration: none;
    text-align: center;
    user-select: none;
    background-color: transparent;
  }
`;

const LogoContainer = styled.div`
  display: flex;
`;

const LogoGoHome = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  text-decoration: none;
  user-select: none;
  opacity: 1;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }
`;

const LogoGoTop = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  user-select: none;
  opacity: 1;
  transition: opacity 0.2s ease;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

const LogoVersion = styled.span`
  display: flex;
  align-items: center;
  padding: 0 5px;
  margin-left: 8px;
  color: #868b98;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
  background-color: #ecf0f6;
`;

const Navigation: React.FC = React.memo(() => {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <GlobalStyle />
      <TopNavigation>
        <TopNavigationContainer>
          <LogoContainer>
            {pathname === '/' ? (
              <LogoGoTop onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BOJ Print Prettier</LogoGoTop>
            ) : (
              <LogoGoHome to="/">BOJ Print Prettier</LogoGoHome>
            )}
            <LogoVersion>0.0.1b</LogoVersion>
          </LogoContainer>
          <TopLinkWrap>
            <TopLinkList>
              <a href="https://github.com/ohprettyhak/boj-print-prettier" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </TopLinkList>
          </TopLinkWrap>
        </TopNavigationContainer>
      </TopNavigation>
    </React.Fragment>
  );
});

export default Navigation;

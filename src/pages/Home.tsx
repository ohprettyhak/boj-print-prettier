import React, { useState } from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';

import { Head, Navigation } from '../components';

const Hello = styled.div`
  margin-top: 56px;
`;

const SearchBarStyle = styled.div`
  position: relative;
  display: flex;
  max-width: 720px;
  width: 100%;
  height: 58px;
  margin: 56px auto 0 auto;
`;

const SearchBarIconContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  align-items: center;
  margin-left: 16px;

  ion-icon {
    width: 18px;
    height: 18px;
    color: #bec7d5;
  }
`;

const SearchBarButton = styled(SearchBarIconContainer)`
  right: 0;
  margin-right: 16px;
  cursor: pointer;
`;

const SearchBarInput = styled.input`
  display: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 50px;
  color: #343a40;
  font-size: 1rem;
  word-wrap: break-word;
  outline: none;
  border: 1px solid #eeeeee;
  box-shadow: 0 1px 4px rgba(33, 33, 33, 0.1);
  border-radius: 12px;
  background-color: white;
  transition: all 0.3s ease;

  ::placeholder {
    color: #bec7d5;
  }

  :focus {
    box-shadow: 0 1px 8px rgba(33, 33, 33, 0.25);
    border-color: rgba(223, 225, 229, 0);
  }
`;

const Home: React.FC = React.memo(() => {
  const [problem, setProblem] = useState('');

  const [{ data, loading, error }] = useAxios({
    url: 'https://solved.ac/api/v3/search/problem/',
    params: { query: problem, sort: 'id' },
  });

  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <Head />
      <Navigation />
      <main>
        <SearchBarStyle>
          <SearchBarInput placeholder="Search problems... (id, title, ..)"></SearchBarInput>
          <SearchBarIconContainer>
            <ion-icon name="search-outline" />
          </SearchBarIconContainer>
          <SearchBarButton>
            <ion-icon name="arrow-forward-outline" />
          </SearchBarButton>
        </SearchBarStyle>
        <p>{!loading ? data.count : ''}</p>
        <button onClick={() => setProblem('1655')}>btn</button>
      </main>
    </React.Fragment>
  );
});

export default Home;

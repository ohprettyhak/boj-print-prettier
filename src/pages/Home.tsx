import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';

import { Head, Navigation } from '../components';

const Hello = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 96px auto 0 auto;
`;

const HelloTitle = styled.h1`
  color: #495057;
  font-size: 2.6rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: nowrap;
`;

const HelloSubtitle = styled.h2`
  color: #6a7075;
  text-align: center;
  letter-spacing: -0.5px;
`;

const HelloDescription = styled.p`
  margin-top: 28px;
  color: #495057;
  text-align: center;
  letter-spacing: -0.5px;
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
  const [query, setQuery] = useState('');
  const [problem, setProblem] = useState('');

  const [{ data, loading, error }] = useAxios({
    url: 'https://solved.ac/api/v3/search/problem/',
    params: { query: problem, sort: 'id' },
  });

  useEffect(() => {
    const timeOutId = setTimeout(() => setProblem(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <Head />
      <Navigation />
      <main>
        <Hello>
          <HelloTitle>BOJ Print Prettier</HelloTitle>
          <HelloSubtitle>백준 문제 예쁘게 출력하기</HelloSubtitle>
        </Hello>
        <SearchBarStyle>
          <SearchBarInput
            placeholder="Search problems... (id, title, ..)"
            onChange={(event) => setQuery(event.target.value)}
          ></SearchBarInput>
          <SearchBarIconContainer>
            <ion-icon name="search-outline" />
          </SearchBarIconContainer>
          <SearchBarButton>
            <ion-icon name="arrow-forward-outline" />
          </SearchBarButton>
        </SearchBarStyle>
        <p>{!loading ? data.count : ''}</p>
      </main>
    </React.Fragment>
  );
});

export default Home;

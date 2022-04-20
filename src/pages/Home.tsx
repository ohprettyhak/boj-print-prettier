import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex';

import { Head, Navigation } from '../components';

const Hello = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 96px auto 0 auto;
`;

const HelloTitle = styled.h1`
  color: #343a40;
  font-size: 2.6rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: nowrap;
`;

const HelloSubtitle = styled.h2`
  color: #6a7075;
  font-weight: 600;
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
  transition: all 0.3s ease-in-out;

  ::placeholder {
    color: #bec7d5;
  }

  :focus {
    box-shadow: 0 1px 8px rgba(33, 33, 33, 0.25);
    border-color: rgba(223, 225, 229, 0);
  }
`;

const SearchResultContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 42px auto 0 auto;
  border: 1px solid #eeeeee;
  box-shadow: 0 1px 4px rgba(33, 33, 33, 0.1);
  border-radius: 12px;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
`;

const SearchResultTable = styled.div`
  display: table;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
`;

const SearchResultItem = styled.div`
  display: table-row;
  width: 100%;

  :nth-child(-n + 1) {
    background: #eeeeee;
    font-weight: bold;
    text-align: center;
  }
`;

const SearchResultItemCell = styled.div`
  display: table-cell;
  box-sizing: border-box;
  padding: 8px 16px;
  color: #343a40;
`;

const SearchResultItemLink = styled(Link)`
  display: inline-block;
  color: #343a40;
  line-height: 1em;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  border-spacing: -2px;

  :hover {
    border-bottom: 1px solid #343a40;
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

  console.log(data);

  const makeTierElement = (level: number) => {
    if (level === 0)
      return (
        <SearchResultItemCell style={{ width: '15%', textAlign: 'center', color: 'black' }}>
          Unrated
        </SearchResultItemCell>
      );

    let tier = level % 5;
    if (tier === 0) tier = 5;

    let textColor = 'rgb(33, 33, 33)';
    let rst = 'Unrated';
    if (level < 6) {
      textColor = 'rgb(173, 86, 0)';
      rst = `B${tier}`;
    } else if (level < 11) {
      textColor = 'rgb(67, 95, 122)';
      rst = `S${tier}`;
    } else if (level < 16) {
      textColor = 'rgb(236, 154, 0)';
      rst = `G${tier}`;
    } else if (level < 21) {
      textColor = 'rgb(39, 226, 164)';
      rst = `P${tier}`;
    } else if (level < 26) {
      textColor = 'rgb(0, 180, 252)';
      rst = `D${tier}`;
    } else {
      textColor = 'rgb(255, 0, 98)';
      rst = `R${tier}`;
    }

    return (
      <SearchResultItemCell style={{ width: '15%', textAlign: 'center', color: textColor }}>{rst}</SearchResultItemCell>
    );
  };

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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          ></SearchBarInput>
          <SearchBarIconContainer>
            <ion-icon name="search-outline" />
          </SearchBarIconContainer>
          <SearchBarButton>
            <ion-icon name="arrow-forward-outline" />
          </SearchBarButton>
        </SearchBarStyle>
        <SearchResultContainer>
          <SearchResultTable>
            <SearchResultItem>
              <SearchResultItemCell style={{ width: '15%' }}>티어</SearchResultItemCell>
              <SearchResultItemCell style={{ width: '12.5%' }}>#</SearchResultItemCell>
              <SearchResultItemCell style={{ width: '55%' }}>제목</SearchResultItemCell>
              <SearchResultItemCell style={{ width: '17.5%' }}>평균 시도 횟수</SearchResultItemCell>
            </SearchResultItem>
            {!loading &&
              data.items.map((member: any) => (
                <React.Fragment key={member.problemId}>
                  <SearchResultItem>
                    {makeTierElement(member.level)}
                    <SearchResultItemCell style={{ width: '12.5%', textAlign: 'center' }}>
                      <SearchResultItemLink to={`/${member.problemId}`}>{member.problemId}</SearchResultItemLink>
                    </SearchResultItemCell>
                    <SearchResultItemCell style={{ width: '55%' }}>
                      <SearchResultItemLink to={`/${member.problemId}`}>
                        <Latex displayMode={true}>{member.titleKo}</Latex>
                      </SearchResultItemLink>
                    </SearchResultItemCell>
                    <SearchResultItemCell style={{ width: '17.5%', textAlign: 'center' }}>
                      {member.averageTries}
                    </SearchResultItemCell>
                  </SearchResultItem>
                </React.Fragment>
              ))}
          </SearchResultTable>
        </SearchResultContainer>
      </main>
    </React.Fragment>
  );
});

export default Home;

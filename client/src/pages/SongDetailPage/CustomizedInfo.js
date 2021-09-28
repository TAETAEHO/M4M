import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Chart from '../../database/Chart';
import JJM from '../../database/JJM';
import { Colors, GlobalStyle } from '../../components/utils/_var';

const Wrapper = styled.div`
  .year-info-container {
    /* height: 12rem; */
    padding: .8rem 0 .4rem;
    /* background: ${Colors.beige};  */
    border: 1px solid ${Colors.borderColor};
    font-size: .9rem;
  }
  .custom-field {
    margin: 1rem auto .5rem;
    color: ${Colors.darkGray};
    font-family: 'Arial';
    font-size: .85rem;
  }
  .custom-field:first-child{
    margin: 0 auto .2rem;
  }
  li {
    text-align: left;
    margin-bottom: .2rem;
    font-size: .85rem;
  }
  li:first-child{
    margin-top: -.5rem;
  }

`;

const AgeContainer = styled.div`
  cursor: ${props => props.cursor};
`;

const CustomizedInfo = ({ songInfo, information }) => {
  const history = useHistory();
  let age = '?';
  const chartYear = songInfo.date ? songInfo.date.split('.')[0] : null;
  const topSongs = Chart[0][`${chartYear}년`];
  // console.log(topSongs);

  if (information && information.birthYear && songInfo.year) {
    // VALID CODE NOT FOR TESTING
    age = songInfo.year - information.birthYear + 1;
    // console.log(information.birthYear);

    // JUST FOR TEST PURPOSES
    // const fakeBY = 2000;
    // age = songInfo.year - fakeBY + 1;

    if (age < 1) {
      age = -1;
    }
  }

  const handleYearClicked = () => {
    if (!information) {
      alert('로그인이 필요한 서비스입니다.');
    } else if (information.kakao && age === '?') {
      alert('출생년도 등록이 필요한 서비스입니다.');
      history.push({
        pathname: '/myinfo'
      });
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='year-info-container'>
        <AgeContainer
          cursor={age !== '?' ? 'default' : 'pointer'}
          onClick={handleYearClicked}
        >
          <div className='custom-field'>{chartYear}년 당시 당신의 나이</div>
          <div>
            {age !== -1 ? age : '아직 당신은 태어나기 전입니다.'}
          </div>
        </AgeContainer>
        <div className='custom-field'>{chartYear}년의 자장면 가격</div>
        {JJM[0][`${chartYear}년`]}
        <div className='custom-field'>{chartYear}년의 Top 3</div>
        <ol>
          {chartYear && topSongs.map((song, idx) => {
            return <li key={idx}>{song.title} by {song.artist}</li>;
          })}
        </ol>
      </div>
    </Wrapper>
  );
};

export default CustomizedInfo;

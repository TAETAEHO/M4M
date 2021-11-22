import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import SongList from './MainSongList';
import { changeType, getSongsBulk } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { media } from '../../components/utils/_media-queries';
import axios from 'axios';

axios.defaults.headers.withCredentials = true;

const MainWrapper = styled.div`
  .main {
    display: inline-block;
<<<<<<< HEAD
    background-color: #f7efe5;
    min-height: calc(100vh - 62.39px - 129px);
    ${media.tablet`display: flex`};
    ${media.tabletMini`min-height: calc(100vh - 62.39px - 116px)`};
    ${media.tablet`min-height: calc(100vh - 62.39px - 71px)`};
    ${media.laptop`min-height: calc(100vh - 62.39px - 61px)`};
=======
    ${media.tablet`display: flex;`}
    min-height: calc(100vh - 62.39px - 100px);
    ${media.tablet`min-height: calc(100vh - 62.39px - 62px);`}
    ${media.laptop`min-height: calc(100vh - 62.39px - 55px);`}
>>>>>>> 34a712fcceeee8e7009561987ad05196db313fd1
  }
  .loading-container {
    padding-top: 2rem;
    /* font-family: 'Arial'; */
    width: 100%;
    justify-content: center;
    text-align: center;
    ${media.tabletMini`margin: 0 30rem auto 0;`}
    ${media.tablet`text-align: left; padding-top: 2.5rem;`}
  }
`;

function Main() {
  const dispatch = useDispatch();
  const information = JSON.parse(localStorage.getItem('userinfo'));
  const token = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(changeType('All'));
    setIsLoading(true);
    const headersContent = { 'Content-Type': 'application/json' };
    if (information) headersContent.Authorization = `Bearer ${token}`;
    axios
      .get(process.env.REACT_APP_API_URL + '/mainpage', { headers: headersContent })
      .then((res) => {
<<<<<<< HEAD
=======
        // console.log('✅ songs update');
>>>>>>> 34a712fcceeee8e7009561987ad05196db313fd1
        dispatch(getSongsBulk(res.data.data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [dispatch]);

  return (
    <MainWrapper>
      <div className='main'>
        <SideNav />
        {isLoading
          ? <div className='loading-container'>
            로딩 중입니다...
          </div>
          : <SongList />}
      </div>
    </MainWrapper>
  );
}

export default Main;

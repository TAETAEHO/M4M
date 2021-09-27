import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import SongList from './MainSongList';
import { changeType, getSongsBulk } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers.withCredentials = true;

const MainWrapper = styled.div`
  .main {
    display: flex;
    background-color: #f7efe5;
    min-height: calc(100vh - 41px - 56px);
  }
`;

function Main () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeType('All'));
    axios
      .get(process.env.REACT_APP_API_URL + '/mainpage', { headers: { 'Content-Type': 'application/json'} })
      .then((res) => {
        console.log('✅ songs update');
        dispatch(getSongsBulk(res.data.data));
      })
      .catch(console.log);
  }, [dispatch]);

  return (
    <MainWrapper>
      <div className='main'>
        <SideNav />
        <SongList />
      </div>
    </MainWrapper>
  );
}

export default Main;

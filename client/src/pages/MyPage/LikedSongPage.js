import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Colors, GlobalStyle } from '../../components/utils/_var';
import SideNav from '../../components/SideNav';
import { changeHeader } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { media } from '../../components/utils/_media-queries';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }
  .main {
    display: inline-block;
    ${media.tablet`display: flex`};
    min-height: calc(100vh - 62.39px - 129px);
    ${media.tabletMini`min-height: calc(100vh - 62.39px - 116px)`};
    ${media.tablet`min-height: calc(100vh - 62.39px - 71px)`};
    ${media.laptop`min-height: calc(100vh - 62.39px - 61px)`};
  }
  .loading-container {
    padding-top: 2rem;
    font-family: 'Arial';
  }
  .songlist {
    margin: 0 auto;
    width: 98%;
    max-width: 58rem;
    ${media.tabletMini`padding-right: 0rem; width: 97%;`}
    ${media.tablet`padding-right: 2rem; margin: 0 0; max-width: 38rem;`}  
    ${media.tablet`max-width: 50rem;`}  
    ${media.laptop`max-width: 80vw; width: 80vw;`}
    ${media.large`max-width: 85vw;`}
  }
  .scrollable::-webkit-scrollbar {
    height: 10px;
  }
  .scrollable::-webkit-scrollbar-thumb {
    visibility: hidden;
  }
  .scrollable::-webkit-scrollbar-thumb:hover {
    border-top: 0.5px solid;
    border-bottom: 0.5px solid;
    border-left: 0.5px solid;
    border-right: 1px solid;
    cursor: all-scroll;
  }
  .button-container {
    display: flex;
    padding-top: 2rem;
    margin: -1rem 0 0.2rem;
    width: 100%;
    ${media.tabletMini`padding-top: 2rem; margin: -1rem 0 .2rem;`}
    ${media.tablet`margin: 0 0 .2rem;`}
    justify-content: right;
    max-width: 58rem;
    text-align: right;
    ${media.laptop`max-width: 78vw; width: 78vw;`}
  }
  button {
    margin-left: auto;
    word-spacing: -0.1rem;
    font-size: 0.8rem;
    color: ${Colors.darkGray};
    background: none;
    border: none;
  }
  button:hover {
    cursor: pointer;
    color: ${Colors.purple};
  }
  .field-container {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: -1.3rem;
    width: 100%;
  }
  .field-container > div,
  input {
    margin: 0 0 0.3rem;
  }
  .field {
    display: grid;
    width: 92%;
    grid-template-columns: 15% 27% 26% 15% 12%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 13% 8%; width: 100%;`}
    ${media.tablet`grid-template-columns: 12% 32% 32% 12% auto; width: 100%;`}
    margin: .75rem auto 0;
    padding: 0.15rem 0.15rem;
    border: solid 1px ${Colors.lightGray};
    border-left: none;
    border-right: none;
  }
  .select-all,
  .select-one {
    margin-right: 0.7rem;
  }
  .field .grid-item {
    text-align: left;
    font-family: 'Arial';
    color: ${Colors.gray};
  }
  .grid-item {
    font-size: 0.8rem;
    align-self: center;
  }
  .grid-item:not(:first-of-type) {
    padding-left: 0.2rem;
  }
  .field-album {
    /* visibility: hidden; */
  }
  .field-title {
    padding: auto;
    margin-left: 0.4rem;
    width: 100%;
    ${media.tabletMini`margin-left: .6rem;`}
  }
  .song-container > div,
  input {
    margin: 0;
  }
  .song-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .song-info-container {
    display: grid;
    width: 92%;
    grid-template-columns: 15% 27% 26% 15% 12%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 13% 8%; width: 100%;`}
    ${media.tablet`grid-template-columns: 12% 32% 32% 12% auto; width: 100%;`}
    margin: 0 auto;
    padding: 0.4rem 0.15rem;
    border-bottom: solid 1px ${Colors.lightGray};
    cursor: pointer;
  }
  .song-info-container > div:nth-child(-n + 5) {
    margin-top: 0.3rem;
  }
  .scrollable {
    overflow-x: auto;
    white-space: nowrap;
  }
  .album_art {
    margin: auto 0.25rem;
    width: 6rem;
    height: auto;
    grid-row: 1 / 4;
  }
  .info {
    width: 100%;
    font-family: 'Arial';
    font-size: 0.8rem;
    text-align: left;
    color: ${Colors.black};
  }
  .info:not(:first-of-type) {
    padding-left: 0.2rem;
  }
  .title {
    margin-left: 0.5rem;
    ${media.tabletMini`padding-left: .3rem;`}
  }
  .date,
  .like {
    color: ${Colors.gray};
  }
  .hashtagBox {
    margin-top: 1rem;
    margin-left: 0.4rem;
    grid-row: 2;
    grid-column: 2 / end;
    ${media.tablet`padding-left: .3rem;`}
  }
  .message {
    margin-top: 1.2rem;
    color: ${Colors.black};
    font-family: 'Arial';
    font-size: 0.9rem;
  }
`;

const HashTag = styled.div`
  float: left;
  margin: auto 0.2rem 0.2rem;
  padding: 0.2rem;
  border: solid 1px;
  border-color: ${(props) => props.borderColor};
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  font-family: 'Arial';
  font-size: 0.7rem;
`;

const GetLikedSong = ({ modal, handleMessage, handleNotice }) => {
  const token = localStorage.getItem('accessToken');
  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [CheckList, setCheckList] = useState([]);
  const [IdList, setIdList] = useState([]);
  const Hashtag = [
    '?????????',
    '#????????????',
    '#??????????????????',
    '#??????????????????',
    '#???????????????',
    '#??????????????????',
    '#?????????18???',
    '#????????????'
  ];
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
          modal();
          setIsLoading(false);
        } else {
          const result = await axios.get(process.env.REACT_APP_API_URL + '/my-like', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setSongList(result.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response.data.message === 'No songs are added to the list') {
          setIsLoading(false);
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  // console.log(songList);

  useEffect(() => {
    const ids = [];
    if (songList.length !== 0) {
      songList.map((song, i) => {
        ids[i] = song.id;
      });
      setIdList(ids);
    }
  }, [songList]);

  const onChangeAll = (e) => {
    // ????????? ??? CheckList??? id ??? ?????? ??????, ?????? ????????? ??? CheckList??? ??? ?????? ??????
    setCheckList(e.target.checked ? IdList : []);
  };

  const onChangeEach = (e, id) => {
    // ????????? ??? CheckList??? id??? ??????
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
      // ?????? ????????? ??? CheckList?????? ?????? id?????? ?????? ?????? ????????? ??????
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };

  // console.log('checked song id: ' + CheckList);

  // Song Detail ???????????? ??????
  const handleSongClicked = (song) => {
    history.push({
      pathname: `/song:id=${song.id}`
    });
  };

  const handleSongDelete = () => {
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      modal();
    } else if (CheckList.length > 0) {
      axios
        .delete(process.env.REACT_APP_API_URL + '/my-like', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: {
            songId: CheckList
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch(console.log);
    } else {
      handleNotice(true);
      handleMessage('?????? ??????????????????!');
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className="main">
        <SideNav />
        {isLoading ? (
          <div className="loading-container">?????? ????????????...</div>
        ) : (
          <div className="songlist">
            <div className="button-container">
              <button onClick={handleSongDelete}>?????? ?????? ??????</button>
            </div>
            <div className="field-container">
              <input
                type="checkbox"
                className="select-all"
                onChange={onChangeAll}
                checked={CheckList.length === IdList.length}
              />
              <div className="field">
                <div className="grid-item field-album" />
                <div className="grid-item field-title">??????</div>
                <div className="grid-item field-artist">??????</div>
                <div className="grid-item field-date">?????????</div>
                <div className="grid-item field-like">?????????</div>
              </div>
            </div>
            <br />
            {songList.length !== 0 ? (
              songList.map((song, idx) => {
                return (
                  <div key={idx}>
                    <div className="song-container">
                      <input
                        type="checkbox"
                        className="select-one"
                        onChange={(e) => onChangeEach(e, song.id)}
                        checked={CheckList.includes(song.id)}
                      />
                      <div className="song-info-container" onClick={() => handleSongClicked(song)}>
                        <img src={song.album_art} alt={song.id} className="info album_art" />
                        <div className="info title scrollable">{song.title}</div>
                        <div className="info artist scrollable">{song.artist}</div>
                        <div className="info date">{song.date}</div>
                        <div className="info like">
                          <FontAwesomeIcon icon={faHeart} size="xs" color="red" />{' '}
                          {song.hashtagLike[0][1]}
                        </div>
                        <div className="hashtagBox">
                          {song.userHashtagLikes &&
                            song.hashtagLike.map((tag, idx) => {
                              return (
                                <div key={song + idx}>
                                  {tag[0] === '?????????' ? null : (
                                    <HashTag
                                      borderColor={
                                        song.userHashtagLikes &&
                                        song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1)
                                          ? 'none'
                                          : Colors.mediumGray
                                      }
                                      backgroundColor={
                                        song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1)
                                          ? Colors.darkGray
                                          : 'white'
                                      }
                                      textColor={
                                        song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1)
                                          ? 'white'
                                          : Colors.darkGray
                                      }>
                                      {tag[0]} {tag[1]}
                                    </HashTag>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="message">?????? ???????????? ????????? ?????? ????????????.</div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default GetLikedSong;

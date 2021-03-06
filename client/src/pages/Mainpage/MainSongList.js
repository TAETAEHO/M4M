import styled from 'styled-components';
import { changeHeader } from '../../redux/action';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { media } from '../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../components/utils/_var';
import TypeWriterEffect from 'typewriter-effect';

axios.defaults.withCredentials = true;

const LoadingWrpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.darkGray};
  font-size: 1.25rem;
  ${media.tablet`font-size: 1.65rem;`}
  /* font-family: 'Arial'; */
  padding: .5rem;
`;
const SongListWrapper = styled.div`
  * {
    box-sizing: border-box;
  }
  .no-result {
    color: ${Colors.black};
    /* font-family: 'Arial'; */
    font-size: 0.9rem;
    padding-top: 2rem;
    width: 100%;
    justify-content: center;
    text-align: center;
    margin: auto 20rem auto 0;
    ${media.tablet`margin: auto; padding-top: 2.5rem;`}
  }
  .arrow-image {
    height: 0.9rem;
    vertical-align: middle;
    margin-left: 0.5rem;
    padding-bottom: 0.2rem;
  }
  .type {
    margin: 1.75rem auto 0.5rem;
    ${media.tabletMini`padding-right: 0;`}
    ${media.tablet`margin: 2rem auto .5rem;`}
    text-align: right;
    color: ${Colors.darkGray};
    /* font-family: 'Arial'; */
    font-size: 1.1rem;
    width: 95%;
    ${media.tabletMini`width: 98%;`}
    ${media.large`width: 95%;`}
  }
  .songlist {
    margin: 0 auto;
    width: 98%;
    max-width: 60rem;
    ${media.tabletMini`padding-right: 0rem; width: 100%;`}
    ${media.tablet`padding-right: 2rem;`}   
    ${media.tablet`width: 41rem;`}
    ${media.tablet`max-width: 76vw; width: 76vw; padding-left: 0rem;`}
    ${media.laptop`max-width: 80vw; width: 80vw;`}
    ${media.large`max-width: 85vw; width: 85vw;`}
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
  .field-container {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: -5px;
    width: 100%;
  }
  .field-container > div,
  input {
    margin: 0 0 0.3rem;
  }
  .field {
    display: grid;
    width: 92%;
    grid-template-columns: 15% 25% 23% 16% 16%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 12% 12%; width: 100%;`}
    ${media.tablet`grid-template-columns: 11% 32% 32% 12% 12%;`}
    margin: .75rem auto 0;
    padding: 0.15rem 0.15rem;
    border: solid 1px ${Colors.lightGray};
    border-left: none;
    border-right: none;
    ${media.tabletMini`width: 98%;`}
    ${media.tablet`width: 37rem;`}
    ${media.tablet`max-width: 80vw; width: 80vw;`}
  }

  .field .grid-item {
    text-align: left;
    /* font-family: 'Arial'; */
    color: ${Colors.gray};
  }
  .grid-item {
    font-size: 0.8rem;
    align-self: center;
  }
  .grid-item:not(:first-of-type) {
    padding-left: 0.2rem;
    cursor: pointer;
  }
  .field-title {
    padding: auto;
    margin-left: 0.4rem;
    width: 100%;
    ${media.tablet`margin-left: .6rem;`}
  }
  .field-artist {
    margin-left: 0.4rem;
  }
  .song-container > div,
  input {
    margin: 0;
  }
  .song-container {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: -5px;
    width: 100%;
  }
  .song-info-container {
    display: grid;
    width: 92%;
    grid-template-columns: 15% 25% 23% 16% 16%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 12% 12%; width: 100%;`}
    ${media.tablet`grid-template-columns: 11% 32% 32% 12% 12%;`}
    margin: 0 auto;
    padding: 0.4rem 0.15rem;
    border-bottom: solid 1px ${Colors.lightGray};
    cursor: pointer;
    ${media.tabletMini`width: 98%;`}
    ${media.tablet`max-width: 80vw; width: 80vw;`}
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
    /* font-family: 'Arial'; */
    font-size: 0.8rem;
    text-align: left;
    color: ${Colors.black};
  }
  .info:not(:first-of-type) {
    padding-left: 0.2rem;
  }
  .title {
    margin-left: 0.5rem;
    ${media.tablet`margin-left: .65rem;`}
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
    width: 100%;
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
  /* font-family: 'Arial'; */
  font-size: 0.7rem;
`;

const YearContainer = styled.div`
  margin: 1.2rem auto 0.5rem;
  ${media.tabletMini`padding-right: 0;`}
  ${media.tablet`margin: 2rem auto .5rem;`}
  text-align: right;
  color: ${Colors.darkGray};
  /* font-family: 'Arial'; */
  font-size: 1.1rem;
  width: 95%;
  ${media.tabletMini`width: 98%;`}
`;
const YearType = styled.div`
  display: inline;
  margin-left: 0.3rem;
`;
const MessageContainer = styled.div`
  display: inline;
  color: white;
  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.show};
  }
  .message {
    display: inline;
    font-size: 0.8rem;
    margin-right: 0.2rem;
  }
`;

function SongList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchState = useSelector((state) => state.searchReducer).searchResult;
  const typeState = useSelector((state) => state.typeReducer).navType;
  const songsBulkState = useSelector((state) => state.songsBulkReducer).songsBulk;
  const songNumber = 10;
  const Genre = [
    '?????????',
    '??????',
    '???/??????',
    'R&B/Soul',
    '????????????',
    '???/??????',
    '?????????',
    '??????/?????????'
  ];
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
  const Year = new Array(18).fill(1992).map((el, idx) => String(el + idx));
  const loadingTime = (Math.random() + 1) * 1000;
  const [isScrollCnt, setIsScrollCnt] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState([]);
  const [result, setResult] = useState([]);
  const [subSort, setSubSort] = useState({
    title: 'none',
    artist: 'none',
    date: 'none',
    like: 'none'
  });
  const plainList = { All: '?????? ??????', Like: '?????????' };

  useEffect(() => {
    setIsSorted(searchState);
  }, [searchState]);

  useEffect(() => {
    dispatch(changeHeader([true, true]));
    setIsSorted(songsBulkState);
  }, [songsBulkState]);

  useEffect(() => {
    setResult(isSorted);
  }, [isSorted]);

  useEffect(() => {
    if (typeState === 'All') setIsSorted(songsBulkState);
    if (typeState === 'Like') {
      setIsSorted(
        songsBulkState
          .slice()
          .filter((song) => song.hashtagLike[0][1])
          .sort((a, b) => b.hashtagLike[0][1] - a.hashtagLike[0][1])
      );
    }
    Genre.forEach((el) => {
      if (typeState === el) {
        setIsSorted(
          songsBulkState.slice().filter((song) => {
            const genreList = song.genre.split(', ');
            for (let i = 0; i < genreList.length; i++) {
              if (genreList[i] === typeState) return true;
            }
            return false;
          })
        );
      }
    });
    Hashtag.forEach((el, idx) => {
      if (typeState === el) {
        setIsSorted(
          songsBulkState
            .slice()
            .filter((song) => song.hashtagLike[idx][1])
            .sort((a, b) => b.hashtagLike[idx][1] - a.hashtagLike[idx][1])
        );
      }
    });
    Year.forEach((el) => {
      if (typeState === el) {
        setIsSorted(songsBulkState.slice().filter((song) => song.year === Number(typeState)));
      }
    });
    setIsScrollCnt(1);
    setSubSort({
      title: 'none',
      artist: 'none',
      date: 'none',
      like: 'none'
    });
  }, [typeState]);

  window.onscroll = () => {
    const scrollLocation = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    if (
      fullHeight <= scrollLocation + windowHeight &&
      Math.ceil(result.length / 10) > isScrollCnt
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsScrollCnt(isScrollCnt + 1);
      }, loadingTime);
    }
  };
  const handleSubSort = (e) => {
    const standard = e.target.innerText;
    if (standard === '??????') {
      if (subSort.title === 'none') {
        setSubSort({
          title: 'for',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => a.title.localeCompare(b.title)));
        // console.log('???? handleSubSort: title(for)');
      } else if (subSort.title === 'for') {
        setSubSort({
          title: 'back',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => b.title.localeCompare(a.title)));
        // console.log('???? handleSubSort: title(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === '????????????') {
      if (subSort.artist === 'none') {
        setSubSort({
          title: 'none',
          artist: 'for',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => a.artist.localeCompare(b.artist)));
        // console.log('???? handleSubSort: artist(for)');
      } else if (subSort.artist === 'for') {
        setSubSort({
          title: 'none',
          artist: 'back',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => b.artist.localeCompare(a.artist)));
        // console.log('???? handleSubSort: artist(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === '?????????') {
      if (subSort.date === 'none') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'for',
          like: 'none'
        });
        setResult(
          isSorted.slice().sort((a, b) => a.date.replace('.', '') - b.date.replace('.', ''))
        );
        // console.log('???? handleSubSort: date(for)');
      } else if (subSort.date === 'for') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'back',
          like: 'none'
        });
        setResult(
          isSorted.slice().sort((a, b) => b.date.replace('.', '') - a.date.replace('.', ''))
        );
        // console.log('???? handleSubSort: date(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === '?????????') {
      if (subSort.like === 'none') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'for'
        });
        setResult(isSorted.slice().sort((a, b) => b.hashtagLike[0][1] - a.hashtagLike[0][1]));
        // console.log('???? handleSubSort: like(for)');
      } else if (subSort.like === 'for') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'back'
        });
        setResult(isSorted.slice().sort((a, b) => a.hashtagLike[0][1] - b.hashtagLike[0][1]));
        // console.log('???? handleSubSort: like(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    }
  };
  const handleSongDetail = (song) => history.push({ pathname: `/song:id=${song.id}` });

  return (
    <SongListWrapper>
      <GlobalStyle />
      <div className="songlist">
        {typeState === 'No Result' || result.length === 0 ? (
          <div className="no-result">?????? ????????? ???????????? ????????????.</div>
        ) : (
          <>
            {Object.keys(plainList).includes(typeState) ? (
              <div className="type">{plainList[typeState]}</div>
            ) : Number(typeState) >= 1992 && Number(typeState) <= 2009 ? (
              <YearContainer>
                <MessageContainer show={Colors.mediumGray}>
                  <div className="message">?????? ?????? ????????? Top 30??? ???????????????.</div>
                  <FontAwesomeIcon icon={faQuestionCircle} size="xs" color={Colors.mediumGray} />
                </MessageContainer>
                <YearType>{typeState}</YearType>
              </YearContainer>
            ) : (
              <div className="type">{typeState}</div>
            )}
            <div className="field-container">
              <div className="field">
                <div className="grid-item field-album" />
                <div className="grid-item field-title" onClick={handleSubSort}>
                  ??????
                  <img
                    className="arrow-image"
                    alt="arrow1"
                    src={`/image/arrow${subSort.title}.png`}
                  />
                </div>
                <div className="grid-item field-artist" onClick={handleSubSort}>
                  ????????????
                  <img
                    className="arrow-image"
                    alt="arrow2"
                    src={`/image/arrow${subSort.artist}.png`}
                  />
                </div>
                <div className="grid-item field-date" onClick={handleSubSort}>
                  ?????????
                  <img
                    className="arrow-image"
                    alt="arrow3"
                    src={`/image/arrow${subSort.date}.png`}
                  />
                </div>
                <div className="grid-item field-like" onClick={handleSubSort}>
                  ?????????
                  <img
                    className="arrow-image"
                    alt="arrow4"
                    src={`/image/arrow${subSort.like}.png`}
                  />
                </div>
              </div>
            </div>
            <div className="list">
              {result &&
                result.map((song, idx) => {
                  if (idx + 1 <= isScrollCnt * songNumber) {
                    return (
                      <div className="song-container" key={song.id}>
                        <div className="song-info-container" onClick={() => handleSongDetail(song)}>
                          <img
                            className="info album_art"
                            src={song.album_art}
                            alt={song.title}
                            loading="lazy"
                          />
                          <div className="info title scrollable">{song.title}</div>
                          <div className="info artist scrollable">&nbsp;&nbsp;{song.artist}</div>
                          <div className="info date">{song.date}</div>
                          <div className="info like">
                            {song.userHashtagLikes && song.userHashtagLikes.includes(1) ? (
                              <FontAwesomeIcon icon={faHeart} size="xs" color="red" />
                            ) : (
                              <FontAwesomeIcon icon={farHeart} size="xs" color="red" />
                            )}{' '}
                            {song.hashtagLike[0][1]}
                          </div>
                          <div className="hashtagBox">
                            {song.hashtagLike.map((tag, idx) => {
                              return (
                                <div key={idx}>
                                  {tag[0] === '?????????' || tag[1] === 0 ? null : (
                                    <HashTag
                                      borderColor={
                                        song.userHashtagLikes &&
                                        song.userHashtagLikes.includes(idx + 1)
                                          ? 'none'
                                          : Colors.mediumGray
                                      }
                                      backgroundColor={
                                        song.userHashtagLikes &&
                                        song.userHashtagLikes.includes(idx + 1)
                                          ? Colors.darkGray
                                          : 'white'
                                      }
                                      textColor={
                                        song.userHashtagLikes &&
                                        song.userHashtagLikes.includes(idx + 1)
                                          ? 'white'
                                          : Colors.darkGray
                                      }
                                      key={idx}>
                                      {tag[0]} {tag[1]}
                                    </HashTag>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              {isLoading && (
                <LoadingWrpper>
                  <TypeWriterEffect
                    onInit={(typewriter) => {
                      typewriter.typeString('?????? ????????????...').pauseFor(1000).start();
                    }}
                  />
                </LoadingWrpper>
              )}
            </div>
          </>
        )}
      </div>
    </SongListWrapper>
  );
}

export default SongList;

import styled from 'styled-components';
import { getRegExp } from 'korean-regexp';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notify, changeType, getResult } from '../redux/action';
import { Colors } from './utils/_var';

const MediaSearchbarWrapper = styled.div`
  .media-searchbar {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 62.38px;
    background-color: white;
    /* opacity: 0.8; */
  }
  .deactive {
    display: none;
  }
  .searchbar {
    margin: 0 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .searchbar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2rem;
    padding-top: 0.2rem;
    border: 1px solid ${Colors.mediumGray};
    border-radius: 15px;
  }
  .search-icon {
    width: 1rem;
    margin-left: 0.5rem;
    margin-bottom: 0.23rem;
    vertical-align: middle;
    align-items: left;
  }
  .searchbar-text {
    border: none;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    margin-bottom: 0.23rem;
    padding-top: 0.1rem;
    padding-left: 0.75rem;
    width: 100%;
    height: 98%;
    font-size: 1rem;
    border-radius: 15px;
    color: ${Colors.black};
    &::placeholder {
      padding-bottom: 0.3rem;
      font-size: 0.75rem;
    }
  }
  .searchbar-dropbox {
    font-size: 0.85rem;
    margin-right: 0.8rem;
    color: ${Colors.darkGray};
    border: none;
    cursor: pointer;
  }
  .closeBtn {
    margin: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colors.gray};
    margin: 0 0.5rem;
    font-size: 1.5rem;
    transition-duration: 500ms;
    cursor: pointer;
    &:hover {
      color: ${Colors.pastelPurple};
    }
  }
`;

function MediaSearchbar({ mediaState, handleMediaState, handleBarState }) {
  const songsBulkState = useSelector((state) => state.songsBulkReducer).songsBulk;
  const notiState = useSelector((state) => state.notiReducer).notifications;
  const dispatch = useDispatch();
  const searchTypeList = ['??????', '????????????'];
  const searchTypeName = ['title', 'artist'];
  const [searchType, setSearchType] = useState(searchTypeName[0]);

  const getSearchResult = (reqSearchType, reqKeyword) => {
    if (reqKeyword.length !== 0) {
      const result = songsBulkState.filter((song) =>
        getRegExp(reqKeyword).test(song[reqSearchType])
      );
      if (result.length !== 0) {
        dispatch(
          changeType(
            `?????? ??????: ${searchTypeList[searchTypeName.indexOf(reqSearchType)]} - ${reqKeyword}`
          )
        );
        dispatch(getResult(result));
      } else {
        dispatch(changeType('No Result'));
      }
    } else {
      if (notiState.message === '') {
        dispatch(notify('???????????? ???????????????. ????????? ??????????????????! ???( ??? )???'));
      }
    }
  };

  const handleSearchTypeChange = (e) => setSearchType(e.target.value);

  const handleKeyboard = (e) => {
    if (e.key === 'Enter') {
      getSearchResult(searchType, e.target.value);
    }
  };

  return (
    <MediaSearchbarWrapper>
      <div className={`media-searchbar ${mediaState}`}>
        <div className="searchbar">
          <select className="searchbar-dropbox" onChange={handleSearchTypeChange}>
            {searchTypeList.map((searchType, idx) => (
              <option value={searchTypeName[idx]} key={idx + 1}>
                {searchType}
              </option>
            ))}
          </select>
          <div className="searchbar-container">
            <img className="search-icon" src="/image/Search_Icon.svg" alt="search-icon" />
            <input
              className="searchbar-text"
              type="text"
              placeholder="?????? ?????? ?????????????????? ??????????????????."
              onKeyPress={handleKeyboard}
            />
          </div>
        </div>
        <div
          className="closeBtn"
          onClick={() => {
            handleMediaState();
            handleBarState();
          }}>
          &#88;
        </div>
      </div>
    </MediaSearchbarWrapper>
  );
}

export default MediaSearchbar;

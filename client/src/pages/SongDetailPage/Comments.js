import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import CommentPagination from './CommentPagination';
import { media } from '../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../components/utils/_var';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .counter {
    min-width: 320px;
    max-width: 479px;
    margin: .5rem auto;
    ${media.tabletMini`min-width: 470px; max-width: 750px;`}
    ${media.tablet`width: 41.7rem; max-width: 1024px;`}
    text-align: left;
    /* font-family: 'Arial'; */
    font-size: .9rem;
    color: ${Colors.darkGray};
  }
  .comments-container {
    margin: auto auto 1.2rem;
    min-width: 320px;
    max-width: 479px;
    ${media.tabletMini`min-width: 470px; max-width: 750px;`}
    ${media.tablet`width: 41.7rem; max-width: 1024px;`}
    background-color: #ededed;
    border: solid 1px ${Colors.lightGray};
  }
  .comments-input-container {
    display: grid;
    justify-content: center;
    grid-template-columns: 85% 10%;
    grid-column-gap: 8px;
    margin: .5rem auto;
    min-width: 320px;
    max-width: 479px;
    ${media.tabletMini`min-width: 470px; max-width: 750px; margin: 1rem auto;`}
    ${media.tablet`width: 41.7rem; max-width: 1024px;`}
    ${media.laptop`width: 41.7rem;`}
  }
  .postButton {
    height: 3.5rem;
    margin-left: -1rem;
    ${media.tabletMini`margin-left: 0; height: 4rem;`}
    color: #606060;
    border: solid 1px ${Colors.lightGray};
    background: #fff;
    background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ededed));
    background: -moz-linear-gradient(top, #fff, #ededed);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ededed');
  }
  .postButton:hover {
    background: #ededed;
    background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#dcdcdc));
    background: -moz-linear-gradient(top, #fff, #dcdcdc);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#dcdcdc');
  }
  .postButton:active {
    color: #999;
    background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#fff));
    background: -moz-linear-gradient(top, #ededed, #fff);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#ffffff');
  }
  button {
    cursor: pointer;
  }
  textarea {
    border: solid 1px ${Colors.lightGray};
    padding: .6rem;
    font-family: 'Arial';
    resize: none;
    height: auto;
    margin-right: 1rem;
    ${media.tabletMini`margin-right: 0;`}
  }
  textarea:focus {
    outline: none;
  }
  textarea::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: .8rem;
  }
`;

const Comments = ({ comments, songId, modal, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.userReducer).token;
  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);

  const [newComment, setNewComment] = useState({
    newContent: ''
  });
  const { newContent } = newComment;

  const handleCommentChange = (e) => {
    if (!token) {
      handleNotice(true);
      handleMessage('???????????? ????????? ??????????????????');
    } else if (e.target.value.length > 300) {
      handleNotice(true);
      handleMessage('????????? 300??? ????????? ??????????????????');
    } else {
      setNewComment({
        ...newComment,
        newContent: e.target.value
      });
    }
  };

  const waitTime = 60000; // 1 minute
  const initialTime = localStorage.getItem('initialTime');

  const handlePostClicked = () => {
    if (!token) {
      handleNotice(true);
      handleMessage('???????????? ????????? ??????????????????.');
    } else if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      modal();
    } else if (!initialTime || parseInt(initialTime, 10) + waitTime - new Date().getTime() < 0) {
      // console.log('nickname: ', information.nickname, 'content: ', newComment);
      if (newContent.length > 300) {
        handleNotice(true);
        handleMessage('????????? 300??? ????????? ??????????????????');
      } else if (newContent.length === 0) {
        handleNotice(true);
        handleMessage('????????? ??????????????????');
      } else {
        axios
          .post(
            process.env.REACT_APP_API_URL + '/comment',
            {
              songId: songId,
              content: newContent
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then((res) => {
            if (res.status === 200) {
              // ???????????????????????? ?????? ?????? ?????? ??????
              localStorage.setItem('initialTime', new Date().getTime());
              setNewComment({
                newContent: ''
              });
              window.location.replace(`/song:id=${songId}`);
            }
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.status === 409) {
              handleNotice(true);
              handleMessage('????????? ?????? ???????????? ??? ????????????');
            } else if (err.response.data.message === 'Already reached the limit') {
              handleNotice(true);
              handleMessage('????????? ??? ?????? 50?????? ???????????????');
            }
          });
      }
    } else {
      handleNotice(true);
      handleMessage('????????? ????????? ?????? 1?????? ????????? ???????????? ?????? ??? ?????? ??????????????????');
      setNewComment({
        ...newComment,
        newContent: ''
      });
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='counter'>?????? {comments.length}</div>
      <div className='comments-container'>
        <div className='comments-input-container'>
          <textarea
            className='write-comment'
            placeholder='300??? ?????? ?????? ??????'
            onChange={handleCommentChange}
            value={newContent || ''}
          />
          <button className='postButton' type='submit' onClick={handlePostClicked}>
            ??????
          </button>
        </div>
      </div>
      <CommentPagination
        songId={songId}
        totalComments={comments}
        modal={modal}
        handleMessage={handleMessage}
        handleNotice={handleNotice}
      />
    </Wrapper>
  );
};

export default Comments;

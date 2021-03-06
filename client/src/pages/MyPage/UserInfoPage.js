import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import { media } from '../../components/utils/_media-queries';
import { Colors } from '../../components/utils/_var';
import { changeHeader, userEdit } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Typewriter from 'typewriter-effect';

axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .main {
    display: inline-block;
    min-height: calc(100vh - 62.39px - 129px);
    ${media.tablet`display: flex`};
    ${media.tabletMini`min-height: calc(100vh - 62.39px - 116px)`};
    ${media.tablet`min-height: calc(100vh - 62.39px - 71px)`};
    ${media.laptop`min-height: calc(100vh - 62.39px - 61px)`};
  }
  .container {
    width: 100%;
    margin: auto 5rem auto 0;
    padding-top: 2rem;
    ${media.tabletMini`max-width: 750px; margin: auto;`}
    ${media.tablet`margin: 1rem 5rem; width: 30rem;`} 
    ${media.laptop`margin: .8rem 7rem;`}
    ${media.large`margin: .8rem auto; width: 100%; padding-left: 3rem;`}
    /* background-color: yellow; */
  }
  .greeting {
    /* font-family: 'Arial'; */
    text-align: center;
    font-size: 1.1rem;
    color: ${Colors.black};
    display: none;
    ${media.tablet`display: block; text-align: left; font-size: 1.3rem; margin: 1rem 3.1rem;`}
    ${media.laptop`margin: 1rem 5rem;`}
  }
  .mypage-container {
    width: 17.5rem;
    margin: 1rem auto;
    ${media.tablet`margin: 1rem 3rem;`}
    ${media.laptop`margin: 1rem 5rem;`}
  }
  .id-number {
    position: absolute;
    padding: 0.4rem 0.1rem;
    margin: 0.2rem;
    color: ${Colors.mediumGray};
    /* font-family: 'Arial'; */
    font-size: 0.8rem;
    ${media.tabletMini`font-size: .85rem; padding: .5rem .2rem;`}
  }
  input {
    width: 15.5rem;
    height: 2rem;
    padding: 0.5rem;
    padding-left: 1rem;
    background-color: #f2f2f2;
    border: none;
    border-radius: 15px;
    /* font-family: 'Arial'; */
    font-size: 0.85rem;
    ${media.tabletMini`width: 17rem; margin: .2rem auto; font-size: .9rem;`}
  }
  input::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: 0.85rem;
    ${media.tabletMini`font-size: .9rem;`}
  }
  input:focus {
    outline: none;
  }
  input:disabled {
    background: ${Colors.lightGray};
    color: ${Colors.gray};
  }
  button {
    cursor: pointer;
    margin: 1.5rem 0.8rem;
    padding: 0.5rem 1.2rem;
    border: 2px solid ${Colors.pastelPurple};
    background-color: ${Colors.pastelPurple};
    font-size: 0.85rem;
    ${media.tabletMini`font-size: .9rem;`}
    color: white;
    transition: 0.5s ease-in-out;
  }
  button:hover {
    background-color: ${Colors.purple};
    border-color: ${Colors.purple};
    color: white;
  }
  button:last-of-type {
    border: 2px solid ${Colors.black};
    background-color: ${Colors.black};
    color: white;
  }
  button:last-of-type:hover {
    background-color: white;
    color: ${Colors.black};
    border: 2px solid ${Colors.black};
  }
`;

const MyPageField = styled.div`
  margin: 0.7rem auto 0.15rem;
  padding-left: 0.2rem;
  text-align: left;
  color: ${Colors.darkGray};
  font-size: 0.9rem;
  /* font-family: 'Arial'; */
  margin: 0.7rem 1rem 0.15rem;
  ${media.tabletMini`margin: .7rem auto .15rem;`}

  &:first-of-type {
    padding-top: 1rem;
  }
`;

const AlertMessage = styled.div`
  color: red;
  /* font-family: 'Arial'; */
  padding-left: 0.9rem;

  &:not(:last-of-type) {
    text-align: left;
    font-size: 0.8rem;
  }
  &:last-of-type {
    margin: 0 auto;
    font-size: 0.95rem;
  }
`;

const Mypage = ({ modal, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.userReducer).token;
  const { nickname, email, birthYear, kakao } = useSelector((state) => state.userReducer).userInfo;
  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);
  const [checkNickname, setCheckNickname] = useState('ok');
  const [checkPassword, setCheckPassword] = useState('ok');
  const [checkBirthYear, setCheckBirthYear] = useState('ok');
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  const [myInfo, setMyInfo] = useState({
    nickname: '',
    email: email,
    password: '',
    passwordRetype: '',
    birthYear: birthYear,
    kakao: kakao
  });

  const id = nickname.split('#')[1];

  const handleInputValue = (key) => (e) => {
    setMyInfo({ ...myInfo, [key]: e.target.value || '' });
  };

  const isValidNickname = (e) => {
    const regExpSpec = /[~!@#$%^&*()_+|<>?:{}`,.=]/;
    const regExpKor = /[???-???|???-???]/;
    if (e.target.value.length === 0) {
      if (checkRetypePassword || checkBirthYear === 'ok') {
        setCheckNickname('ok');
        setErrorMsg('');
      } else {
        setCheckNickname('???????????? ??????????????????.');
      }
    } else if (regExpKor.test(e.target.value)) {
      setCheckNickname('????????? ?????? ????????? ???????????????');
    } else if (regExpSpec.test(e.target.value)) {
      setCheckNickname('??????????????? ???????????? ????????????.');
    } else if (e.target.value.search(/\s/) !== -1) {
      setCheckNickname('????????? ???????????? ????????????');
    } else if (e.target.value.length < 2 || e.target.value.length > 8) {
      setCheckNickname('???????????? 2-8????????????');
    } else {
      setCheckNickname('ok');

      if (myInfo.password === '' && myInfo.passwordRetype === '') {
        setCheckPassword('ok');
        setCheckRetypePassword(true);
      }
    }
  };

  const isValidPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;

    if (e.target.value === '') {
      if (myInfo.passwordRetype === '' && checkNickname !== 'ok') {
        setCheckPassword('empty');
        setCheckRetypePassword(true);
      } else if (myInfo.passwordRetype === '' && checkNickname === 'ok') {
        setCheckPassword('ok');
        setCheckRetypePassword(true);
        setErrorMsg('');
      } else {
        setCheckPassword('empty');
        setCheckRetypePassword(false);
      }
    } else if (e.target.value !== '') {
      if (myInfo.passwordRetype === e.target.value) {
        setCheckRetypePassword(true);
      } else if (myInfo.passwordRetype !== '' && myInfo.passwordRetype !== e.target.value) {
        setCheckRetypePassword(false);
      }
      if (!regExp.test(e.target.value)) {
        setCheckPassword('no');
      } else {
        setCheckPassword('ok');
      }
    } else {
      setCheckPassword('no');
    }
    // console.log('password :', regExp.test(e.target.value));
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== '' && e.target.value === myInfo.password) {
      setCheckRetypePassword(true);
      // ??????????????? ???????????? ??????????????? ???????????? ????????? ????????????
      if (checkNickname === '???????????? ??????????????????.') {
        setCheckNickname('ok');
      }
    } else if (e.target.value === '' && myInfo.password === '') {
      setCheckRetypePassword(true);
    } else if (e.target.value === myInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };
  // ????????? ????????? ?????? && ????????? ?????? ????????????
  const isValidBirthYear = (e) => {
    const today = new Date();
    const year = today.getFullYear();

    if (checkBirthYear === 'ok' && checkNickname === '???????????? ??????????????????.') {
      setCheckNickname('ok');
      setErrorMsg('');
    }
    if (e.target.value === '' && checkNickname === 'ok') {
      setCheckBirthYear('ok');
    } else if (Number(e.target.value) >= 1921 && Number(e.target.value) <= year) {
      setCheckBirthYear('ok');
    } else if (isNaN(Number(e.target.value))) {
      setCheckBirthYear('nan');
    } else {
      setCheckBirthYear('no');
    }
  };

  const inputCheck = (key) => (e) => {
    handleInputValue(key)(e);
    setErrorMsg('');
    if (key === 'nickname') {
      isValidNickname(e);
    }
    if (key === 'password') {
      isValidPassword(e);
    }
    if (key === 'birthYear') {
      isValidBirthYear(e);
    }
    if (key === 'passwordRetype') {
      handleCheckPassword(e);
    }
  };

  const handleEditUserRequest = () => {
    // console.log(myInfo);
    if (myInfo.passwordRetype !== myInfo.password) {
      setCheckRetypePassword(false);
    }
    // console.log(checkPassword, checkRetypePassword,checkNickname, checkBirthYear)
    if (kakao && !birthYear && !myInfo.birthYear && myInfo.nickname === '') {
      setErrorMsg('????????? ????????? ??????????????????.');
    } else if (kakao && birthYear && myInfo.nickname === '') {
      setErrorMsg('????????? ????????? ??????????????????.');
    } else if (!kakao && myInfo.nickname === '' && myInfo.password === '') {
      setErrorMsg('????????? ????????? ??????????????????.');
    } else if (
      checkPassword !== 'ok' ||
      !checkRetypePassword ||
      checkNickname !== 'ok' ||
      checkBirthYear !== 'ok'
    ) {
      setErrorMsg('????????? ????????? ???????????? ??????????????????.');
    } else {
      if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
        modal();
      } else {
        axios
          .patch(process.env.REACT_APP_API_URL + '/user-info', myInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status === 200) {
              handleNotice(true);
              handleMessage('??????????????? ?????????????????????.');
              if (myInfo.nickname === '') {
                myInfo.nickname = nickname;
              } else {
                myInfo.nickname = myInfo.nickname + `#${id}`;
              }
              if (myInfo.password === '') {
                myInfo.password = '';
              }
              dispatch(userEdit(myInfo, token));
              localStorage.setItem('userinfo', JSON.stringify(myInfo));
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  };

  const handleWithdrawalRequest = () => {
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      modal();
    } else {
      handleNotice(true);
      handleMessage('?????? ?????? ???????????????????');
    }
  };

  return (
    <Wrapper>
      <div className="main">
        <SideNav />
        <div className="container">
          <div className="greeting">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${nickname.split('#')[0]} ???, ???????????????!`)
                  .pauseFor(1000)
                  .start();
              }}
            />
            {/* <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`???????????????????????? ???, ???????????????!`)
                  .pauseFor(1000)
                  .start();
              }}
            /> */}
          </div>
          <div className="mypage-container">
            <MyPageField>?????????</MyPageField>
            <input
              type="text"
              placeholder={nickname.split('#')[0]}
              onChange={inputCheck('nickname')}
            />
            <span className="id-number">#{nickname.split('#')[1]}</span>
            <AlertMessage>{checkNickname === 'ok' ? null : checkNickname}</AlertMessage>
            <MyPageField>?????????</MyPageField>
            <input disabled value={email} />
            <MyPageField>????????????</MyPageField>
            <input
              disabled={kakao ? 'disabled' : null}
              type="password"
              placeholder="??????/?????? ?????? 8~10??????"
              onChange={inputCheck('password')}
            />
            <AlertMessage>
              {checkPassword === 'no' ? '????????? ???????????? ????????? ????????????.' : null}
              {checkPassword === 'empty' ? '??????????????? ??????????????????.' : null}
            </AlertMessage>
            <MyPageField>???????????? ??????</MyPageField>
            <input
              disabled={kakao ? 'disabled' : null}
              type="password"
              onChange={inputCheck('passwordRetype')}
            />
            <AlertMessage>
              {checkRetypePassword ? null : '??????????????? ???????????? ????????????'}
            </AlertMessage>
            <MyPageField>????????????</MyPageField>
            {kakao && !birthYear ? (
              <>
                <input onChange={inputCheck('birthYear')} />
                <AlertMessage>
                  {checkBirthYear === 'no' ? '????????? ???????????? ??????????????? ??????????????????' : null}
                  {checkBirthYear === 'nan' ? '????????? ??????????????????' : null}
                </AlertMessage>
              </>
            ) : (
              <input disabled value={birthYear} />
            )}
            <button onClick={handleEditUserRequest}>????????????</button>
            <button onClick={handleWithdrawalRequest}>????????????</button>
            <AlertMessage>{errorMsg}</AlertMessage>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Mypage;

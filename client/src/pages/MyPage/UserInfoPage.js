import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import { media } from '../../components/utils/_media-queries';
import { Colors } from '../../components/utils/_var';
import { changeHeader, userEdit } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Typewriter from 'typewriter-effect';
<<<<<<< HEAD
=======

>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .main {
<<<<<<< HEAD
    display: flex;
    min-height: calc(100vh - 41px - 56px);
  }
  .container {
    width: 25rem;
    margin: 2rem auto;
    ${media.tabletMini`margin: 1rem auto; width: 28rem;`}
    ${media.tablet`margin: 1rem 7rem; width: 30rem;`} 
    /* margin: 2rem auto;
    ${media.tabletMini`width: margin: 1rem 5rem;`}
    ${media.tablet`width: margin: 1rem 7rem;`} */
    /* background-color: yellow; */
=======
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
    ${media.tablet`margin: 1rem 3rem; width: 30rem;`} 
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }
  .greeting {
    font-family: 'Arial';
    margin: 1rem auto;
<<<<<<< HEAD
    padding-left: .5rem;
    text-align: center;
    ${media.tabletMini`margin: 1rem 5rem; text-align: left; padding-left: 0;`}
    ${media.tablet`margin: 1rem 5rem; text-align: left;`}
    ${media.tablet`margin: 1rem 5rem; text-align: left;`}
    font-size: 1.3rem;
=======
    /* padding-left: 2.4rem; */
    text-align: center;
    font-size: 1.1rem;
    ${media.tabletMini`margin: 1rem 5rem;`}
    ${media.tablet`text-align: left; font-size: 1.3rem;`}
  }
  .mypage-container {
    width: 17rem;
    margin: 1rem auto;
    ${media.tabletMini`margin: 1rem 5rem;`}
    /* background-color: pink; */
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }
  .mypage-container {
    width: 17rem;
    margin: 1rem auto;
    ${media.tabletMini`margin: 1rem 5rem;`}
    /* background-color: pink; */
  }
  .id-number {
    position: absolute;
    padding: .4rem .1rem;
    margin: .2rem;
    color: ${Colors.gray};
    font-family: 'Arial';
    font-size: .8rem;
    ${media.tabletMini`font-size: .9rem; padding: .4rem .2rem;`}
  }
  input {
<<<<<<< HEAD
    width: 17rem;
    height: 1.8rem;
    margin: .2rem auto;
=======
    width: 14rem;
    /* margin-left: -2.2rem; */
    ${media.tabletMini`width: 17rem; margin: .2rem auto;`}
    height: 2rem;
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    padding: .5rem;
    padding-left: 1rem;
    background-color: #f2f2f2;
    border: none;
    border-radius: 15px;
    font-family: 'Arial';
  }
  input::-webkit-input-placeholder {
    color: ${Colors.gray};
  }
  input:focus {
    outline: none;
  }
  input:disabled {
    background: ${Colors.lightGray};
    color: ${Colors.gray};
  }
  button {
    margin: 1.5rem .8rem;
    padding: .5rem 1.2rem;
    border: 2px solid ${Colors.pastelPurple};
    background-color: ${Colors.pastelPurple};
<<<<<<< HEAD
=======
    color: white;
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    transition: 0.5s ease-in-out;
  }
  button:hover {
    cursor: pointer;
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
  margin: .7rem auto .15rem;
<<<<<<< HEAD
  text-align: left;
  color: ${Colors.black};
  font-size: .95rem;
  font-family: 'Arial';
  
=======
  padding-left: .2rem;
  text-align: left;
  color: ${Colors.darkGray};
  font-size: .9rem;
  font-family: 'Arial';
  margin: .7rem 1.5rem .15rem;
  ${media.tabletMini`margin: .7rem auto .15rem;`}

>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  &:first-of-type {
    padding-top: 1rem;
  }
`;

const AlertMessage = styled.div`
  color: red;
  font-family: 'Arial';
  padding-left: .9rem;

  &:not(:last-of-type){
    text-align: left;
    font-size: .8rem;
  }
  &:last-of-type {
    margin: 0 auto; 
    font-size: .95rem;
  }
`;

<<<<<<< HEAD
// const Mypage = ({ afterWithdrawal }) => {
=======
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
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

<<<<<<< HEAD
  // useEffect(() => dispatch(changeHeader([true, false])), [dispatch]);
=======
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
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
    const regExpKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    if (e.target.value.length === 0) {
      if (checkRetypePassword || checkBirthYear === 'ok') {
        setCheckNickname('ok');
        setErrorMsg('');
      } else {
        setCheckNickname('닉네임을 입력해주세요.');
      }
    } else if (regExpKor.test(e.target.value)) {
      setCheckNickname('올바른 한글 형식을 따라주세요');
    } else if (regExpSpec.test(e.target.value)) {
      setCheckNickname('특수문자를 포함하면 안됩니다.');
    } else if (e.target.value.search(/\s/) !== -1) {
      setCheckNickname('공백을 포함하면 안됩니다');
    } else if (e.target.value.length < 2 || e.target.value.length > 8) {
      setCheckNickname('닉네임은 2-8자입니다');
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
      // 비밀번호를 완벽하게 입력했다면 닉네임을 수정할 필요없음
      if (checkNickname === '닉네임을 입력해주세요.') {
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
  // 올바른 닉네임 입력 && 카카오 생년 비어있음
  const isValidBirthYear = (e) => {
    const today = new Date();
    const year = today.getFullYear();

    if (checkBirthYear === 'ok' && checkNickname === '닉네임을 입력해주세요.') {
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
      setErrorMsg('변경할 정보를 입력해주세요.');
    } else if (kakao && birthYear && myInfo.nickname === '') {
      setErrorMsg('변경할 정보를 입력해주세요.');
    } else if (!kakao && myInfo.nickname === '' && myInfo.password === '') {
      setErrorMsg('변경할 정보를 입력해주세요.');
    } else if (
      checkPassword !== 'ok' ||
      !checkRetypePassword ||
      checkNickname !== 'ok' ||
      checkBirthYear !== 'ok'
    ) {
      setErrorMsg('변경할 정보를 올바르게 입력해주세요.');
    } else {
      // console.log('user info has sent to the server');
      if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
        // alert('토큰이 만료되었습니다');
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
              // alert('회원정보가 수정되었습니다.');
              handleNotice(true);
              handleMessage('회원정보가 수정되었습니다.');
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
<<<<<<< HEAD
            window.location.replace('/myinfo');
=======
            // window.location.replace('/myinfo');
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
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
<<<<<<< HEAD
      axios
        .delete(process.env.REACT_APP_API_URL + '/withdrawal', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.status === 200) {
            // alert('회원탈퇴가 완료되었습니다.');
            handleNotice(true);
            handleMessage('회원탈퇴가 완료되었습니다.');
            // afterWithdrawal();

            history.push({
              pathname: '/mainpage'
            });
          }
          localStorage.clear();
        });
=======
      handleNotice(true);
      handleMessage('정말 탈퇴 하시겠습니까?');
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    }
  };

  return (
    <Wrapper>
      <div className='main'>
<<<<<<< HEAD
        {/* <SideNav /> */}
        <div className='container'>
          <div className='greeting'>
            {/* {nickname.split('#')[0]} 님, 반갑습니다! */}
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${nickname.split('#')[0]} 님, 반갑습니다!`)
                  // .typeString(`여덟글자닉네임임 님, 반갑습니다!`)
                  .pauseFor(1000)
                  .start();
              }}
            />
=======
        <SideNav />
        <div className='container'>
          <div className='greeting'>
            {/* <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${nickname.split('#')[0]} 님, 반갑습니다!`)
                  .pauseFor(1000)
                  .start();
              }}
            /> */}
            {/* <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`닉네임여덟글자임 님, 반갑습니다!`)
                  .pauseFor(1000)
                  .start();
              }}
            /> */}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
          </div>
          <div className='mypage-container'>
            <MyPageField>닉네임</MyPageField>
            <input
              type='text'
              placeholder={nickname.split('#')[0]}
              onChange={inputCheck('nickname')}
            />
<<<<<<< HEAD
            <span className='id-number'>
              #{nickname.split('#')[1]}
            </span>
            <AlertMessage>
              {checkNickname === 'ok' ? null : checkNickname}
            </AlertMessage>
            <MyPageField>이메일</MyPageField>
            <input
              disabled
              value={email}
            />
=======
            <span className='id-number'>#{nickname.split('#')[1]}</span>
            <AlertMessage>{checkNickname === 'ok' ? null : checkNickname}</AlertMessage>
            <MyPageField>이메일</MyPageField>
            <input disabled value={email} />
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
            <MyPageField>비밀번호</MyPageField>
            <input
              disabled={kakao ? 'disabled' : null}
              type='password'
              placeholder='영문/숫자 조합 8~10글자'
              onChange={inputCheck('password')}
            />
            <AlertMessage>
              {checkPassword === 'no' ? '올바른 비밀번호 형식이 아닙니다.' : null}
              {checkPassword === 'empty' ? '비밀번호를 입력해주세요.' : null}
            </AlertMessage>
            <MyPageField>비밀번호 확인</MyPageField>
            <input
              disabled={kakao ? 'disabled' : null}
              type='password'
              onChange={inputCheck('passwordRetype')}
            />
            <AlertMessage>
              {checkRetypePassword ? null : '비밀번호가 일치하지 않습니다'}
            </AlertMessage>
            <MyPageField>출생년도</MyPageField>
            {kakao && !birthYear
<<<<<<< HEAD
              ? <>
                <input
                  onChange={inputCheck('birthYear')}
                />
                <AlertMessage>
                  {checkBirthYear === 'no' ? '올바른 범위내의 출생년도를 입력해주세요' : null}
                  {checkBirthYear === 'nan' ? '숫자만 입력해주세요' : null}
                </AlertMessage>
                </>
              : <input
                  disabled
                  value={birthYear}
                />}
            <button onClick={handleEditUserRequest}>
              정보수정
            </button>
            <button onClick={handleWithdrawalRequest}>
              회원탈퇴
            </button>
=======
              ? (
                <>
                  <input onChange={inputCheck('birthYear')} />
                  <AlertMessage>
                    {checkBirthYear === 'no' ? '올바른 범위내의 출생년도를 입력해주세요' : null}
                    {checkBirthYear === 'nan' ? '숫자만 입력해주세요' : null}
                  </AlertMessage>
                </>
                )
              : (
                <input disabled value={birthYear} />
                )}
            <button onClick={handleEditUserRequest}>정보수정</button>
            <button onClick={handleWithdrawalRequest}>회원탈퇴</button>
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
            <AlertMessage>{errorMsg}</AlertMessage>
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

export default Mypage;

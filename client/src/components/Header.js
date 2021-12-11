import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeaderSearchbar from './HeaderSearchbar';
import { userLogout } from '../redux/action';
import axios from 'axios';
import { media } from './utils/_media-queries';
import { Colors } from '../components/utils/_var';
import Logo from '../images/logo.png';
axios.defaults.headers.withCredentials = true;

const HeaderWrapper = styled.div`
  button:focus {
    outline: none;
  }
  .header {
    display: grid;
    height: 3.9rem;
    width: 100vw;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(150, 150, 150, 0.2);
    grid-template-areas: 'logo recommend search pages';
    grid-template-columns: 20% 27% 23% 30%;
    ${media.tabletMini`grid-template-areas: 'logo logo search pages'`}
    ${media.tabletMini`grid-template-columns: 15% 15% 40% 30%;`}
    ${media.tablet`grid-template-columns: 15% 15% 50% 20%;`}

    /* background-color: lavenderblush;
    ${media.tabletMini`background-color: lavender;`}
    ${media.tablet`background-color: orchid;`}
    ${media.laptop`background-color: lime;`} */

  }
  .header-container-1 {
    grid-area: logo;
    text-align: left;
    width: 100%;
    padding-left: .5rem;
    max-width: 8rem;
    ${media.tabletMini`padding-left: 1rem;`}
    ${media.tablet`width: 8rem; padding-left: 1.2rem;`}
    ${media.tablet`width: 7rem; padding-left: 1.2rem;`}
    /* background-color: lightsteelblue; */
  }
  .header-container-2 {
    grid-area: recommend;
    width: 100%;
    max-width: 10rem;
    margin-left: 0rem;
    ${media.tabletMini`grid-area: logo; margin-left: 7.2rem; width: 6rem; margin-top: -.2rem;`}
    ${media.tablet`grid-area: logo; margin-left: 8rem; width: 6rem; margin-top: -.2rem;`}
    text-align: left;
    /* background-color: lavender; */
  }
  .header-container-3 {
    grid-area: search;
    text-align: right;
    padding-top: .4rem;
    justify-self: end;
    text-align: right;
    ${media.tabletMini`width: 5rem`}
    ${media.tabletMini`padding-top: .2rem; margin-top: .1rem;`}
    ${media.tablet`text-align: center; padding-top: .1rem; width: 100%;`}
    /* background-color: yellow; */
  }
  .header-container-4 {
    grid-area: pages;
    justify-self: end;
    width: 100%;
    padding-right: 0;
    margin-top: -.2rem;
    /* ${media.tabletMini`width: margin-right: 1rem`} */
    ${media.tablet`width: 11rem; padding-right: 1rem; width: 100%;`}
    /* background-color: lavenderblush; */
  }
  a {
    text-decoration: none;
  }
  .logo {
    font-size: 1.2rem;
  }
  .logo-image {
    padding-left: .7rem;
    padding-top: .2rem;
    width: 4.75rem;
    ${media.tabletMini`width: 5rem;`}
  }
  .btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .recommend-page {
    color: ${Colors.darkGray};
    font-size: .8rem;
    font-family: 'Noto Sans KR', sans-serif;
    ${media.tabletMini`font-size: .85rem;`}
    ${media.tablet`font-size: .9rem;`}
    ${media.laptop`font-size: .9rem;`}
  }
  .login,
  .logout,
  .signup,
  .mypage {
    font-size: .65rem;
    font-family: 'Noto Sans KR', sans-serif;
    padding-left: .2rem;
    ${media.tabletMini`font-size: .8rem; margin: 0 0 0 .5rem; padding-left: .1rem;`}
    ${media.tablet`padding-left: .2rem;`}
    margin-right: 0;
    color: ${Colors.gray};
  }
  button:hover {
    color: ${Colors.pastelPurple};
  }
  .display-none {
    display: none;
  }
`;

<<<<<<< HEAD
function Header({ login, signup, modal, handleMessage, handleNotice, handleMediaState, barState, handleBarState, resBarState }) {
=======
function Header ({ login, signup, modal, handleMessage, handleNotice, handleMediaState, handleSongMediaState, handleSongBarState, barState, handleBarState, resBarState }) {
>>>>>>> 34a712fcceeee8e7009561987ad05196db313fd1
  const isLogin = useSelector((state) => state.userReducer).token;
  const headerState = useSelector((state) => state.headerReducer);
  const dispatch = useDispatch();

  const handleLogoutRequest = () => {
    const token = localStorage.getItem('accessToken');
    const accessTokenTime = localStorage.getItem('accessTokenTime');
    const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);
    const logoutUrl = process.env.REACT_APP_API_URL + '/logout';
    const logoutConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const logoutData = { data: null };
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      modal();
    } else {
      axios
        .post(logoutUrl, logoutData, logoutConfig)
        .then((res) => {
          dispatch(userLogout(res));
          localStorage.clear();
          handleNotice(true);
          handleMessage('로그아웃 성공!');
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <HeaderWrapper>
      <div className='header'>
        <div className='header-container-1'>
          <Link to='/mainpage' onClick={() => { handleSongMediaState(); handleSongBarState(); }}>
            <div className='logo'>
              <img src={Logo} className='logo-image' alt='m4m-logo' />
            </div>
          </Link>
        </div>
        <div className='header-container-2'>
          <Link to='/recommendpage'>
            <button className={headerState.recommendBtn ? 'btn recommend-page' : 'display-none'}>
              노래 추천
            </button>
          </Link>
        </div>
        <div className='header-container-3'>
          <HeaderSearchbar
            isRecommend={headerState.searchBar}
            handleMediaState={handleMediaState}
            barState={barState}
            handleBarState={handleBarState}
            resBarState={resBarState}
            handleMessage={handleMessage}
            handleNotice={handleNotice}
          />
        </div>
        <div className='header-container-4'>
          {!isLogin
            ? (
              <button className='btn login' onClick={login}>
                로그인
              </button>
            )
            : (
              <button className='btn logout' onClick={handleLogoutRequest}>
                로그아웃
              </button>
            )}
          {!isLogin
            ? (
              <button className='btn signup' onClick={signup}>
                회원가입
              </button>
            )
            : (
              <Link to='/myinfo'>
                <button className='btn mypage'>
                  마이페이지
                </button>
              </Link>
            )}
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;

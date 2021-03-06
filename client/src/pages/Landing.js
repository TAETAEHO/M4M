import styled from 'styled-components';
import intro_combine from '../images/Landing/intro_combine.png';
import feature from '../images/Landing/Responsive.png';
import recommend_gif from '../images/Landing/Landing1.gif';
import song_detail_gif from '../images/Landing/Landing2.gif';
import hashtag_like_gif from '../images/Landing/Landing3.gif';
import lead_gif from '../images/Landing/lead_gif.gif';
import Separator from '../components/Separator';
import { media } from '../components/utils/_media-queries';
import { Colors } from '../components/utils/_var';
import { changeHeader } from '../redux/action';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

const LandingWrapper = styled.div`
  font-family: 'NeoDunggeunmo';
  .landing {
    min-height: calc(100vh - 41px - 56px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main-empty {
    /* border: 1px solid purple; */
    height: 128px;
    width: 100%;
    ${media.tabletMini`width: 480px;`}
    ${media.tablet`width: 768px;`}
    ${media.laptop`width: 1024px;`}
  }
  .sub-empty {
    min-height: 64px;
  }
  .content-main-empty {
    min-height: 32px;
    width: auto;
    ${media.laptop`width: 100%;`}
    ${media.laptop`min-height: 64px;`}
  }
  .content-sub-empty {
    min-height: 32px;
    height: 100%;
    width: auto;
  }
  .content,
  .section {
    margin: 8px 12px;
    width: 100%;
    ${media.tabletMini`width: 480px;`}
    ${media.tablet`width: 768px;`}
    ${media.laptop`width: 1024px;`}
  }
  .box {
    margin: 4px 6px;
    position: relative;
  }
  .btn {
    font-size: 1.25rem;
    font-weight: bolder;
    color: ${Colors.black};
    padding: 12px 16px;
    width: 100%;
    margin: 8px 0px;
    ${media.laptop`margin: 8px 16px;`}
    cursor: pointer;
    box-shadow: 4px 4px 0px ${Colors.mediumGray};
    border: 1px solid ${Colors.black};
    &:hover {
      transition-duration: 300ms;
      background-color: #caa6fe;
      color: #fffefa;
      border-color: ${Colors.mediumGray};
    }
    &:active {
      position: relative;
      transition-duration: 300ms;
      left: 3px;
      top: 3px;
      box-shadow: 1px 1px 0px ${Colors.mediumGray};
    }
  }
  .intro-1, .intro-2,
  .detail-1, .detail-2, .detail-3,
  .feature-1,
  .lead-1, .lead-2 {
    display: flex;
    flex-direction: column;
    ${media.laptop`flex-direction: row;`}
  }
  .intro-2, .lead-2 {
    padding: 16px 24px;
    justify-content: center;
  }
  .detail-2 {
    & div:nth-child(1) {
      order: 3;
      ${media.laptop`order: 1;`}
      & div:nth-child(1) {
        order: 1;
      }
      & div:nth-child(2) {
        order: 2;
      }
      & div:nth-child(3) {
        order: 3;
      }
    }
    & div:nth-child(2) {
      order: 2;
      ${media.laptop`order: 2;`}
    }
    & div:nth-child(3) {
      order: 1;
      ${media.laptop`order: 3;`}
    }
  }
  .intro-image-container,
  .detail-gif-container,
  .feature-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.tablet`min-width: 512px;`}
  }
  .intro-image-container,
  .feature-image-container {
    min-height: 384px;
  }
  .detail-gif-container {
    ${media.tablet`min-width: 564px;`}
  }
  .feature-deactive {
    display: none;
  }
  .intro-image, .faeture-image {
    max-width: 408px;
    animation: img-fadein 2000ms forwards;
    @keyframes img-fadein {
      from { 
        width: 60%; 
        opacity: 0;
        visibility: hidden;
      }
      to { 
        width: 80%; 
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .detail-gif,
  .lead-gif {
    width: 100%;
    border-radius: 10px;
    box-shadow: 4px 4px 8px gray;
  }
  .lead-gif {
    ${media.laptop`width: 500px;`}
  }
  .intro-text,
  .detail-text,
  .feature-text,
  .lead-text {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 3rem;
    font-weight: bold;
    cursor: default;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    ${media.tablet`min-width: 404px;`}
  }
  .intro-main-text,
  .detail-main-text,
  .feature-main-text,
  .lead-main-text {
    &:hover {
      animation: rainbow 2000ms steps(10) infinite;
    }
    @keyframes rainbow {     
      0% { color: #ff2a2a; }
      15% { color: #ff7a2a; }
      30% { color: #ffc52a; }
      60% { color: #2a89ff; }
      75% { color: #202082; }
      90% { color: #6b2aff; } 
      100% { color: #e82aff; }
    }
  }
  .intro-sub-text,
  .detail-sub-text,
  .lead-sub-text {
    font-size: 1.5rem;
    font-family: DOSGothic;
    line-height: 2rem;
    color: ${Colors.black};
  }
`;

function Landing () {
  const dispatch = useDispatch();
  const history = useHistory();
  const [featureImgState, setFeatureImgState] = useState('feature-deactive');

  const handleSongDetail = (e) => {
    const target = e.target.getAttribute('value');
    history.push({ pathname: `${target}` });
  };

  const handleFeatureImgState = () => {
    if (window.innerWidth >= 1401) {
      if (window.scrollY > 2200) setFeatureImgState('feature-active');
      if (window.scrollY < 1200) setFeatureImgState('feature-deactive');
    }
    if (window.innerWidth >= 1024 && window.innerWidth < 1401) {
      if (window.scrollY > 2500) setFeatureImgState('feature-active');
      if (window.scrollY < 2100) setFeatureImgState('feature-deactive');
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      if (window.scrollY > 4200) setFeatureImgState('feature-active');
      if (window.scrollY < 3800) setFeatureImgState('feature-deactive');
    }
    if (window.innerWidth >= 480 && window.innerWidth < 768) {
      if (window.scrollY > 3700) setFeatureImgState('feature-active');
      if (window.scrollY < 3300) setFeatureImgState('feature-deactive');
    }
    if (window.innerWidth >= 400 && window.innerWidth < 480) {
      if (window.scrollY > 3300) setFeatureImgState('feature-active');
      if (window.scrollY < 2900) setFeatureImgState('feature-deactive');
    }
    if (window.innerWidth < 400) {
      if (window.scrollY > 3000) setFeatureImgState('feature-active');
      if (window.scrollY < 2600) setFeatureImgState('feature-deactive');
    }
  };

  useEffect(() => window.addEventListener('scroll', handleFeatureImgState));

  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  return (
    <LandingWrapper>
      <div className='landing'>
        <div className='main-empty' />
        <div className='section intro'>
          <div className='box intro-1'>
            <div className='box intro-text'>
              <div className='box intro-main-text'>
                ?????? ?????????<br />
                ?????? ?????????<br />
                ?????? ??????!
              </div>
              <div className='box content-sub-empty' />
              <div className='box intro-sub-text'>
                ??? ?????? ????????? ??????<br />
                ???????????? ????????????????<br />
                ?????? ????????? ????????????<br />
                ???????????? ????????????,<br />
                ???????????? ??? ?????????<br />
                ????????? ???????????????? &#94;&#45;&#94;
              </div>
            </div>
            <div className='box content-main-empty' />
            <div className='box intro-image-container'>
              <img className='intro-image' src={intro_combine} alt='into_combine' />
            </div>
          </div>
          <div className='box sub-empty' />
          <div className='box intro-2'>
            <div className='btn' value='/mainpage' onClick={handleSongDetail}>????????? ?????? ????????????</div>
            <div className='btn' value='/recommendpage' onClick={handleSongDetail}>????????? ?????? ????????????</div>
          </div>
        </div>
        <Separator />
        <div className='section detail'>
          <div className='box detail-1'>
            <div className='box detail-gif-container'>
              <img className='detail-gif' src={recommend_gif} alt='example_gif' />
            </div>
            <div className='box content-main-empty' />
            <div className='box detail-text'>
              <div className='box detail-main-text'>
                #1. <br />
                ????????? ????????? <br />
                ?????????<br />
                ???????????????!<br />
              </div>
              <div className='box content-sub-empty' />
              <div className='box detail-sub-text'>
                '20?????? ??? ~ 21?????? ???'<br />
                ????????? ?????? ?????????<br />
                ???????????? ??????????????????!<br />
              </div>
            </div>
          </div>
          <div className='box sub-empty' />
          <div className='box detail-2'>
            <div className='box detail-text'>
              <div className='box detail-main-text'>
                #2.<br />
                ??? ??????<br />
                ????????? <br />
                ????????????!<br />
              </div>
              <div className='box content-sub-empty' />
              <div className='box detail-sub-text'>
                ??? ??? ??? ?????? ????????????<br />
                ????????? ????????????<br />
                ???????????????!<br />
              </div>
            </div>
            <div className='box content-main-empty' />
            <div className='box detail-gif-container'>
              <img className='detail-gif' src={song_detail_gif} alt='example_gif' />
            </div>
          </div>
          <div className='box sub-empty' />
          <div className='box detail-3'>
            <div className='box detail-gif-container'>
              <img className='detail-gif' src={hashtag_like_gif} alt='example_gif' />
            </div>
            <div className='box content-main-empty' />
            <div className='box detail-text'>
              <div className='box detail-main-text'>
                #3.<br />
                ????????? ????????????,<br />
                ????????? ????????? <br />
                ????????????!<br />
              </div>
              <div className='box content-sub-empty' />
              <div className='box detail-sub-text'>
                ????????? ?????? '??????'??????<br />
                ????????? ????????? ????????????,<br />
                ????????? ????????? ??????????????????!<br />
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className='section feature'>
          <div className='box feature-1'>
            <div className='box feature-text'>
              <div className='box feature-main-text'>
                ????????????<br />
                ???????????????<br />
                ????????? ????????????<br />
                ???????????????!
              </div>
              <div className='box content-sub-empty' />
              <div className='box lead-sub-text'>
                ?????????, ?????????, ????????????<br />
                ?????? ????????? ????????? ???????????????<br />
                ????????? ?????? ????????? ???????????????! &#62;&#95;&#60;
              </div>
            </div>
            <div className='box content-main-empty' />
            <div className='box feature-image-container'>
              <img className={`test faeture-image ${featureImgState}`} src={feature} alt='feature_example' />
            </div>
          </div>
        </div>
        <Separator />
        <div className='section lead'>
          <div className='box lead-1'>
            <div className='box lead-img'>
              <img className='lead-gif' src={lead_gif} alt='lead_gif' />
            </div>
            <div className='box content-main-empty' />
            <div className='box lead-text'>
              <div className='box lead-main-text'>
                ???????????? ?????????<br />
                ?????? ?????? ?????????<br />
                ?????? ???????????????!
              </div>
              <div className='box content-sub-empty' />
              <div className='box lead-sub-text'>
                ????????? ??? ????????????, <br />
                &#91;????????? ?????? ????????????&#93;??? <br />
                ???????????? ?????? ????????? <br />
                ????????????????<br />
                <br />
                ???(o????????o)??????
              </div>
            </div>
          </div>
          <div className='box sub-empty' />
          <div className='box lead-2'>
            <div className='btn' value='/recommendpage' onClick={handleSongDetail}>????????? ?????? ????????????</div>
          </div>
        </div>
        <div className='main-empty' />
      </div>
    </LandingWrapper>
  );
}

export default Landing;

import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { Colors } from '../../../components/utils/_var';

const Button = styled.div`
  width: 9rem;
  margin: .6rem auto 1.7rem;
  padding: .8rem 1rem;
  /* background-color: #553830; */
  color: ${Colors.black};
  background-color: ${Colors.pastelPurple};
  color: white;
<<<<<<< HEAD
  background-color: ${Colors.purple};
=======
  /* background-color: ${Colors.purple}; */
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  border-radius: 7px;
  border: none;
  font-family: 'Arial';
  font-size: .75rem;
  ${media.tablet`font-size: .8em; width: 9.5rem;`}

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${Colors.purple};
  }    
`;

const CopyButton = ({ songType, songList }) => {
  let copySongType = '나의 타입: ' + songType.name;
  let copySongList = [...songList];

  copySongList = copySongList.map((el) => el.split(',')[1]);

  copySongList = JSON.stringify(copySongList);
  copySongList = copySongList.replace(/[""{}/[^\]]+/g, '');
  copySongList = copySongList.replace(/,/g, '\n');

  copySongType += '\n\n' + '추천 노래:\n' + copySongList;

  // console.log(copySongType);
  // console.log(copySongList);

  const copyResult = text => {
    navigator.clipboard.writeText(text).then(() => {
      alert('추천 결과가 클립보드에 복사되었습니다.');
    }, () => {
      alert('복사하기가 지원되지 않는 브라우저입니다.');
    });
  };

  return (
    <Button onClick={() => copyResult(copySongType)}>
      📋 추천 결과 복사하기
    </Button>
  );
};

export default CopyButton;

import Head from 'next/head';
import { ChangeEvent, ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../firebase/authContext';
import { uploadImageToStorage } from '../../firebase/storage';

const Userinfo = () => {
  const { User, editUserInfo } = useAuth();
  const { email, displayName, photoURL } = User;

  const inputChangeImage = useRef<HTMLInputElement>(null);
  const [UserName, setUserName] = useState<string>(displayName);
  const [Loading, setLoading] = useState<boolean>(false);
  
  // 사진 변경 버튼 이벤트
  const handleChangeImage = async () => {
    inputChangeImage.current.click();
  }

  // input 내 파일 선택 후 State 에 담기
  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try{
      uploadImageToStorage(User.uid, file);
    } catch(err) {
      console.error(err);
    }
  }

  // 파일 외 다른 정보 저장
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    try{
      setLoading(true);
      editUserInfo({uid: User.uid, type: 'displayName', value: UserName});
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='inner'>
      <Head>
        <title>USER INFO - YUJOO CHAT</title>
      </Head>
      <h1>내 정보</h1>
      <form onSubmit={handleSubmit}>
        <Styled.ListWrapper>
          <Styled.ListItem className='photo'>
            <Styled.Photo>
              <img src={photoURL} alt={displayName} />
            </Styled.Photo>
            {/* <p>
              <Button type='button' className='gray'
                onClick={handleChangeImage}>
                사진 변경
              </Button>
              <Styled.InputImage
                type='file'
                accept='image/jpeg, image/png' 
                ref={inputChangeImage}
                onChange={handleImageUpload}
              />
            </p> */}
          </Styled.ListItem>
          <Styled.ListItem>
            <p>이메일</p>
            <p>{email}</p>
          </Styled.ListItem>
          <Styled.ListItem>
            <p>닉네임</p>
            <p>
              <Input type='text' value={UserName}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} />
            </p>
          </Styled.ListItem>
          <Styled.Blank />
          <Styled.ListItem className='submit'>
            <Button type='submit' className='big green' disabled={Loading}>
              저장하기
            </Button>
          </Styled.ListItem>
        </Styled.ListWrapper>
      </form>
    </div>
  )
}

export default Userinfo;

const Styled = {
  ListWrapper: styled.ul`
    height: calc(100vh - 101px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  `,
  ListItem: styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;

    input{
      text-align: right;
    }

    p:first-of-type{
      color: #00631c;
      font-weight: bold;
    }

    &.photo{
      flex-direction: column;
      justify-content: center;
      margin-bottom: 10px;
    }

    &.submit{
      justify-content: flex-end;
    }
  `,
  Photo: styled.p`
    width: 100px;
    height: 100px;
    border: 2px solid #00631c;
    border-radius: 5px;
    margin-bottom: 10px;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  InputImage: styled.input`
    display: none;
  `,
  Blank: styled.li`
    flex: 1;
  `,
}
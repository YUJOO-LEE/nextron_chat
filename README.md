# YUJOO CHAT

<img src="https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=Electron&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/> <img src="https://img.shields.io/badge/Styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

-----

<p align="center"><img src="https://i.imgur.com/Vcb7tBk.png"></p>

## 정보
- 이유주
- lllllllllee@gmail.com
- gitHub: https://github.com/YUJOO-LEE/nextron_chat
- 작업 기간 : 23/01/23 ~ 23/01/31

## 설치 및 실행

### 의존성 설치
```
yarn
```

### 실행
```
yarn dev
```

### 빌드
```
yarn build:win64
yarn build:mac
```

### 테스트용 아이디 리스트

- 아이디 `test1@test.com`  비밀번호 `123123`
- 아이디 `test2@test.com`  비밀번호 `123123`
- 아이디 `test3@test.com`  비밀번호 `123123`

## 특징

- [Nextron](https://github.com/saltyshiomix/nextron) 을 사용해 제작된 데스크탑 APP 입니다.
- Firebase Auth 로 회원가입/로그인을 기능합니다.
- Firebase Realtime DB 에 유저리스트/채팅방/메세지가 저장됩니다.

- 유저리스트    
-- `나`를 제외한 모든 유저가 출력됩니다.    
-- 우측 아이콘 클릭 시 1:1 채팅이 가능합니다.

- 그룹 채팅    
-- 방 만들기로 그룹 채팅방을 생성합니다.    
-- 리스트에 생성한 유저의 ID와 대화 수가 출력됩니다.

- 1:1 채팅 (Direct Message)    
-- 유저 리스트에서 선택하여 생성된 1:1 채팅방 목록이 출력됩니다.    
-- 새로운 방이 생성되거나, 메세지를 전송받는다면 메뉴에 빨간색으로 표시됩니다.

- 정보 수정    
-- 유저 정보(닉네임)를 수정합니다.


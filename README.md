# 🙋 OPENMIND
익명 질문 공유 서비스 "오픈마인드"를 개발하였습니다.
<br><br>

> Codeit Sprint FE 12기 - Part2 1팀<br>
배포 URL : https://12-basic-project-team1.netlify.app<br>
Copyright 2024 코드잇 Inc. All rights reserved.

<br>

## 🕰️ 개발기간
**24.12.10 - 24.12.24**
<br><br>

## 💫  팀원소개
|![title](https://avatars.githubusercontent.com/u/184628834?v=4)  | ![title](https://avatars.githubusercontent.com/u/82001503?v=4) | ![title](https://avatars.githubusercontent.com/u/184471517?v=4)  |
| --- | --- | --- |
| **<center>[🔗 이승환](https://github.com/mynameishwan)</center>** | **<center>[🔗 장호영](https://github.com/loin99)</center>** | **<center>[🔗 김혜선](https://github.com/llllliii88iiilllll)</center>** |

<br><br>

##  🖥️  프론트엔드 개발 환경

**⚒️  기술 스택**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<br><br>
**🧑‍🤝‍🧑 협업툴**
<br><br>
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![KakaoTalk](https://img.shields.io/badge/kakaotalk-ffcd00.svg?style=for-the-badge&logo=kakaotalk&logoColor=000000) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
<br><br>
**🧑‍💻 개발 툴**

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) 
<br><br>
**🚀 배포**

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

<br><br>

##  📍 팀원별 역할 분담
- 페이지별로 역할을 분담하였습니다.

### 👨‍💻 장호영
- 페이지 : 메인페이지(/), 답변페이지(answer)
- 공통 : 노션 스프린트 기능 설정, 발표 
- 기능
    - 메인페이지 : 질문 피드 생성, 로그인 기능(로컬스토리지 사용, id값 저장)
    - 답변페이지 : 답변페이지 불러오기, 답변 생성, 수정, 삭제 기능

### 👩‍💻 김혜선
- 페이지 : 목록(/list) 페이지, 메인페이지(/), 개별 피드(/post/{id}) 페이지, 답변 페이지(answer)
- 공통 : GlobalStyle 설정, 공용 컴포넌트 스타일 설정, 프로젝트 노션 설정
- 기능
  - 질문자 목록 불러오기, 페이지네이션 기능
  - 최신순/이름순 정렬 기능
   - 사용자에 따른 답변 페이지 이동 기능(로컬스토리지 사용)
  - 목록 페이지 반응형 적용
  - 목록 새로고침, 뒤로가기 버튼시 페이지 번호, 정렬 유지
  - 좋아요, 싫어요 카운트 기능
  - 질문 작성시 데이터 전달 기능
  - 스크롤 감지하여 질문 목록 더 불러오기 기능
  - 답변 등록, 수정, 삭제 기능
  - 답변 거절 기능
  - 메인페이지 이름 중복 불가 기능


### 🧑‍💻 이승환
- 페이지 : 개별 피드(/post/{id}) 페이지
- 기능
  - 질문 목록 불러오기, SNS 공유 기능
  - 답변, 미답변, 답변 거절 상태 표시 기능
  - 좋아요/싫어요 기능
  - 질문 작성 모달 기능
<br><br>
## 🏁 팀 규칙
- [규칙 상세 링크](https://buly.kr/15NvmwC)  
    - 컨벤션, PR, 데일리스크럼, KPT, 노션, 소통 규칙
<br><br>

## 👀  프로젝트 미리보기
### 1. 메인페이지
![MAIN](https://github.com/user-attachments/assets/7e9251c7-076b-46fb-823c-1fd9ca16f3bb)
-  **[질문받기]** 클릭시 입력한 이름으로 질문 대상이 생성되고 답변을 할 수 있는 페이지로 이동합니다.
- **[질문하러가기]** 클릭시 이미 생성된 질문 대상 목록 페이지로 이동합니다.
<br><br>


### 2. 질문 대상 목록 페이지
![LIST](https://github.com/user-attachments/assets/a3179bc3-5cf1-4c60-9de6-82a5344bf13b)
- 현재 만들어진 질문 대상들을 최신순, 이름순으로 볼 수 있습니다. (기본값은 최신순)
- 페이지네이션의 이전/다음 버튼은 1~5페이지를 한 세트로 이전/다음 세트로 이동합니다.
- 질문 대상의 받은 질문 개수를 확인 할 수 있고, 질문 대상을 클릭시 질문을 할 수 있는 페이지로 이동합니다.
- **[답변하러가기]** 클릭시 메인페이지에서 생성한 이름이 있다면 해당 이름의 답변 페이지로 이동합니다.
<br><br>


### 3. 질문 페이지
![FEED](https://github.com/user-attachments/assets/83f19624-733f-48c3-b670-745af64279bd)
- 현재 페이지를 링크 복사, 카카오톡/페이스북으로 공유할 수 있습니다.
- 질문 생성 날짜와 답변 생성 날짜를 확인 할 수 있습니다.
- 받은 질문의 개수를 확인할 수 있고, 답변 상태를 확인할 수 있습니다.
- 답변에 대한 좋아요/싫어요 개수를 확인할 수 있고 누를 수 있습니다.
- **[질문 작성하기]** 클릭시 질문을 작성할 수 있는 모달창이 띄워집니다.
<br><br>


### 4. 답변 페이지
![ANSWER](https://github.com/user-attachments/assets/e1e3fb55-5b13-4e50-90f2-5f193ca9c439)
- 질문에 대한 답변을 생성, 수정, 삭제할 수 있습니다.
- 질문에 대한 답변을 거절할 수 있습니다.
<br><br>


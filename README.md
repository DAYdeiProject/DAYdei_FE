## DAYDEI
  <img src="https://user-images.githubusercontent.com/122579951/232417083-9b5d22f6-6c5b-4d21-913e-e530fc5adbdb.png"> 


  
항해99 12기 A반 4조 최종프로젝트 (2023.03.10 - 2023.04.21) <br/> 
DAYDEI Front-End Repository

### 팀원 

|이름|포지션|팀원구분|Github|
|------|:---:|---|:--------:|
|정다정|FE|프론트엔드 팀장|https://github.com/daaaj|
|김준형|FE|프론트엔드 팀원|https://github.com/juninkorea95|

## 목차

- [1. 프로젝트 소개](#1-프로젝트-소개)
- [2. 프로젝트 주소](#2-프로젝트-주소)
- [3. 기술스택](#3-기술스택)
- [4. SA 및 API 명세](#4-SA-및-API-명세)
- [5. 구현기능](#5-구현기능)
- [6. 깃 컨벤션](#6-깃-컨벤션)

## 1. 프로젝트 소개

### 1) Target

- 친구나 지인들과 약속을 체계적으로 관리하고 공유하고 싶은 사람
- 취미나 관심(대외활동, 취업, 이벤트 등)있는 계정을 구독해서, 해당 정보에 대한 지식을 얻고 싶은 사람
- 본인의 캘린더를 전문성있는 구독 계정으로 키우고 싶은 사람

### 2. 목적 / 기대효과

- 원하는 관심사의 캘린더 일정을 선택한 후, 내 캘린더에 등록할 수 있기 때문에, 일일이 찾아보지 않아도 자신이 원하는 정보에 대한 접근성이 높아질 뿐만 아니라, 필요한 정보도 쉽게 찾아볼 수 있다.
- 친구나 지인들과 함께 일정을 공유하고 조율하는 과정에서 편리하고 효율적인 일정관리가 가능해진다.
- 내 캘린더를 전문성 높은 캘린더로 성장시켜, 자신의 분야에 대한 이해도도 높일 수 있다. 또한 동종업계 사람들과의 인맥을 확대할 수 있어서 경력 발전에 도움이 될 수 있고, 후에 광고 플랫폼으로도 활용할 수 있어 수익 창출이 가능해진다.

### 3.컨셉

- 대시보드 구조로, 한 눈에 콘텐츠를 확인할 수 있도록 직관적이고 깔끔한 UI
- 계층 구조가 잘 보여질 수 있도록, 머티리얼 스타일 적용
- 등록된 일정을 중요도에 따라 빠르게 파악 될 수 있게 파스텔 컬러로 표현

### 4. Pain Point

- 다른 사람들과 내 일정을 같이 공유하고 싶어요.
- 관심있는 분야들의 일정과 정보를 공유받고 소통하고 싶어요.
- 초대링크를 친구에게 보내 캘린더에서 함께 하고 싶어요.
- 중요한 일정이나 이벤트가 시작되기 전에 알림을 받고싶어요.


## 2. 프로젝트 주소

https://daydei.life

## 3. 기술스택

<div><h1>📚 STACKS</h1></div>

<div> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5a2f88?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/react--router--dom-CA4245?style=for-the-badge&logo=react-router-dom&logoColor=white"> 


</div>

## 4. SA 및 API 명세

https://www.notion.so/A-4-SA-ae22a288543d455c810012fd6ac9b3a0

## 5. 구현기능

<div align="left">
 
  <h3> 1. 로그인 및 회원 가입 </h3>
  
 <div class = "text-left">
    <p><strong>- 구현 기능</strong></p>
      <ul>
        <li>일반 로그인 / 카카오톡 로그인</li>
        <li>회원가입</li>
        <li>비밀번호 찾기(가입 이메일로 임시 비밀번호 발급)</li>
      </ul>
  </div>
  
  <img src="https://user-images.githubusercontent.com/122579951/231502711-9777ad80-8056-4ba9-9e7a-86d30888f3e6.png" width="450" height="300" />
  <img src="https://user-images.githubusercontent.com/122579951/231502938-f3350735-55a2-4433-9fca-1ed847e7a819.png" width="450" height="300"/> 
   
  ### 2. 홈 캘린더 화면
  
 <p><strong>- 구현 기능</strong></p>
  
  * 헤더 : 로고 / 네비게이션 바 (홈, 친구/구독, 찾아보기 탭으로 구성) / 알림 / 프로필 아이콘
  * 왼쪽 사이드바 (Me) : 오늘의 일정 / 업데이트한 친구 
  * 왼쪽 사이드바 (Others) : 유저 프로필 / 업데이트 된 일정 / 나와 공유한 일정
  * 메인 캘린더
  * 오른쪽 사이드바 : 메모 / 구독 캘린더 숨기기 or 표시하기
  
  <img src="https://user-images.githubusercontent.com/122579951/231508291-f4399982-6661-45c7-8978-7d605b359bc1.png" width="900"/> 
  
  ### 홈 캘린더 > 알림 / 일정 더보기 / 개별 일정 상세보기
  
  * 친구 신청 / 구독한 유저에 대한 정보를 알림으로 받을 수 있음
  * 캘린더에 표시된 하루 일정이 4개 이상일 때, 더보기를 눌러 전체 일정 확인 가능
  * 개별 일정 클릭 시, 상세 정보 확인 가능 
  
  <img src = "https://user-images.githubusercontent.com/122579951/232204191-6559d60c-bf14-4368-ac5c-e03d0cdd87c3.png" width ="250" height = "350"/>
  <img src = "https://user-images.githubusercontent.com/122579951/232204232-4ecb7634-1b14-446f-b3d5-f94302a1961f.png" width ="250" height = "350"/>
  <img src = "https://user-images.githubusercontent.com/122579951/232204247-1211f1fa-ae7d-4628-b259-051c4efaf53f.png" width ="250" height = "350"/>

  ### 홈 캘린더 > 오른쪽 사이드바 > 메모장 / 구독하는 캘린더 숨김 or 표시 
  
  * 간단한 메모 작성 가능
  * 내가 구독하는 계정의 일정 숨기기 / 표시하기 선택 가능 
  
   <img src = "https://user-images.githubusercontent.com/122579951/232204949-5f3ec0e2-2fc7-4ca9-9023-b9c23fe3f8b3.png" width ="450" height = "300"/>
   <img src = "https://user-images.githubusercontent.com/122579951/232204962-2a71d5e4-af09-4555-8bab-ebd924f5d16c.png" width ="450" height = "300"/>

 ### 3. 일정 작성/수정
  
   <p><strong>- 구현 기능</strong></p>
  
  * 일정 작성 ( 제목 / 일시 / 일정 표시 색 / 초대 유저 (태그 가능) / 장소 및 상세 / 사진(3장까지 첨부) / 공개여부로 구성
  * 작성한 일정 드래그하여 일정 날짜 변경 가능 
  * 일정 만들 때 친구 태그 가능
  * 일정에 사진 첨부 가능 (3장)
  * 작성하는 일정은 모두 공개여부 설정 가능 (전체공개 & 스크랩 허용 / 전체공개 / 친구공개 / 나만보기)

 <img src="https://user-images.githubusercontent.com/122579951/231653675-0ab97a23-a80e-4bc1-b479-704727c98304.png" width="400" height="550"/> 
 <img src="https://user-images.githubusercontent.com/122579951/231653689-a6840658-d640-4cc0-a5d6-78178bfad687.png" width="400" height="550"/> 
 
  ### 4. 친구/구독 페이지
  
    <p><strong>- 구현 기능</strong></p>
  
  * 친구, 구독 캘린더, 나를 구독하는 유저 리스트
  * 리스트 별로 기준에 따라 정렬 가능 (기본, 최신순, 오래된순, 구독자 많은 순)
  * 리스트 별로 유저 검색 가능

 <img src="https://user-images.githubusercontent.com/122579951/232203324-9cdc7950-f674-42db-a1d3-c60366b916e6.png" width="900"> 


 ### 5. 찾아보기 페이지 
  
  * 카테고리별로 유저 찾아보기 가능 
  * 유저 검색 가능 
  * 친구신청 / 구독하기 및 취소 가능 
 
  <img src="https://user-images.githubusercontent.com/122579951/232203328-b8ab4267-9d0a-4ae7-9246-4c9f472f0f09.png" width="900"> 

</div>


## 6. 깃 컨벤션

Cancel changes
-   `feat` : 새로운 기능 추가
-   `fix` : 버그 수정
-   `docs` : 문서 수정
-   `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
-   `design` : UI 변경 작업
-   `refactor` : 코드 리펙토링
-   `test` : 테스트 코드, 리펙토링 테스트 코드 추가
-   `chore` : 빌드 업무 수정, 패키지 매니저 수정
-   `commnet` : 주석의 작성이나 변경
-   `rename` : 파일, 폴더, 패키지 등의 이름만 수정하거나 옮기기만 한 경우
-   `remove` : 파일 삭제만 한 경우

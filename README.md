## DAYDEI

항해99 12기 A반 4조 최종프로젝트 (2023.03.10 - 2023.04.21) <br/>
DAYDEI Front-End Repository

### 팀원

| 이름   | 포지션 | 팀원구분        |             Github              |
| ------ | :----: | --------------- | :-----------------------------: |
| 정다정 |   FE   | 프론트엔드 팀장 |    https://github.com/daaaj     |
| 김준형 |   FE   | 프론트엔드 팀원 | https://github.com/juninkorea95 |

## 목차

- [1. 프로젝트 소개](#1-프로젝트-소개)
- [2. 프로젝트 주소](#2-프로젝트-주소)
- [3. 기술스택](#3-기술스택)
- [4. SA 및 API 명세](#4-SA-및-API-명세)
- [5. 구현기능](#5-구현기능)
- [6. Trouble Shooting](#6-Trouble-Shooting)
- [7. 깃 컨벤션](#7-깃-컨벤션)

## 1. 프로젝트 소개
<img src="https://user-images.githubusercontent.com/86552492/233780306-d2071733-d6c4-4ec6-b38a-50732d70a50e.png" />

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

<div> 
  <img src="https://img.shields.io/badge/SSE-000000?style=for-the-badge&logo=&logoColor=white"/>
  <img src="https://img.shields.io/badge/GithubActions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>
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
 
### 5-1. 로그인 및 회원 가입
  
 <div class = "text-left">
    <p><strong>- 구현 기능</strong></p>
      <ul>
        <li>일반 로그인 / 카카오톡 로그인</li>
        <li>회원가입</li>
        <li>비밀번호 찾기(가입 이메일로 임시 비밀번호 발급)</li>
      </ul>
  </div>
  
  <details>
  <summary>이미지 더보기</summary>
  
  <img src="https://user-images.githubusercontent.com/86552492/232414598-6bd1935b-2a97-4d8e-9dd0-fe5cc8fedc0a.png" />
  <img src="https://user-images.githubusercontent.com/86552492/232414742-7e56f6a9-9442-4216-8492-d022b4419856.png"/> 
  
  </details>
  
### 5-2. 홈 캘린더 화면
  
 <p><strong>- 구현 기능</strong></p>
  
  * 헤더 : 로고 / 네비게이션 바 (홈, 친구/구독, 찾아보기 탭으로 구성) / 알림 / 프로필 아이콘
  * 사이드바 (Me) : 오늘의 일정 / 업데이트한 친구 
  * 사이드바 (Others) : 유저 프로필 / 업데이트 된 일정 / 나와 공유한 일정
  * 메인 캘린더
  
  <details>
  <summary>이미지 더보기</summary>
  <img src="https://user-images.githubusercontent.com/86552492/232415052-236be325-0e5a-4985-ada7-5c9302b0e22d.png" /> 
  <img src="https://user-images.githubusercontent.com/122579951/232471680-527c5528-ef19-4dae-8729-52613f72ceea.png" /> 

  </details>
     
### 5-2-1. 홈 캘린더 > 알림 / 일정 더보기 / 개별 일정 상세보기
  
  * 친구 신청 / 구독한 유저에 대한 정보를 알림으로 받을 수 있음
  * 캘린더에 표시된 하루 일정이 4개 이상일 때, 더보기를 눌러 전체 일정 확인 가능
  * 개별 일정 클릭 시, 상세 정보 확인 가능 
  
  <details>
  <summary>이미지 더보기</summary>
  <img src = "https://user-images.githubusercontent.com/86552492/232415166-6d26877b-d2e5-41ed-b996-b1bb0bd0c3a3.png"/>
  <img src = "https://user-images.githubusercontent.com/86552492/232415255-3b0862ec-14c7-4317-8732-f69bc005996f.png"/>
  <img src = "https://user-images.githubusercontent.com/86552492/232415370-6ba359ae-c333-4ae6-b790-901e439c7206.png"/>
  </details>
     
### 5-2-2. 홈 캘린더 > 오른쪽 사이드바 > 메모장 / 구독하는 캘린더 숨김 or 표시

  - 간단한 메모 작성 가능
  - 내가 구독하는 계정의 일정 숨기기 / 표시하기 선택 가능

  <details>
  <summary>이미지 더보기</summary>
   <img src = "https://user-images.githubusercontent.com/86552492/232415513-fe69435c-1b41-4567-82fe-edc246ba92af.png"/>
   <img src = "https://user-images.githubusercontent.com/86552492/232415618-d3563e0c-53f1-4544-bce3-2ff95ff5adc6.png"/>
  </details>
      
### 5-3. 일정 작성/수정
  
  * 일정 작성 ( 제목 / 일시 / 일정 표시 색 / 초대 유저 (태그 가능) / 장소 및 상세 / 사진(3장까지 첨부) / 공개여부로 구성
  * 작성한 일정 드래그하여 일정 날짜 변경 가능 
  * 일정 만들 때 친구 태그 가능
  * 일정에 사진 첨부 가능 (3장)
  * 작성하는 일정은 모두 공개여부 설정 가능 (전체공개 & 스크랩 허용 / 전체공개 / 친구공개 / 나만보기)

  <details>
  <summary>이미지 더보기</summary>
  <img src="https://user-images.githubusercontent.com/86552492/232416137-a6488b2c-a8be-4e5d-91f3-125e148478a5.png"/> 
  <img src="https://user-images.githubusercontent.com/86552492/232416274-68b1403d-8669-45dd-8dcf-691d2f852055.png"/> 
  </details>
      
### 5-4. 친구/구독 페이지
    
  * 친구, 구독 캘린더, 나를 구독하는 유저 리스트
  * 리스트 별로 기준에 따라 정렬 가능 (기본, 최신순, 오래된순, 구독자 많은 순)
  * 리스트 별로 유저 검색 가능

  <details>
  <summary>이미지 더보기</summary>
  <img src="https://user-images.githubusercontent.com/86552492/232416358-d7270aa8-1fab-4480-a904-8bf27816cabc.png">
  </details>
      
### 5-5. 찾아보기 페이지

- 카테고리별로 유저 찾아보기 가능
- 유저 검색 가능
- 친구신청 / 구독하기 및 취소 가능

<details>
<summary>이미지 더보기</summary>
<img src="https://user-images.githubusercontent.com/86552492/232416563-e5dad8be-a621-429c-b8e0-9d66ca91a7a4.png">
</details>

</div>

## 6. Trouble Shooting 

  <details>
  <summary>[FE] 카카오톡 친구 연동하기 진행 시 토큰 이슈</summary>

<br/>
문제
 
- 카카오톡 친구 연동 api 사용시 로그인한 유저의 token과 카카오톡 redirect uri에서 받은 code를 서버에 보내고 response에 로그인한 유저의 token이 와야하는데 길이가 짧은 token이 계속 왔다. 그래서 해당 유저의 정보를 불러오지 못하는 에러가 발생하였다.

시도
 
- 값이 제대로 전달 안되는 문제일까봐 일일이 콘솔 찍어가며 값이 제대로 들어가는지 확인하였다. 
  <br/>통신도 잘 되었고 api에 필요한 값이 제대로 보내지고 있는게 확인되었다. 하지만 여전히 짧은 token이 반환되고 있었다.

해결
 
- 카카오톡 로그인시에는 token이 제대로 반환되었기 때문에 친구 연동 클릭시 다시 카카오톡 로그인을 하는 로직으로 수정하였다.

  </details>


<details>
  <summary>[FE] formData 서버로 전달 시 맞지 않는 형식 이슈</summary>

<br/>
문제
    
- 프로필 수정시 정보를 서버에 보낼때 형식이 이미지는 multipart/form-data, 다른 정보는 application/json 형식으로 보내야 했다. 
  <br/>그래서 formData 안에 정보 넣고 header에 "Content-Type": "multipart/form-data" 로 지정하고 요청했지만 400에러가 떴다. 
    
시도 

- 이전에는 string 값을 formData로 보낼때 key, value 형식에 맞게만 작성하면 서버에 잘 전달되었다. 그래서 이번에도 그렇게 하고 있었지만 
  <br/>json 형식으로 따로 지정을 해줘야된다고 해서 JSON.stringify로 감싼 후 formData로 보내봤지만 또 400에러가 떴다.
    
해결 

- 팀원분이 Blob을 이용하여 보내면 된다고 해서, blob 객체 생성 후 JSON.stringify로 서버로 요청하니깐 해결 되었다.
  
</details>

<details>
  <summary>[FE] 생일 입력 BOX 형식 이슈 </summary>

  <br/>
  문제
  
- 본래 회원 가입 페이지에서 생일 정보는 사용자가 직접 태어난 달과 날짜를 네자리 수로 적어 Input box에 적어 제출하도록 구현했다. 
  위와 같은 방식의 문제점은 생일의 형식에 벗어나는 숫자 (ex : 9999 / 0000)를 입력해도 회원가입이 허용된다는 점이었다.

  시도

- 첫 시도로는 기존의 Input box 형식을 유지하되, 입력값의 validation을 적용하려는 방향으로 잡았다. 
  하지만 이러한 방향은 입력값에 대한 조건을 다소 복잡한 방식으로 줘야했던 만큼 효율적이지 않았다. 

  해결
  
- 값을 입력하여 전달하는 방식에는 input 뿐만 아니라 select이 있다는 것을 발견하고 적용했다. 
</details>

<details>
  <summary>[FE] 버튼 연속 클릭 이슈 </summary>

<br/>
문제

- 본래 회원 가입 페이지에서 생일 정보는 사용자가 직접 태어난 달과 날짜를 네자리 수로 적어 Input box에 적어 제출하도록 구현했다. 
위와 같은 방식의 문제점은 생일의 형식에 벗어나는 숫자 (ex : 9999 / 0000)를 입력해도 회원가입이 허용된다는 점이었다.

시도

- 첫 시도로는 기존의 Input box 형식을 유지하되, 입력값의 validation을 적용하려는 방향으로 잡았다. 
하지만 이러한 방향은 입력값에 대한 조건을 다소 복잡한 방식으로 줘야했던 만큼 효율적이지 않았다. 

해결

- 값을 입력하여 전달하는 방식에는 input 뿐만 아니라 select이 있다는 것을 발견하고 적용했다. 

</details>

<details>
<summary>[FE] 404 페이지 이슈 </summary>

<br/>
문제 

- 처음에 페이지 구성할때 userId에 따라서 캘린더가 바뀌는 형식으로 경로 설정을 하였다. ( /:id ) 잘못된 경로로 접근할때, 없는 아이디로 접근했을 등 보여줄 404 페이지를 만들었는데, 
예를 들어 /15643로 없는 id로 접근 했을 때는 콘솔 에러만 나고 404페이지로 이동하지 않는 에러가 발생했다. 

시도

- useEffect로 url이 바뀔때마다 useLocation으로 id를 가져온 후, 서버와 통신 후 없는 id일때 404 페이지로 이동시키는 로직을 작성했다. 
하지만 서버와 통신하면서 loading중일때는 home 화면이 잠깐 보였다가 404 페이지로 이동되는 현상이 있었다. 
깜빡거리는 것 처럼 보여서 home page를 user 정보가 있을때만 보여지게 작성해보았지만, 여전히 똑같은 이슈가 있었다.

해결 

- 멘토님께 질문한 결과, 첫번째로 url에 userId가 보여지는게 좋지 않다해서, 이걸 먼저 수정해보고 다시 똑같은 이슈가 있는지 확인해보기로 하였다. 
그래서 url에 id를 없앤 후, 페이지를 더 나누고 없는 id나 잘못된 경로로 접근해보니 바로 404페이지로 이동하였다. 

</details>


## 7. 깃 컨벤션

Cancel changes

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `docs` : 문서 수정
- `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `design` : UI 변경 작업
- `refactor` : 코드 리펙토링
- `test` : 테스트 코드, 리펙토링 테스트 코드 추가
- `chore` : 빌드 업무 수정, 패키지 매니저 수정
- `commnet` : 주석의 작성이나 변경
- `rename` : 파일, 폴더, 패키지 등의 이름만 수정하거나 옮기기만 한 경우
- `remove` : 파일 삭제만 한 경우

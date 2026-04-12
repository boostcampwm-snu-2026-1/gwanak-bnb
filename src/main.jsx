import React from 'react';
// React는 화면을 어떻게 쪼갤지, 데이터가 바뀌면 어디를 업데이트해야 할지 고민하고 계산하는 설계자의 역할
import ReactDOM from 'react-dom/client';
// ReactDOM은 React가 "이렇게 화면 그려!"라고 설계도를 넘겨주면, 그걸 받아서 실제 웹 브라우저(HTML DOM)에 그리는 목수의 역할
// 나중에 웹사이트가 아니라 스마트폰 앱(iOS, Android)을 만들고 싶다면 설계자인 React는 그대로 둔 채, 
// 목수만 ReactDOM 대신 스마트폰 화면을 그릴 줄 아는 React Native라는 녀석으로 갈아 끼우면 됨
import App from './App.jsx';
// App.jsx 파일 안에 있는 App이라는 이름의 함수(설계도)를 여기서 쓸 수 있게 연결
// App.jsx 파일이 'default로 던져주는 그 알맹이(함수)'를 가져와서, 여기서는 App라는 이름표를 붙여서 쓰겠다는 선언
// 여기서 App는 최상위 기둥 컴포넌트
import './index.css';


// HTML에 있던 id="root"를 찾아서 그 안에 App 컴포넌트를 렌더링함
// 1단계: document.getElementById('root') --> HTML에 미리 만들어둔 텅 빈 <div id="root"></div> 상자를 찾아내서 메모리에 집어드는 과정
// 2단계: ReactDOM.createRoot(...) --> 일반 종이 상자를 React가 그림을 그릴 수 있는 '특수 캔버스(Root)'로 코팅해 주는 작업
// 3단계: .render(...) --> 이 캔버스 위에 괄호 안의 내용물을 그리라는 명령
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> // App.jsx 파일에서 만든 둥근 검색바와 전체 화면 레이아웃. 진짜 알맹이 역할
  </React.StrictMode> // 이 태그는 화면에 보이는 요소가 아니고 <App />을 감싸고 있는 일종의 '안전망 포장지' 역할.
  //  개발하는 동안 코드에 숨은 버그나 오래된 문법이 없는지 React가 두 번씩 꼼꼼하게 검사해 줌
);
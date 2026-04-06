// App.jsx
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="app-container">
      <SearchBar />
    </div>
  );
}
// 프로젝트의 가장 최상위 컴포넌트
// 컴포넌트란 사용자가 직접 태그의 이름과 모양을 발명해서 쓰도록 하는 것
// 컴포넌트 이름 첫글자는 반드시 대문자로 해야함. 그래야 HTML이 원래 가지고 있는 기본 태그와 내가 만든 태그가 구별됨

export default App;
// default는 이 파일에서 바깥으로 제공하는 대표 메뉴는 이거(App) 딱 하나라는 뜻
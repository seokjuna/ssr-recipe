/*
서버 사이드 렌더링을 할 때는 useEffect나 componentDidMount에서 설정한 작업이 호출되지 않고 
렌더링하기 전 API를 요청한 뒤 스토어에 데이터를 담아야 함
서버 환경에서 이러한 작업을 하려면 클래스형 컴포넌트가 지니고 있는 constructor 메서드를 사용하거나 
render 함수 자체에서 처리 그리고 요청이 끝날 때까지 대기했다가 다시 렌더링해 주어야 함
-> 1. PreloadContext를 만들고, 이를 사용하는 Preloader 컴포넌트를 만들어 처리
-> 2. usePreloader Hook 사용
*/

import { createContext, useContext } from "react";

// 클라이언트 환경: null
// 서버 환경: { done: false, promises: [] }
const PreloadContext = createContext(null);
export default PreloadContext;

// resolve는 함수 타입
export const Preloader = ({ resolve }) => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null; // context 값이 유효하지 않다면 아무것도 하지 않음
    if (preloadContext.done) return null; // 이미 작업이 끝났다면 아무것도 하지 않음

    // promises 배열에 프로미스 등록
    // 설령 resolve 함수가 프로미스를 반환하지 않더라도, 프로미스 취급을 하지 않기 위해
    // Promise.resolve 함수 사용
    preloadContext.promises.push(Promise.resolve(resolve()));
    return null;
};

// Hook 형태로 사용할 수 있는 함수
export const usePreloader = resolve => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null;
    if (preloadContext.done) return null;
    preloadContext.promises.push(Promise.resolve(resolve()));
};


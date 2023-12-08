import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StressResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  // state가 정의되어 있고 stressScore를 포함하는지 확인
  const stressScore = state && state.stressScore;

  const goToMainPage = () => {
    // 메인 페이지로 이동
    navigate('/home');
  };

  const goToTestPage = () => {
    // 테스트 페이지로 이동
    navigate('/mind/test');
  };

  return (
    <div className="result-container">
      <h1>xxx님의 스트레스 검사 결과</h1>
      {stressScore && <p>당신의 스트레스 점수: {stressScore}점</p>}<br />

      {/* 스트레스 점수에 따른 결과 메시지 표시 */}
      <p>점수에 따라 자가진단이 가능합니다.</p><br />
      <p>0~13점 : 당신이 느끼고 있는 스트레스 정도는 정상적인 수준으로, 심리적으로 안정되어 있습니다.</p><br />
      <p>14~16점 : 검사 결과, 약간의 스트레스를 받고 계신 것으로 보입니다. 스트레스를 해소하기 위해 운동이나 가벼운 산책, 명상 등 자신만의 스트레스 해소법을 찾아보는 것이 좋겠습니다.</p><br />
      <p>17~18점 : 검사 결과, 중간 정도의 스트레스를 받고 있는 것으로 보입니다. 스트레스를 해소하기 위해 적극적인 노력을 하실 필요가 있으며, 원하신다면 전문가에게 도움을 요청해 보십시오.</p><br />
      <p>19점 이상 : 검사 결과, 심한 스트레스를 받고 있는 것으로 나타나고 있어, 일상생활에서 어려움을 겪고 있을 가능성이 높아 보입니다. 상담센터에 방문하시어 추가적인 검사를 받아보시거나, 전문가와 자신의 상태에 대해 이야기해 볼 것을 권합니다.</p><br />

      <div className="button-container">
        <button onClick={goToMainPage}><h3>메인으로 가기</h3></button><br />
        <button onClick={goToTestPage}><h3>확인</h3></button>
      </div>
    </div>
  );
};

export default StressResult;

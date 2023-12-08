import React, { useState } from 'react';
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom';
import './test.css';

const Test = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState(null);

  const handleTest = (testType) => {
    setSelectedTest(testType);
    navigate(`/mind/test/${testType}`);
  };
  
  return (
    <div className="test-container">
      <h1>검사 선택</h1>
      <p>원하는 검사를 선택하세요:</p>

      <div className="test-buttons">
        <button onClick={() => handleTest('stress')}>Stress 검사</button>
        <button onClick={() => handleTest('depression')}>Depression 검사</button>
      </div>

      {selectedTest && (
        <div className="button-container">
          <button onClick={() => navigate(`/mind/test/${selectedTest}`)}>
            <h3>선택한 검사 시작</h3>
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;

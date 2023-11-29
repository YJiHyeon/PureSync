import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './summary.css';

function Summary(props) {
  const [menuWhenData, setMenuWhenData] = useState([]);
  const [exerciseTotalData, setExerciseTotalData] = useState([]);
  const [bodyBaseData, setBodyBaseData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    Axios.get('http://127.0.0.1:9000/api/summary/list', {
      params: {
        mem_seq: 1,
        menu_date: props.selectDate,
        el_date : props.selectDate
      },
      withCredentials: true,
    })
      .then((res) => {
        const menuTotalWhenList = res.data.data.menuTotalWhenList;
        const getBodyBase = res.data.data.getBodyBase;
        const exerciseTotalList = res.data.data.exerciseTotalList;
        const whenTotalData = {};

        menuTotalWhenList.forEach((item) => {
          const menu_when = item.menu_when;
          const when_total = item.when_total;

          whenTotalData[menu_when] = when_total;
        });
        setMenuWhenData(whenTotalData);

        if (exerciseTotalList.length > 0) {
          const el_total = exerciseTotalList[0].el_total;
          setExerciseTotalData(el_total.toFixed(2));
        } else {
          setExerciseTotalData(0);
        }

        const body_base = getBodyBase[0].body_base;
        setBodyBaseData(body_base.toFixed(2));
 
  
        setLoading(false); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.selectDate, loading]);

  // 일일 칼로리 계산 함수
  const calculateDailyCalories = () => {
    // 섭취한 칼로리 합계 (아침, 점심, 저녁, 간식)
    const consumedCaloriesSum =
    (menuWhenData[1] || 0) + (menuWhenData[2] || 0) + (menuWhenData[3] || 0) + (menuWhenData[4] || 0);
    
    // 일일 칼로리 계산: 섭취한 칼로리 - 소모한 칼로리 - 기초대사량
    const dailyCalories = consumedCaloriesSum - exerciseTotalData - bodyBaseData;

    return dailyCalories.toFixed(2);
  };


  return (
<div className="summary-container">
  <h2>요약</h2>
  <div className="summary-box">
    <h6>섭취 칼로리</h6>
    <div className="summary-item">
      <p>아침 + {menuWhenData[1] === 0 ? 0 : (menuWhenData[1] || 0)}</p>
    </div>
    <div className="summary-item">
      <p>점심 + {menuWhenData[2] === 0 ? 0 : (menuWhenData[2] || 0)}</p>
    </div>
    <div className="summary-item">
      <p>저녁 + {menuWhenData[3] === 0 ? 0 : (menuWhenData[3] || 0)}</p>
    </div>
    <div className="summary-item">
      <p>간식 +  {menuWhenData[4] === 0 ? 0 : (menuWhenData[4] || 0)}</p>
    </div>
    <hr /><p className="total">{((menuWhenData[1] || 0) + (menuWhenData[2] || 0) + (menuWhenData[3] || 0) + (menuWhenData[4] || 0))} kcal </p><br />
    <h6>소모 칼로리</h6>
    <div className="summary-item">
      <p>운동 - {exerciseTotalData || 0}</p>
    </div>
    <div className="summary-item">
      <p>기초대사량 - {bodyBaseData}</p>
    </div>
    <hr /> <p className="total">{((exerciseTotalData || 0) + bodyBaseData)} kcal </p>
    <br />
    <h5>결과</h5>
    <div className="summary-item">
      <p className="result">{calculateDailyCalories()} kcal </p>
    </div>
  </div>
</div>





  );
}

export default Summary;

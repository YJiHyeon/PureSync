import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './summary.css';
import SummaryChart from 'views/ui-components/graph/Charts/SummaryChart';


function Summary(props) {
  const [exTotal, setExTotal] = useState("");             // 운동 총 칼로리
  const [totalMenuKcal, setTotalMenuKcal] = useState(0);  // 오늘 총 섭취 칼로리
  const [menuWhenData, setMenuWhenData] = useState([]);   // 아점저간 각 칼로리
  const [bodyBaseData, setBodyBaseData] = useState([]);   // 기초대사량
  const [loading, setLoading] = useState(false);


  // 데이터 불러오기
  useEffect(() => {
    Axios.get('http://127.0.0.1:9000/api/summary/list', {
      params: {
        mem_seq: 1,
        menu_date: props.selectDate,
        el_date: props.selectDate,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        const menuTotalWhenList = res.data.data.menuTotalWhenList;
        const getBodyBase = res.data.data.getBodyBase;
        const exerciseTotalList = res.data.data.exerciseTotalList;
        const whenTotalData = {};

        menuTotalWhenList.forEach((item) => {
          const menu_when = item.menu_when;
          const when_total = item.when_total;
          whenTotalData[menu_when] = when_total;
        });

        let el_total = 0;
        if (exerciseTotalList.length > 0)
          el_total = exerciseTotalList[0].el_total;

        let cbodyBaseData = getBodyBase[0].body_base;
        let consumedCaloriesSum = (menuWhenData[1] || 0) + (menuWhenData[2] || 0) + (menuWhenData[3] || 0) + (menuWhenData[4] || 0);

        setMenuWhenData(whenTotalData);
        setExTotal(el_total.toFixed(2));
        setBodyBaseData(cbodyBaseData.toFixed(2));
        setTotalMenuKcal(consumedCaloriesSum.toFixed(2));

      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.selectDate, loading]);

  return (
    <div className="summary-container">
      <h2>요약</h2>
      <div className="summary-content">

        {/* 요약 박스 */}
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
            <p>간식 + {menuWhenData[4] === 0 ? 0 : (menuWhenData[4] || 0)}</p>
          </div>
          <hr />
          <p className="total">{((menuWhenData[1] || 0) + (menuWhenData[2] || 0) + (menuWhenData[3] || 0) + (menuWhenData[4] || 0)).toFixed(2)} kcal </p>
          <br />
          <h6>소모 칼로리</h6>
          <div className="summary-item">
            <p>운동 - {exTotal || 0}</p>
          </div>
          <div className="summary-item">
            <p>기초대사량 - {bodyBaseData}</p>
          </div>
          <hr />
          <p className="total">{(parseFloat(exTotal || 0) + parseFloat(bodyBaseData || 0)).toFixed(2)} kcal </p>
          <br />
          <h5>결과</h5>
          <div className="summary-item">
            <p className="result">
              {(
                (
                  (menuWhenData[1] || 0) +
                  (menuWhenData[2] || 0) +
                  (menuWhenData[3] || 0) +
                  (menuWhenData[4] || 0)
                ).toFixed(2) -
                (
                  parseFloat(exTotal || 0) +
                  parseFloat(bodyBaseData || 0)
                ).toFixed(2)
              ).toFixed(2)} kcal
            </p>
          </div>
        </div>

        {/* summary-chart */}
        <div className="summary-chart">
          {
            <SummaryChart 
              totalMenuKcal={totalMenuKcal}
              exerciseTotal={exTotal}
              selectDate={props.selectDate}
            />
          }
        </div>
      </div>
    </div>
  );

}

export default Summary;

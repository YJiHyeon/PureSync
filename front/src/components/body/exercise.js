import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DialogExercise from 'components/ui/Dialog/DialogExercise';


function Exercise(props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [exerciseData, setExerciseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCalories, setTotalCalories] = useState(0);

    //useNavigate
    const navigate = useNavigate();

    // 다이얼로그
    const openDialog = () => {
        setDialogOpen(true);
        setLoading(false);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        setLoading(true);
    }

    useEffect(() => {
        Axios.get('http://127.0.0.1:9000/api/exercise/list', {
            params: {
                mem_seq: 1,
                el_date: props.selectDate,
            },
            withCredentials: true
        })
            .then((res) => {
                setExerciseData(res.data.data.exerciseList);
            })
            .catch((error) => {
                console.error(error);
            });


    }, [props.selectDate, loading]);


    // 삭제 버튼
    const deleteMenuItem = (el_seq) => {
        Axios.post(`http://127.0.0.1:9000/api/exercise/delete`, {
            elSeq: el_seq,
            memSeq: 1
        })
            .then((res) => {
                //console.log( menuData.filter((item)=> item.menu_seq !== menu_seq) );
                // alert("삭제");
                setExerciseData(exerciseData.filter((item) => item.el_seq !== el_seq));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // 총 칼로리 계산 함수
    const calculateTotalCalories = () => {
        let total = 0;
        exerciseData.forEach((item) => {
            total += item.el_total;
        });
        return total.toFixed(2);
    };

    useEffect(() => {
        // exerciseData가 변경될 때마다 총 칼로리 계산
        const calculatedTotalCalories = calculateTotalCalories();
        setTotalCalories(calculatedTotalCalories);
    }, [exerciseData]);



    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: '0' }} >운동</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}></div>
                <Button
                    onClick={openDialog}
                    variant="solid"
                    style={{
                        width: '100px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    운동 등록
                </Button>
                <DialogExercise isOpen={isDialogOpen} onClose={closeDialog} selectDate={props.selectDate} />
            </div>
            <div>
                일일 총 소모 칼로리 : {totalCalories} kcal
            </div>
            <br />
            {/* 운동 리스트 */}
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>운동명</th>
                            <th style={{ textAlign: "center" }}>운동시간(분)</th>
                            <th style={{ textAlign: "center" }}>소모칼로리</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {exerciseData
                            .map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: "left" }}>{item.ec_name}</td>
                                        <td style={{ textAlign: "center" }}>{item.el_time}</td>
                                        <td style={{ textAlign: "center" }}>{item.el_total.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button
                                                onClick={() => {
                                                    deleteMenuItem(item.el_seq);
                                                }}
                                                variant="solid"
                                                style={{
                                                    width: '50px',
                                                    height: '20px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                삭제
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Exercise;
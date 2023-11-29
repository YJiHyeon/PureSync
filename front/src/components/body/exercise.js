import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DialogExercise from 'components/ui/Dialog/DialogExercise';
import TableExercise from 'components/ui/Table/TableExercise';


function Exercise(props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [exerciseData, setExerciseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCalories, setTotalCalories] = useState(0);

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
        console.log("exercise");
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
        console.log("exercise end -------------------");

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
                <TableExercise exerciseData={exerciseData} deleteMenuItem={deleteMenuItem} />
            </div>
        </div>
    )
}

export default Exercise;
import React, { useState, useEffect } from 'react';
import DialogMenu from 'components/ui/Dialog/DialogMenu';
import { Button } from 'components/ui';
import TableMenu from 'components/ui/Table/TableMenu';
import Axios from 'axios';


function Menu(props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(false);

    //식사 유형에 대한 총 칼로리
    const [breakfastTotalCalories, setBreakfastTotalCalories] = useState(0);
    const [lunchTotalCalories, setLunchTotalCalories] = useState(0);
    const [dinnerTotalCalories, setDinnerTotalCalories] = useState(0);
    const [snackTotalCalories, setSnackTotalCalories] = useState(0);
    const [dailyTotalCalories, setDailyTotalCalories] = useState(0);

    const openDialog = () => {
        setDialogOpen(true);
        setLoading(false);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        setLoading(true);

    }

    const toDate = (today)=>{
 
       let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        
        if(month<10)
            month = '0'+month;
        if(date<10)
            date = '0'+date;
        
        return year+"-"+month+"-"+date;
    }

    // 리스트 불러오기
    useEffect(() => {
        Axios.get('http://127.0.0.1:9000/api/menu/list', {
            params: {
                mem_seq: 1,
                menu_date: toDate(props.selectDate),
            },
            withCredentials: true
        })
        .then((res) => {
            const menuList = res.data.data.menuList;
            let breakfastCalories = 0;
            let lunchCalories = 0;
            let dinnerCalories = 0;
            let snackCalories = 0;
            let dailyCalories = 0;

            menuList.forEach((item) => {
                const mealCalories = parseFloat(item.menu_total);
                dailyCalories += mealCalories;

                switch (item.menu_when) {
                    case 1: // 아침
                        breakfastCalories += mealCalories;
                        break;
                    case 2: // 점심
                        lunchCalories += mealCalories;
                        break;
                    case 3: // 저녁
                        dinnerCalories += mealCalories;
                        break;
                    case 4: // 간식
                        snackCalories += mealCalories;
                        break;
                    default:
                        break;
                }
            });

            setBreakfastTotalCalories(breakfastCalories.toFixed(2));
            setLunchTotalCalories(lunchCalories.toFixed(2));
            setDinnerTotalCalories(dinnerCalories.toFixed(2));
            setSnackTotalCalories(snackCalories.toFixed(2));
            setDailyTotalCalories(dailyCalories.toFixed(2));
            setMenuData(menuList);
        })
        .catch((error) => {
            console.error(error);
        });

    }, [props.selectDate, loading]);

    // 삭제 버튼
    const deleteMenuItem = (menu_seq) => {
        Axios.post(`http://127.0.0.1:9000/api/menu/delete`, {
            menuSeq: menu_seq
        })
        .then((res) => {
            setMenuData(menuData.filter((item) => item.menu_seq !== menu_seq));
        })
        .catch((error) => {
            console.error(error);
        });
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: '0' }}>식단</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        식단 등록
                    </Button>
                    <DialogMenu isOpen={isDialogOpen} onClose={closeDialog} selectDate={props.selectDate} />
                </div>
            </div>
            <div>
                ✔️일일 총 섭취 칼로리 : {dailyTotalCalories} kcal
            </div>

            <br /><br />

            {/* 아침 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>아침</h4>
                    <div>
                    📌아침 총 칼로리: {breakfastTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={menuData} deleteMenuItem={deleteMenuItem} menuWhen={1} />
            </div>
            <br /><br />

            {/* 점심 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>점심</h4>
                    <div>
                        📌점심 총 칼로리 : {lunchTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={menuData} deleteMenuItem={deleteMenuItem} menuWhen={2} />
            </div>
            <br /><br />

            {/* 저녁 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>저녁</h4>
                    <div>
                        📌저녁 총 칼로리 :{dinnerTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={menuData} deleteMenuItem={deleteMenuItem} menuWhen={3} />
            </div>
            <br /><br />

            {/* 간식 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>간식</h4>
                    <div>
                        📌간식 총 칼로리 : {snackTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={menuData} deleteMenuItem={deleteMenuItem} menuWhen={4} />
            </div>
        </div>
    );
}

export default Menu;
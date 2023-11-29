import React, { useState, useEffect } from 'react';
import DialogMenu from 'components/ui/Dialog/DialogMenu';
import { Button } from 'components/ui';
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

    const clearMenuData = () => {
        setMenuData([]);
    }

    const openDialog = () => {
        setDialogOpen(true);
        clearMenuData();
        setLoading(false);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        setLoading(true);

    }

    // 리스트 불러오기
    useEffect(() => {
        Axios.get('http://127.0.0.1:9000/api/menu/list', {
            params: {
                mem_seq: 1,
                menu_date: props.selectDate,
            },
            withCredentials: true
        })
        .then((res) => {
            console.log("menu  stat -----------------------------------------");
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

        console.log("menu end -------------------");

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
                일일 총 섭취 칼로리 : {dailyTotalCalories} kcal
            </div>

            <br /><br />

            {/* 아침 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>아침</h3>
                    <div>
                        아침 총 칼로리: {breakfastTotalCalories} kcal
                    </div>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="8%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="12%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>음식명</th>
                            <th style={{ textAlign: "center" }}>섭취량</th>
                            <th style={{ textAlign: "center" }}>단백질</th>
                            <th style={{ textAlign: "center" }}>탄수화물</th>
                            <th style={{ textAlign: "center" }}>지방</th>
                            <th style={{ textAlign: "center" }}>콜레스테롤</th>
                            <th style={{ textAlign: "center" }}>당</th>
                            <th style={{ textAlign: "center" }}>나트륨</th>
                            <th style={{ textAlign: "center" }}>칼로리</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuData
                            .filter(item => item.menu_when === 1)
                            .map((item, index) => {
                                const lastIndex = item.food_name.lastIndexOf('_'); // 마지막 '_'의 위치 찾기
                                const extractedName = lastIndex !== -1 ? item.food_name.substr(lastIndex + 1) : item.food_name;


                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: "left" }}>{extractedName}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_gram}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_pro.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_car.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_fat.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_cal.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_sugar.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_na.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button
                                                onClick={() => {
                                                    deleteMenuItem(item.menu_seq);
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
            <br /><br />

            {/* 점심 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>점심</h3>
                    <div>
                        점심 총 칼로리 : {lunchTotalCalories} kcal
                    </div>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="8%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="12%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>음식명</th>
                            <th style={{ textAlign: "center" }}>섭취량</th>
                            <th style={{ textAlign: "center" }}>단백질</th>
                            <th style={{ textAlign: "center" }}>탄수화물</th>
                            <th style={{ textAlign: "center" }}>지방</th>
                            <th style={{ textAlign: "center" }}>콜레스테롤</th>
                            <th style={{ textAlign: "center" }}>당</th>
                            <th style={{ textAlign: "center" }}>나트륨</th>
                            <th style={{ textAlign: "center" }}>칼로리</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuData
                            .filter(item => item.menu_when === 2)
                            .map((item, index) => {
                                const lastIndex = item.food_name.lastIndexOf('_'); // 마지막 '_'의 위치 찾기
                                const extractedName = lastIndex !== -1 ? item.food_name.substr(lastIndex + 1) : item.food_name;

                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: "left" }}>{extractedName}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_gram}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_pro.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_car.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_fat.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_cal.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_sugar.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_na.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button
                                                onClick={() => {
                                                    deleteMenuItem(item.menu_seq);
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
            <br /><br />

            {/* 저녁 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>저녁</h3>
                    <div>
                        저녁 총 칼로리 :{dinnerTotalCalories} kcal
                    </div>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="8%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="12%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>음식명</th>
                            <th style={{ textAlign: "center" }}>섭취량</th>
                            <th style={{ textAlign: "center" }}>단백질</th>
                            <th style={{ textAlign: "center" }}>탄수화물</th>
                            <th style={{ textAlign: "center" }}>지방</th>
                            <th style={{ textAlign: "center" }}>콜레스테롤</th>
                            <th style={{ textAlign: "center" }}>당</th>
                            <th style={{ textAlign: "center" }}>나트륨</th>
                            <th style={{ textAlign: "center" }}>칼로리</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuData
                            .filter(item => item.menu_when === 3)
                            .map((item, index) => {
                                const lastIndex = item.food_name.lastIndexOf('_'); // 마지막 '_'의 위치 찾기
                                const extractedName = lastIndex !== -1 ? item.food_name.substr(lastIndex + 1) : item.food_name;

                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: "left" }}>{extractedName}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_gram}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_pro.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_car.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_fat.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_cal.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_sugar.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_na.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button
                                                onClick={() => {
                                                    deleteMenuItem(item.menu_seq);
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
            <br /><br />

            {/* 간식 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>간식</h3>
                    <div>
                        간식 총 칼로리 : {snackTotalCalories} kcal
                    </div>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="8%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="12%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>음식명</th>
                            <th style={{ textAlign: "center" }}>섭취량</th>
                            <th style={{ textAlign: "center" }}>단백질</th>
                            <th style={{ textAlign: "center" }}>탄수화물</th>
                            <th style={{ textAlign: "center" }}>지방</th>
                            <th style={{ textAlign: "center" }}>콜레스테롤</th>
                            <th style={{ textAlign: "center" }}>당</th>
                            <th style={{ textAlign: "center" }}>나트륨</th>
                            <th style={{ textAlign: "center" }}>칼로리</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuData
                            .filter(item => item.menu_when === 4)
                            .map((item, index) => {
                                const lastIndex = item.food_name.lastIndexOf('_'); // 마지막 '_'의 위치 찾기
                                const extractedName = lastIndex !== -1 ? item.food_name.substr(lastIndex + 1) : item.food_name;

                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: "left" }}>{extractedName}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_gram}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_pro.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_car.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_fat.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_cal.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_sugar.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total_na.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>{item.menu_total.toFixed(2)}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button
                                                onClick={() => {
                                                    deleteMenuItem(item.menu_seq);
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
    );
}

export default Menu;
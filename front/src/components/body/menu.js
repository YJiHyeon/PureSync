import React, { useState, useEffect } from 'react';
import DialogMenu from 'components/ui/Dialog/DialogMenu';
import { Button } from 'components/ui';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Menu(props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [menuData, setMenuData] = useState([]);
    // const [selectedMenuWhen, setSelectedMenuWhen] = useState(1);
    const [loading, setLoading] = useState(false);
    
    //useNavigate
    const navigate = useNavigate();

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

    useEffect(() => {
        Axios.get('http://127.0.0.1:9000/api/menu/list', {
            params: {
                mem_seq: 1,
                menu_date: props.selectDate,
            },
            withCredentials: true
        })
            .then((res) => {
                setMenuData(res.data.data.menuList);
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
            setMenuData(menuData.filter((item)=> item.menu_seq !== menu_seq));
        })
        .catch((error) => {
             console.error(error);
        });
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>식단</h2>
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
            <br /><br />

            {/* 아침 메뉴 */}
            <div>
                <h3>아침</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
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
                <h3>점심</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
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
                <h3>저녁</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
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
                <h3>간식</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
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
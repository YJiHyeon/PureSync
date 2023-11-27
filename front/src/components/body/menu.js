import React, { useState } from 'react';
import DialogMenu from 'components/ui/Dialog/DialogMenu';
import { Button } from 'components/ui';

function Menu() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
    }

    // 아침 식사의 음식 항목과 칼로리 값 예시
    const [breakfastItems, setBreakfastItems] = useState([
        { name: "샘플 음식명", protein: 10, carbohydrate: 20, fat: 5, cholesterol: 10, sugar: 3, sodium: 200, calories: 150 },
        { name: "샘플 음식명2", protein: 10, carbohydrate: 20, fat: 5, cholesterol: 10, sugar: 3, sodium: 200, calories: 170 }
    ]);

    const deleteBreakfastItem = (index) => {
        const updatedItems = [...breakfastItems];
        updatedItems.splice(index, 1);
        setBreakfastItems(updatedItems);
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
                <DialogMenu isOpen={isDialogOpen} onClose={closeDialog} />
            </div>
            <br /><br />
            <div>
            <h3>아침</h3>
                총 칼로리 : 320 kacl
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <colgroup>
                        <col width="*%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="10%" />
                        <col width="18%" />
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
                        {breakfastItems.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "left" }}>{item.name}</td>
                                <td style={{ textAlign: "center" }}>{item.protein}</td>
                                <td style={{ textAlign: "center" }}>{item.carbohydrate}</td>
                                <td style={{ textAlign: "center" }}>{item.fat}</td>
                                <td style={{ textAlign: "center" }}>{item.cholesterol}</td>
                                <td style={{ textAlign: "center" }}>{item.sugar}</td>
                                <td style={{ textAlign: "center" }}>{item.sodium}</td>
                                <td style={{ textAlign: "center" }}>{item.calories}</td>
                                <td style={{ textAlign: "center" }}>
                                    <Button
                                        onClick={() => deleteBreakfastItem(index)}
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
                        ))}
                    </tbody>
                </table>
            </div>
            <br /><br />
            <div>
                <h3>점심</h3>
                {/* Add content for 점심 here */}
            </div>
            <br /><br />
            <div>
                <h3>저녁</h3>
                {/* Add content for 저녁 here */}
            </div>
            <br /><br />
            <div>
                <h3>간식</h3>
                {/* Add content for 간식 here */}
            </div>
        </div>
    );
}

export default Menu;

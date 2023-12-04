
import React from 'react'
import { Table } from 'components/ui'
import { Button } from 'components/ui';

const { Tr, Th, Td, THead, TBody } = Table

const TableMenu = ({ menuData, deleteMenuItem, menuWhen }) => {
    return (
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th>음식명</Th>
                        <Th>섭취량</Th>
                        <Th>단백질</Th>
                        <Th>탄수화물</Th>
                        <Th>지방</Th>
                        <Th>콜레스테롤</Th>
                        <Th>당</Th>
                        <Th>나트륨</Th>
                        <Th>칼로리</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
    {menuData
        .filter(item => item.menu_when === menuWhen ) // 아침 식단 필터링
        .map((item, index) => {
            const lastIndex = item.food_name.lastIndexOf('_');
            const extractedName = lastIndex !== -1 ? item.food_name.substr(lastIndex + 1) : item.food_name;

            return (
                <tr key={index}>
                    <td style={{ textAlign: "left" }}>{extractedName}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_gram}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_total_pro.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_total_car.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_total_fat.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_total_cal.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_total_sugar.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_total_na.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>{item.menu_total.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>
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
</TBody>
            </Table>
        </div>
    )
}

export default TableMenu


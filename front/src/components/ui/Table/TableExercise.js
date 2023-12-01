import React from 'react'
import { Table } from 'components/ui'
import { Button } from 'components/ui';

const { Tr, Th, Td, THead, TBody } = Table

const TableExercise = ({ exerciseData, deleteMenuItem }) => {
    return (
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th>운동명</Th>
                        <Th>운동 시간(분)</Th>
                        <Th>소모 칼로리</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {exerciseData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td style={{ textAlign: "left" }}>{item.ec_name}</td>
                                <td style={{ textAlign: "left" }}>{item.el_time}</td>
                                <td style={{ textAlign: "left" }}>{item.el_total.toFixed(2)}</td>
                                <td style={{ textAlign: "left" }}>
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
                </TBody>
            </Table>
        </div>
    )
}

export default TableExercise

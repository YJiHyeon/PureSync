import React, { useEffect, useState } from 'react'
import { Card, Button, Tooltip } from 'components/ui'
import { TextEllipsis } from 'components/shared'
import {
    HiOutlineTrash,
} from 'react-icons/hi'
import axios from 'axios'

const Trashes = () => {
    const [trashes, setTrashes] = useState([]);

    useEffect(() => {
        // axios를 사용하여 데이터를 가져옴
        axios.get('http://127.0.0.1:9000/api/mind/trash/list/aaa')
            .then(response => {
                // 요청이 성공하면 데이터를 articles 상태로 설정
                setTrashes(response.data.data.mdTrashList);
                console.log(trashes);
            })
            .catch(error => {
                // 에러 처리
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });
    }, []);
  
    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
        {trashes.map((trash, index) => (
            <Card bordered key={index}>
                <div className="min-h-[60px]">
                    <TextEllipsis
                        text={trash.tsContents}
                        maxTextCount={120}
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex">
                        <Tooltip title="Delete">
                            <Button
                                shape="circle"
                                variant="plain"
                                size="sm"
                                icon={<HiOutlineTrash />}
                            />
                        </Tooltip>
                    </div>
                </div>
            </Card>
        ))}
    </div>
    )
}

export default Trashes
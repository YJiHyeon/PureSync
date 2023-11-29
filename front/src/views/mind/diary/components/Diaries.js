import { Card, Tag } from 'components/ui'
import { HiOutlineClock } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from "react";


const Diaries = () => {
    
    const [diaries, setDiaries] = useState([]);
    useEffect(() => {
        // axios를 사용하여 데이터를 가져옴
        axios.get('http://127.0.0.1:9000/api/mind/diary/list/aaa', {
            params: {
                page: '0',
                size: '5'
              }
        })
            .then(response => {
                // 요청이 성공하면 데이터를 articles 상태로 설정
                setDiaries(response.data.data.mdDiaryList);
                console.log(response.data.data.mdDiaryList);
            })
            .catch(error => {
                // 에러 처리
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });
    }, []);

    const navigate = useNavigate()

    const onArticleClick = (id) => {
        navigate()
    }

    return (
        <div>
        {diaries.map((diary, index) => (
            <Card key={index}
            className="group mb-4"
            clickable
        >
            <div className="px-8 py-3 relative">
                <div className="flex items-center justify-between mb-2">
                    <h5 className="group-hover:underline">
                     {diary.dyTitle}
                    </h5>
                    <Tag
                        className={`border-0 rounded capitalize `}
                    >
                        {diary.emoState}
                    </Tag>
                </div>
                <p>
                    {diary.dyContents}
                </p>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <HiOutlineClock className="text-lg" />
                            <span>
                                {diary.dyDate}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Card>
        ))}
                
   
        </div>
    )
}

export default Diaries
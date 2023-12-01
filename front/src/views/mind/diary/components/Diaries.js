import { Card, Tag } from 'components/ui'
import { HiOutlineClock } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState, useMemo } from "react";
import {
    Loading,
} from 'components/shared'
import { Progress } from 'components/ui'
import { HiEmojiHappy, HiEmojiSad, HiMusicNote } from "react-icons/hi";
import { TextEllipsis } from 'components/shared'


const Diaries = () => {
    const [loading, setLoding] = useState(true);
    const [diaries, setDiaries] = useState([]);
    const [diaryCount, setDiaryCount] = useState(0);
    useEffect(() => {
        // axios를 사용하여 데이터를 가져옴
        axios.get('http://127.0.0.1:9000/api/mind/diary/list/aaa')
            .then(response => {
                // 요청이 성공하면 데이터를 articles 상태로 설정
                setDiaries(response.data.data.mdDiaryList);
                setDiaryCount(response.data.data.count);
                setLoding(false);
            })
            .catch(error => {
                // 에러 처리
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });

    }, []);


        let goodCount = diaries.filter((it) => it.emoField == 1).length;
        let neutralCount = diaries.filter((it) => it.emoField == 2).length;
        let badCount = diaries.filter((it) => it.emoField == 3).length;
        
        let goodRatio = ((goodCount / diaryCount) * 100).toFixed(2);
        let neutralRatio = ((neutralCount / diaryCount) * 100).toFixed(2);
        let badRatio = ((badCount / diaryCount) * 100).toFixed(2);

        if(diaryCount == 0) {
            goodRatio = 0;
            neutralRatio = 0;
            badRatio = 0;
        }
    

    const navigate = useNavigate()

    const onArticleClick = (id) => {
        navigate(
            `/mind/diary/view/${id}`
        )
    }
    
    return (
        <Loading loading={loading}>
            <div>
            <Card header="감정 일기 분석" className="mb-8">
            <span className='text-sky-600 dark:text-skyblue-100'><HiEmojiHappy className='text-lg' /></span><Progress color="sky-500" percent={goodRatio} className="mb-4" />
            <span className='text-emerald-600 dark:text-emerald-100'><HiMusicNote className='text-lg' /></span><Progress color="emerald-500" percent={neutralRatio} className="mb-4" />
            <span className='text-rose-600 dark:text-rose-100'><HiEmojiSad className='text-lg' /></span><Progress color="rose-500" percent={badRatio} className="mb-4" />
            </Card>
        </div>
        
            
        <div className='grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2'>
        {diaries.map((diary, index) => (
            <Card key={index}
            className="group"
            clickable
            onClick={() => onArticleClick(diary.dySeq)}
        >
            <div className="px-8 py-3 relative">
                <div className="flex items-center justify-between gap-4">
                    <h5 className="group-hover:underline">
                    <TextEllipsis text={diary.dyTitle} maxTextCount={16} />
                    </h5>
                   
                   {
                    diary.emoField === 1 ? (
                        <Tag
                        className="text-sky-600 bg-sky-100 dark:text-sky-100 dark:bg-sky-500/20 border-0"
                    >
                        {diary.emoState}
                    </Tag>
                    ) : diary.emoField === 2 ? (
                        <Tag
                        className="text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20 border-0"
                    >
                        {diary.emoState}
                    </Tag>): (
                        <Tag
                        className="text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 border-0"
                    >
                        {diary.emoState}
                    </Tag>
                    )
                   }
                    
                </div>
                
                <div className="min-h-[60px]">
                        <TextEllipsis text={diary.dyContents} maxTextCount={120} />
                    </div>
                
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
        </Loading>
    )
}

export default Diaries
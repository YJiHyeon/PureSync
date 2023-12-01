import React, { useEffect, useState } from 'react'
import Diaries from './diary/components/Diaries'
import { Container } from 'components/shared'
import reducer from './diary/store'
import { injectReducer } from 'store/index'
import DiaryHeader from './diary/components/DiaryHeader'
import EmotionProgress from './diary/components/EmotionProgress'
import {
    Loading,
} from 'components/shared'
import axios from 'axios'


injectReducer('knowledgeBaseHelpCenter', reducer)

const Diary = () => {
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

    let goodCount = diaries.filter((it) => it.emoField === 1).length;
        let neutralCount = diaries.filter((it) => it.emoField === 2).length;
        let badCount = diaries.filter((it) => it.emoField === 3).length;
        
        let goodRatio = ((goodCount / diaryCount) * 100).toFixed(2);
        let neutralRatio = ((neutralCount / diaryCount) * 100).toFixed(2);
        let badRatio = ((badCount / diaryCount) * 100).toFixed(2);

        if(diaryCount === 0) {
            goodRatio = 0;
            neutralRatio = 0;
            badRatio = 0;
        }

    return (
        <Loading loading={loading}>
        <Container>
            <DiaryHeader />
            <div className="mt-8">
                <EmotionProgress goodRatio={goodRatio} neutralRatio={neutralRatio} badRatio={badRatio} />
                <Diaries diaries={diaries} diaryCount={diaryCount}/>
            </div>
        </Container>
        </Loading>
    );
}

export default Diary

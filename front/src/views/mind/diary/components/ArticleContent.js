import React, { useState, useEffect } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import {
    Loading,
    MediaSkeleton,
    TextBlockSkeleton,
} from 'components/shared'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'components/ui'
import { HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn, HiOutlineTrash } from 'react-icons/hi'



const ArticleContent = () => {
    const location = useLocation();
    const path = location.pathname;
    const id = path.split('/').pop();
    const [diary, setDiary] = useState([]);
    const [loading, setLoding] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // axios를 사용하여 데이터를 가져옴
        axios.get(`http://127.0.0.1:9000/api/mind/diary/${id}`, {
        })
            .then(response => {
                // 요청이 성공하면 데이터를 articles 상태로 설정
                setDiary(response.data.data.mdDiary);
                setLoding(false);
            })
            .catch(error => {
                // 에러 처리
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });
    }, []);

    const onClickDelete = () => {
        axios.delete(`http://127.0.0.1:9000/api/mind/diary/${id}`)
        .then((res) => {
            console.log('일기가 삭제되었습니다.')
            navigate('/mind/diary');
            
        })
    }

    const onClickEdit = () => {
        navigate('/mind/diary/update', {state: {editData: diary}});
    }

    return (
        <Loading loading={loading}
            customLoader={
                <div className="flex flex-col gap-8">
                    <MediaSkeleton />
                    <TextBlockSkeleton rowCount={6} />
                    <TextBlockSkeleton rowCount={4} />
                    <TextBlockSkeleton rowCount={8} />
                </div>
            }
        >
            <Container>
                <AdaptableCard bodyClass="lg:flex gap-4">
                    <div className="my-6 max-w-[800px] w-full mx-auto">
                        <div className="flex justify-end gap-2">

                            <Button onClick={onClickEdit} className="mr-2" variant="twoTone" icon={<HiOutlinePencil />} size="xs">
                                <span>수정</span>
                            </Button>
                            <Button onClick={onClickDelete} className="mr-2" variant="solid" icon={<HiOutlineTrash />} size="xs">
                                <span>삭제</span>
                            </Button>
                        </div>
                        <h3>{diary.dyTitle}</h3>
                        <div className="flex items-center mt-4 gap-4">
                            <div className="text-xs">
                                <div className="mb-1">
                                    Created by
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                                        {diary.dyDate}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="mt-8 prose dark:prose-invert max-w-none">
                            {/* static display text to be remove */}
                            <p>
                                {diary.dyContents}
                            </p>
                        </div>
                    </div>

                </AdaptableCard>
            </Container>

        </Loading>
    )
}

export default ArticleContent

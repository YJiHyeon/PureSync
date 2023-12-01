import React, { useEffect } from 'react'
import {
    Loading,
    UsersAvatarGroup,
    MediaSkeleton,
    TextBlockSkeleton,
} from 'components/shared'
import ArticleAction from './ArticleAction'
import ArticleComment from './ArticleComment'
import { getArticle } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'html-react-parser'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Button} from 'components/ui'
import { HiOutlineClock, HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn, HiOutlineTrash } from 'react-icons/hi'

const ArticleContent = ({ articleId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const article = useSelector(
        (state) => state.knowledgeBaseArticle.data.article
    )
    const loading = useSelector(
        (state) => state.knowledgeBaseArticle.data.loading
    )

    const { search } = useLocation()
    const imageUrl = `http://localhost:9000/fileUpload/${article.boardfileName}`;

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(article);
    }, [search])

    const fetchData = () => {
        if (articleId) {
            dispatch(getArticle({ id: articleId }))
        }
    }

    const handleDelete = async () => {
        try {
            if (!article.boardSeq) {
                console.error('게시물 boardSeq를 찾을 수 없습니다.');
                return;
            }
            await axios.delete(`http://localhost:9000/api/board/${article.boardSeq}`);
            console.log('게시물 삭제 성공');
            navigate('/board');
        } catch (error) {
            console.error('게시물 삭제 중 오류:', error);
        } finally {
          
        }
    };
    const commentRegister =()=>{
        //alert("댓글등록");
        //setRegister(true);
        
        fetchData()
    }

    return (
        <Loading
            loading={loading}
            customLoader={
                <div className="flex flex-col gap-8">
                    <MediaSkeleton />
                    <TextBlockSkeleton rowCount={6} />
                    <TextBlockSkeleton rowCount={4} />
                    <TextBlockSkeleton rowCount={8} />
                </div>
            }
        >   
        <div className="flex items-center justify-between">
                <h3>{article.boardName}</h3>
            
                
                <Button onClick={handleDelete} variant="twoTone" icon={<HiOutlineTrash />} size="sm" color="red-600" >삭제하기</Button>
                   
            </div>
            <div className="flex items-center mt-4">
                <UsersAvatarGroup
                    avatarProps={{ size: 40 }}
                //users={article.authors || []}
                />
                <div className="text-sm">
                    <div>
                        <span>작성자 : {article.memId}</span>
                        <span className="mx-2">•</span>
                        <span>좋아요 : {article.boardLikescount}</span>

                    </div>
                    <div className="mb-1">
                        <span className="flex items-center gap-1">
                            <HiOutlineClock className="text-lg" />
                            작성일시 <span>{article.boardWdate}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <p>{ReactHtmlParser(article.content || '')}</p>
                <p>{article.boardContents}</p>
                {article.boardfileName && (
                    <img src={imageUrl} alt="image" style={{ width: '500px', height: 'auto' }} />
                )}
            </div>


            <ArticleAction data={article.boardSeq} commentRegister={commentRegister}/>
            <ArticleComment data={article} />
        </Loading>
    )
}

export default ArticleContent
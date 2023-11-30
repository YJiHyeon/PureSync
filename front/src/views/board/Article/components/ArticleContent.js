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
import { useLocation } from 'react-router-dom'

const ArticleContent = ({ articleId }) => {
   
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
            <h3>{article.boardName}</h3>
            <div className="flex items-center mt-4 gap-4">
                <UsersAvatarGroup
                    avatarProps={{ size: 40 }}
                //users={article.authors || []}
                />
                <div className="text-xs">
                    <div className="mb-1">
                        Created by:
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {article.boardWdate}
                        </span>
                    </div>
                    <div>
                        <span>작성자 : {article.memId}</span>
                        <span className="mx-2">•</span>
                        <span>좋아요 : {article.boardLikescount}</span>

                    </div>
                </div>
            </div>
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <p>{ReactHtmlParser(article.content || '')}</p>
                <p>{article.boardContents}</p>
                {article.boardfileName && (
                    <img src={imageUrl} alt="Article Image" style={{ width: '500px', height: 'auto' }} />
                )}
            </div>


            <ArticleAction data={article.boardSeq} commentRegister={commentRegister}/>
            <ArticleComment data={article} />
        </Loading>
    )
}

export default ArticleContent

import React, { useEffect, useState } from 'react'
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
import { Button } from 'components/ui'
import { HiOutlineClock, HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn, HiOutlineTrash, HiOutlineHeart } from 'react-icons/hi'
import { getboardFile } from 'services/DashboardService'
import LikeButton from './LikeButton'
import { apiDeleteArticle, apiGetMyLikes } from 'services/BoardService'
import axios from 'axios'


const ArticleContent = ({ articleId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userName } = useSelector(
        (state) => state.auth.user
    )
    console.log(userName);
    const [mylikes, setMylikes] = useState(0);
    const article = useSelector(
        (state) => state.knowledgeBaseArticle.data.article
    )
    const loading = useSelector(
        (state) => state.knowledgeBaseArticle.data.loading
    )
    console.log(article);
    const { search } = useLocation()

    useEffect(() => {
        fetchData();
        fetchMylikes();

        console.log("================" + mylikes);
        console.log(article);
    }, [search, mylikes])


    const fetchData = () => {
        if (articleId) {
            dispatch(getArticle({ id: articleId }))
        }
    }

    const fetchMylikes = async () => {
        await apiGetMyLikes(articleId)
            .then((res) => {
                setMylikes(res.data.data.findMyLikes);
            })
            .catch(error => { console.log(error) })
    };

    const handleUpdate = () => {
        // 필요한 데이터를 객체로 만들어 전달
        const updateData = {
            articleId: article.boardSeq,
            boardName: article.boardName,
            boardContents: article.boardContents,
            boardFile: article.boardFile

        };

        // navigate를 사용하여 editor.js로 이동하면서 데이터 전달
        navigate('/board/write', { state: { updateData } });
    }


    const handleDelete = async () => {

        if (!article.boardSeq) {
            console.error('게시물 boardSeq를 찾을 수 없습니다.');
            return;
        }
        await apiDeleteArticle(article.boardSeq)
            .then((res) => {
                navigate('/board');
            })
            
    };

    const commentRegister = () => {
        console.log(article.findBoardFile);
        fetchData()
    }



    const [imageUrlList, setImageUrlList] = useState([]);

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
                <div className="gap-2 flex">
                    <LikeButton article={article} fetchData={fetchData} isLike={mylikes} />
                    {/* <Button onClick={handleLike} variant="twoTone" icon={<HiOutlineHeart fill={article.boardLikescount ? 'blue' : 'white'} />}
                     size="sm" color="blue-600" >좋아요</Button> */}
                    {article.memId === userName && (
                        <>
                            <Button onClick={handleUpdate} variant="twoTone" icon={<HiOutlinePencil />} size="sm" color="green-600" >수정하기</Button>
                            <Button onClick={handleDelete} variant="twoTone" icon={<HiOutlineTrash />} size="sm" color="red-600" >삭제하기</Button>
                        </>
                    )}
                </div>
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
                <div className="grid grid-cols-2 gap-5">
                    {
                        article && article.boardFile && article.boardFile.length > 0
                            ? article.boardFile.map((item, index) => (
                                item.fileUrl && (
                                    <div style={{ width: '100%', height: 'auto' }}>
                                        <img
                                            key={index}
                                            src={item.fileUrl}
                                            alt={`image-${index}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', margin: 0 }}
                                        />
                                    </div>
                                )
                            ))
                            : null
                    }
                </div>



            </div>

            <ArticleAction data={article.boardSeq} commentRegister={commentRegister} />
            <ArticleComment data={article} />
        </Loading>
    )
}

export default ArticleContent
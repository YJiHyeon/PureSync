import React, {useState, useEffect} from 'react'
import { AdaptableCard } from 'components/shared'
import BoardListHeader from './components/BoardListHeader'
import Table from 'components/ui/Table'
import { Loading } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetArticleList } from 'services/BoardService'

const { Tr, Th, Td, THead, TBody } = Table


const Customers = () => {
    const [boardList, setboardList] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetArticleList()
                .then((res) => {
                    setboardList(res.data.data.boardPage);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchPosts();
    }, []);

    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <BoardListHeader />
                <Table>
                    <THead>
                        <Tr>
                            <Th>글번호</Th>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>작성일시</Th>
                            <Th>좋아요</Th>
                        </Tr>
                    </THead>
                    <Loading loading={loading}>
                    <TBody>
                        {boardList.length > 0 ? (
                            boardList.map((board) => (
                                <Tr key={board.boardSeq}>
                                    <Td>{board.boardSeq}</Td>
                                    <Td>
                                        <ActionLink to={`/board/view?id=${board.boardSeq}`}>{board.boardName}</ActionLink>
                                    </Td>
                                    <Td>{board.memId}</Td>
                                    <Td>{board.boardWdate}</Td>
                                    <Td>{board.boardLikescount}</Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="5" className="text-center">게시물이 없습니다.</Td>
                            </Tr>
                        )}
                    </TBody>
                    </Loading>
                </Table>
            </AdaptableCard>
        </>
    )
}

export default Customers
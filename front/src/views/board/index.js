import React, { useState, useEffect } from 'react'
import { AdaptableCard } from 'components/shared'
import BoardListHeader from './components/BoardListHeader'
import Table from 'components/ui/Table'
import { Loading, TextBlockSkeletonm, TableRowSkeleton } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetArticleList } from 'services/BoardService'
import Pagination from 'components/ui/Pagination'

const { Tr, Th, Td, THead, TBody } = Table


const Customers = () => {
    const [boardList, setboardList] = useState({});
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const onPaginationChange = (number) => {
        console.log('onPaginationChange', number)
        apiGetArticleList(number-1)
        .then((res) => {
            setboardList(res.data.data.boardPage);
            console.log(res.data.data.totalPages);
            setTotalPages(res.data.data.totalPages);
            setLoading(false);
            setNumber(number);
        })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetArticleList(number-1)
                .then((res) => {
                    setboardList(res.data.data.boardPage);
                    setTotalPages(res.data.data.totalPages);
                    setLoading(false);
                })
           
        };

        fetchPosts();
    }, [number]);

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
                    {loading ? (
                        <TableRowSkeleton columns={5} rows={10} />
                    ) : (
                        <TBody>


                            {boardList.length > 0 ? (
                                boardList.map((board) => (
                                    <Tr key={board.boardSeq}>
                                        <Td>{board.boardSeq}</Td>
                                        <Td>
                                            {board.boardStatus === 2 ? (
                                                <span className="deleted-message">관리자에 의해 삭제된 게시글입니다</span>
                                            ) : (
                                                <ActionLink to={`/board/view?id=${board.boardSeq}`}>{board.boardName}</ActionLink>
                                            )}
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
                    )}
                </Table>

                <div>
                    <Pagination onChange={onPaginationChange} total={totalPages}/>
                </div>

            </AdaptableCard>
        </>
    )
}

export default Customers
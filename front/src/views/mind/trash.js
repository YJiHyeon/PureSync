import React, { useState, useEffect } from 'react';
import { Container, AdaptableCard } from 'components/shared'
import Trashes from './trash/components/Trashes'
import reducer from './trash/store'
import { injectReducer } from 'store/index'
import TrashBin from './trash/components/TrashBin';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from 'axios'

injectReducer('knowledgeBaseManageArticles', reducer)

const Trash = () => {
    const onDragEnd = (result) => {
        // 드래그가 끝났을 때의 로직 처리 (드랍된 위치 등)
        // 예: 요소를 버리는 처리 로직
    };

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
        <DragDropContext onDragEnd={onDragEnd}>
        <Container>
            <div style={{float: "left", overflowY: 'auto', maxHeight: '500px'}}>
            <AdaptableCard>
                <Trashes trashes={trashes} setTrashes={setTrashes} />
            </AdaptableCard>
            </div>
            <div style={{float: "left"}}>
                <TrashBin />
            </div>
        </Container>
        </DragDropContext>
    );
};

export default Trash;

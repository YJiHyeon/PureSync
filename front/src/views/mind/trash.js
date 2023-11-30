import React from 'react';
import { Container, AdaptableCard } from 'components/shared'
import Trashes from './trash/components/Trashes'
import reducer from './trash/store'
import { injectReducer } from 'store/index'
import TrashBin from './trash/components/TrashBin';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

injectReducer('knowledgeBaseManageArticles', reducer)

const Trash = () => {
    const onDragEnd = (result) => {
        // 드래그가 끝났을 때의 로직 처리 (드랍된 위치 등)
        // 예: 요소를 버리는 처리 로직
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Container>
            <div style={{float: "left", overflowY: 'auto', maxHeight: '500px'}}>
            <AdaptableCard>
                <Trashes />
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

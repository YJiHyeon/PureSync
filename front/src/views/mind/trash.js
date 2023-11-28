import React from 'react';
import { Container, AdaptableCard } from 'components/shared'
import Articles from './trash/components/Articles'
import reducer from './trash/store'
import { injectReducer } from 'store/index'

injectReducer('knowledgeBaseManageArticles', reducer)

const Trash = () => {

    return (
        <Container>
            <AdaptableCard>
                <Articles />
            </AdaptableCard>
        </Container>
    );
};

export default Trash;

import React from 'react'
import Diaries from './diary/components/Diaries'
import { Container } from 'components/shared'
import reducer from './diary/store'
import { injectReducer } from 'store/index'
import DiaryHeader from './diary/components/DiaryHeader'


injectReducer('knowledgeBaseHelpCenter', reducer)

const Diary = () => {
    
    return (
        <>

        <Container>
            <DiaryHeader />
            <div className="mt-8 px-4">
                <Diaries />
            </div>
        </Container>
        </>
    );
}

export default Diary

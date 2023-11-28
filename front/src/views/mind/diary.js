import React from 'react'
import TopSection from './diary/components/TopSection'
import BodySection from './diary/components/BodySection'
import { Container } from 'components/shared'
import reducer from './diary/store'
import { injectReducer } from 'store/index'

injectReducer('knowledgeBaseHelpCenter', reducer)

const Diary = () => {
    return (
        <>
        <TopSection />
        <Container>
            <div className="mt-8 px-4">
                <BodySection />
            </div>
        </Container>
    </>
    );
}

export default Diary

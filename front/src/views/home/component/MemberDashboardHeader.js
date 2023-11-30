import React from 'react'
import { AdaptableCard } from 'components/shared'

const MemberDashboardHeader = ({ data }) => {
    return (
        <AdaptableCard>
            <h4 className="mb-1 text-center">{data.pvContents}</h4>
            <p className="text-center">-{data.pvTalker}-</p>
        </AdaptableCard>
    )
}

export default MemberDashboardHeader


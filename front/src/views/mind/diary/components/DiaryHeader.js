import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom'

const DiaryHeader = () => {    
    const navigate = useNavigate();
    const goView = () => {
        navigate(
            `/mind/diary/write`
        )
    }

    

    return (
        <div className="flex items-center">
            <Button size="sm" variant="solid" onClick={goView}>
                감정일기 쓰기
            </Button>
        </div>
    )
}

export default DiaryHeader

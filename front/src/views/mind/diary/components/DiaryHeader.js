import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui'

const DiaryHeader = () => {    
    return (
        <div className="flex items-center">
            <Button size="sm" variant="solid">
                감정일기 쓰기
            </Button>
        </div>
    )
}

export default DiaryHeader

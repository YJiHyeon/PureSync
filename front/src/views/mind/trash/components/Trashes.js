import React, { useEffect, useState } from 'react'
import { Card, Button, Tooltip } from 'components/ui'
import { TextEllipsis } from 'components/shared'
import {
    HiOutlineTrash,
} from 'react-icons/hi'


const Trashes = ({trashes, setTrashes}) => {
    
    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
        {trashes.map((trash, index) => (
            <Card bordered key={index}>
                <div className="min-h-[60px]">
                    <TextEllipsis
                        text={trash.tsContents}
                        maxTextCount={120}
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex">
                        <Tooltip title="Delete">
                            <Button
                                shape="circle"
                                variant="plain"
                                size="sm"
                                icon={<HiOutlineTrash />}
                            />
                        </Tooltip>
                    </div>
                </div>
            </Card>
        ))}
    </div>
    )
}

export default Trashes
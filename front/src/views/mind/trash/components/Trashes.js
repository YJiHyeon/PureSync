import React, { useEffect, useState } from 'react'
import { Card, Button, Tooltip } from 'components/ui'
import { TextEllipsis } from 'components/shared'
import {
    HiOutlineTrash,
} from 'react-icons/hi'
import DialogTrashIntoTrashbin from 'components/ui/Dialog/DialogTrashIntoTrashbin'


const Trashes = (props) => {
    const {
        trashes,
        goRegister
    } = props;

    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
    }
    //grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-2
    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {trashes.map((trash, index) => (
                <Card bordered key={index}>
                    <div className="min-h-[60px]">
                        <TextEllipsis
                            text={trash.tsContents}
                            maxTextCount={120}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Tooltip title="감정 직접 비우기">
                            <Button
                                className="mr-2"
                                onClick={openDialog}
                                shape="circle"
                                color="orange-600"
                                variant="twoTone"
                                size="sm"
                                icon={<HiOutlineTrash />}
                            >
                            </Button>
                        </Tooltip>
                        <DialogTrashIntoTrashbin isOpen={isDialogOpen} onClose={closeDialog} tsSeq={trash.tsSeq} goRegister={goRegister} />

                    </div>
                </Card>
            ))}
        </div>
    )
}

export default Trashes
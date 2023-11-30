import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui'
import DialogTrashInsert from 'components/ui/Dialog/DialogTrashInsert';

const TrashHeader = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        
    }

    return (
        <div className="flex items-center">
            <Button onClick={openDialog} size="sm" variant="solid">
                마음 비우기
            </Button>
            <DialogTrashInsert isOpen={isDialogOpen} onClose={closeDialog}/>
        </div>
    )
}

export default TrashHeader

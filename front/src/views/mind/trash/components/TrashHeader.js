import React from 'react'
import { Button } from 'components/ui'
import { toggleAddCategoryDialog } from '../store/stateSlice'
import { useDispatch } from 'react-redux'

const TrashHeader = () => {
    const dispatch = useDispatch()

    const onAddTrash = () => {
        dispatch(toggleAddCategoryDialog(true))
    }

    return (
        <div className="flex items-center">
            <Button onClick={onAddTrash} size="sm" variant="solid">
                Add Trash
            </Button>
        </div>
    )
}

export default TrashHeader

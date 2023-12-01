import React, { useEffect, useState } from 'react'
import { Card, Button, Tooltip } from 'components/ui'
import { TextEllipsis } from 'components/shared'
import {
    HiOutlineTrash,
} from 'react-icons/hi'
import DialogTrashIntoTrashbin from 'components/ui/Dialog/DialogTrashIntoTrashbin'


const Trashes = (props) => {
    const { trashes, goRegister } = props;

    // 다이얼로그 상태를 각 트래시에 대해 배열로 관리
    const [dialogStates, setDialogStates] = useState(trashes.map(() => false));

    const openDialog = (index) => {
        const updatedDialogStates = [...dialogStates];
        updatedDialogStates[index] = true;
        setDialogStates(updatedDialogStates);
    };

    const closeDialog = (index) => {
        const updatedDialogStates = [...dialogStates];
        updatedDialogStates[index] = false;
        setDialogStates(updatedDialogStates);
    };

    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {trashes.map((trash, index) => (
                <Card bordered key={trash.tsSeq}>
                    <div className="min-h-[60px]">
                        <TextEllipsis text={trash.tsContents} maxTextCount={120} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Tooltip title="감정 직접 비우기">
                            <Button
                                className="mr-2"
                                onClick={() => openDialog(index)} // 해당 트래시의 인덱스를 전달
                                shape="circle"
                                color="orange-600"
                                variant="twoTone"
                                size="sm"
                                icon={<HiOutlineTrash />}
                            />
                        </Tooltip>
                        {/* 해당 다이얼로그 상태를 해당 트래시에 대해 전달 */}
                        <DialogTrashIntoTrashbin
                            isOpen={dialogStates[index]}
                            onClose={() => closeDialog(index)}
                            tsSeq={trash.tsSeq}
                            goRegister={goRegister}
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default Trashes;

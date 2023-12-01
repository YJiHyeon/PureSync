import React, { useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';
import { motion } from 'framer-motion';
import { theme } from 'twin.macro';
import useWindowSize from '../hooks/useWindowSize';
import { Button, Input } from 'components/ui';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';

const DialogExercise = (props) => {
    const currentSize = useWindowSize();

    const {
        className,
        closable,
        width,
        height,
        style,
        isOpen,
        onClose,
        bodyOpenClassName,
        portalClassName,
        overlayClassName,
        contentClassName,
        closeTimeoutMS,
        ...rest
    } = props;

    // 변수들
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoding] = useState(false);
    const [timeAmounts, setTimeAmounts] = useState([]);

    const onCloseClick = (e) => {
        setSearchValue('');
        setSearchResults([]);
        setSelectedItems([]);
        setTimeAmounts([]);
        onClose(e);
    }

    const toDate = (today)=>{
 
        let year = today.getFullYear();
         let month = today.getMonth() + 1;
         let date = today.getDate();
         
         if(month<10)
             month = '0'+month;
         if(date<10)
             date = '0'+date;
         
         return year+"-"+month+"-"+date;
     }

    const renderCloseButton = (
        <CloseButton
            onClick={onCloseClick}
            className="ltr:right-6 rtl:left-6"
            absolute
        />
    );

    const contentStyle = {
        content: {
            inset: 'unset',
        },
        ...style,
    };

    if (width !== undefined) {
        contentStyle.content.width = width;

        if (
            currentSize.width <=
            parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ''))
        ) {
            contentStyle.content.width = 'auto';
        }
    }
    if (height !== undefined) {
        contentStyle.content.height = height;
    }

    const defaultDialogContentClass = 'dialog-content';

    const dialogClass = classNames(defaultDialogContentClass, contentClassName);



    // 검색 입력 변경 핸들러
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const handleSearchClick = () => {

        Axios.get("http://127.0.0.1:9000/api/exercise/exerciseList",
            { params: { "exerciseName" : searchValue } },
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data.data.allExercise);
                setSearchResults(res.data.data.allExercise);
                setLoding(true);

            })
            .catch((res) => {
                console.log(res);
            })
    }

    // 항목 선택/해제 핸들러  
    const handleItemToggle = (item) => {

        console.log(item);
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        }
        else {
            setSelectedItems([...selectedItems, item]);// 선택된 아이템들의 목록
        }
    }

    // 운동 시간을 변경하는 핸들러
    const handleTimeAmountChange = (e) => {

        setTimeAmounts({
            ...timeAmounts,
            [e.target.id]: e.target.value
        });
        // console.log( "***");
        console.log(timeAmounts);

    }

    // 등록 버튼 클릭
    const handleRegisterClick = () => {
        const sendExerciseDatas = [];

        // 선택한 항목에 대한 정보를 배열에 추가
        let i = 0;
        const exerciseTimeValue = parseInt(timeAmounts[i]);
        selectedItems.forEach((item) => {
            // console.log(item);
            const exerciseInfo = {
                elDate : toDate(props.selectDate),
                elTime : exerciseTimeValue,
                memSeq: 1,
                ecSeq : item.ecSeq
            };
            i++;
            sendExerciseDatas.push(exerciseInfo);
            console.log(exerciseInfo);

            Axios.post("http://127.0.0.1:9000/api/exercise/save", sendExerciseDatas[0])
                .then((res) => {
                    setSearchValue('');
                    setSearchResults([]);
                    setSelectedItems([]);
                    setTimeAmounts([]);
                    props.onClose();
                })
                .catch((res) => {
                    console.log('에러 : ');
                    console.log(res);
                })
        });
    }



    return (
        <Modal
            className={{
                base: classNames('dialog', className),
                afterOpen: 'dialog-after-open',
                beforeClose: 'dialog-before-close',
            }}
            overlayClassName={{
                base: classNames('dialog-overlay', overlayClassName),
                afterOpen: 'dialog-overlay-after-open',
                beforeClose: 'dialog-overlay-before-close',
            }}
            portalClassName={classNames('dialog-portal', portalClassName)}
            bodyOpenClassName={classNames('dialog-open', bodyOpenClassName)}
            ariaHideApp={false}
            isOpen={isOpen}
            style={{ ...contentStyle }}
            closeTimeoutMS={closeTimeoutMS}
            {...rest}
        >
            <motion.div
                className={dialogClass}
                initial={{ transform: 'scale(0.9)' }}
                animate={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
                }}
            >
                {closable && renderCloseButton}

                <h4>운동 선택</h4><br />
                <div>
                    {/* 항목 검색을 위한 Input 컴포넌트와 검색 버튼 */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder="운동을 입력하세요"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        <Button onClick={handleSearchClick} variant="solid">
                            검색
                        </Button>
                    </div>
                </div>

                <div>
                    {/* 검색 결과 표시 및 항목 선택 가능 */}
                    {searchValue && searchResults.length >= 2 && (
                        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                            {searchResults.map((result, index) => (
                                <div key={index} onClick={() => handleItemToggle(result)}>
                                    {result.ecName}
                                    {selectedItems.includes(result) && " ✔️"}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <br /><br />
                <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    <h5>운동 기록 추가</h5>
                    {/* 선택한 항목을 표시 */}
                    {selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>

                                <span style={{ flex: 1 }}>
                                    {item.ecName} - 운동 시간(분) :&nbsp;&nbsp;
                                    <Input
                                        id={index}
                                        name="timeAmounts"
                                        value={timeAmounts[index]}
                                        onChange={handleTimeAmountChange}
                                        type="number"
                                        style={{ width: '100px', height: '15px' }}
                                    />
                                </span>
                            </div>

                        ))
                    ) : (
                        <p>운동 기록에 항목을 추가하세요.</p>
                    )


                    }
                </div>


                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleRegisterClick} variant="solid">
                        등록
                    </Button>
                </div>

               
                
            </motion.div>
        </Modal>
    );
}

DialogExercise.propTypes = {
    className: PropTypes.string,
    closable: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    bodyOpenClassName: PropTypes.string,
    portalClassName: PropTypes.string,
    overlayClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    closeTimeoutMS: PropTypes.number,
}

DialogExercise.defaultProps = {
    closable: true,
    width: 520,
    closeTimeoutMS: 150,
}

export default DialogExercise;

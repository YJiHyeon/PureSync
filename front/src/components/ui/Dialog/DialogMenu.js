import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';
import { motion } from 'framer-motion';
import { theme } from 'twin.macro';
import useWindowSize from '../hooks/useWindowSize';

import { Button, Select, Input, Checkbox  } from 'components/ui';


const DialogMenu = (props) => {
    // 현재 창 크기를 가져오는 커스텀 훅 사용
    const currentSize = useWindowSize();

    // props에서 필요한 값을 추출
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

    // 닫기 버튼 클릭 이벤트 핸들러
    const onCloseClick = (e) => {
        onClose(e);
    }

    // 닫기 버튼을 렌더링하는 JSX 요소
    const renderCloseButton = (
        <CloseButton
            onClick={onCloseClick}
            className="ltr:right-6 rtl:left-6"
            absolute
        />
    );

    // 모달 콘텐츠의 모양을 커스터마이즈하기 위한 contentStyle 객체
    const contentStyle = {
        content: {
            inset: 'unset',
        },
        ...style,
    };

    // 현재 창 크기와 제공된 width prop을 기반으로 콘텐츠 너비 커스터마이즈
    if (width !== undefined) {
        contentStyle.content.width = width;

        // 창 크기가 테마에서 정의한 "sm" 브레이크포인트보다 작거나 같으면 width를 'auto'로 설정
        if (
            currentSize.width <=
            parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ''))
        ) {
            contentStyle.content.width = 'auto';
        }
    }

    // 제공된 height prop을 기반으로 콘텐츠 높이 커스터마이즈
    if (height !== undefined) {
        contentStyle.content.height = height;
    }

    // 모달 콘텐츠의 CSS 클래스 정의
    const defaultDialogContentClass = 'dialog-content';

    // 기본 및 사용자 제공 콘텐츠 클래스 이름을 결합
    const dialogClass = classNames(defaultDialogContentClass, contentClassName);

    // 식사 선택을 위한 상태 변수들
    const [mealType, setMealType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState('');

    // 모든 가능한 항목과 식사 유형 목록 정의
    const allItems = [ '사이다', '사과주스', '사과케이크','사과케이크2','사과케이크3','사과케이크4','사과케이크5','사과케이크6', '당근', '당근케이크', '당근주스'];
    const mealTypes = ['아침', '점심', '저녁', '간식'];

    // 섭취 그람수를 저장하는 상태 변수 추가
    const [gramAmounts, setGramAmounts] = useState({});

    
    // 식사 유형 선택 변경 핸들러
    const handleMealTypeChange = (value) => {
        console.log("Selected meal type:", value);
        setMealType(value);  
        setSelectedMealType(value); 
    }

    // mealType 변경 시 selectedMealType 업데이트하기 위해 useEffect 사용
    useEffect(() => {
        setSelectedMealType(mealType);
    }, [mealType]);

    // 검색 입력 변경 핸들러
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        // 검색 값을 기반으로 항목 필터링
        const filteredItems = allItems.filter(item => item.includes(value));
        setSearchResults(filteredItems);
    }

    // 검색 버튼 클릭 핸들러 (플레이스홀더용)
    const handleSearchClick = () => {
        const dummyResults = ['검색 결과 1', '검색 결과 2', '검색 결과 3'];
        setSearchResults(dummyResults);
    }

    // 항목 선택/해제 핸들러
    const handleItemToggle = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            // 기본값으로 빈 문자열로 초기화된 섭취 그람수를 설정합니다.
            setGramAmounts({
                ...gramAmounts,
                [item]: '',
            });
            setSelectedItems([...selectedItems, item]);
        }
    }

    // 섭취 그람수를 변경하는 핸들러
    const handleGramAmountChange = (item, amount) => {
        // 입력된 값이 음수인지 확인
        if (amount < 0) {
            amount = 1;
        }
        setGramAmounts({
            ...gramAmounts,
            [item]: amount,
        });
    }
    
    // 등록 버튼 클릭 핸들러
    const handleRegisterClick = () => {
        const selectedItemsInfo = selectedItems.map((item) => {
            return `${item} - 섭취 그람수: ${gramAmounts[item] || '0'}g`;
        });
    
        const message = `선택한 식사 유형: ${selectedMealType}\n선택한 항목: ${selectedItemsInfo.join(', ')}`;
        alert(message);
    }



    // 'react-modal'에서 Modal 컴포넌트를 사용하여 모달 대화상자 렌더링
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
            {/* framer-motion을 사용하여 모달 콘텐츠에 애니메이션 적용 */}
            <motion.div
                className={dialogClass}
                initial={{ transform: 'scale(0.9)' }}
                animate={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
                }}
            >
                {/* closable이 true인 경우 닫기 버튼 렌더링 */}
                {closable && renderCloseButton}
                <h4>음식 선택</h4><br />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Select
                    placeholder="식사 유형"
                    options={mealTypes.map((type) => ({
                        value: type,
                        label: type,
                    }))}
                    value={selectedMealType}
                    onChange={(value) => handleMealTypeChange(value)} 
                    style={{ width: '60px', height:'70px' }} 
                />
                </div>
<br />
                <div>
                    {/* 항목 검색을 위한 Input 컴포넌트와 검색 버튼 */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder="식품을 입력하세요"
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
                    {searchValue && searchResults.length > 0 && (
                        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                            {searchResults.map((result, index) => (
                                <div key={index} onClick={() => handleItemToggle(result)}>
                                    {result}
                                    {selectedItems.includes(result) && " ✔️"}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <br /><br />
                <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
    <h5>식단 추가</h5>
    {/* 선택한 항목을 체크리스트로 표시 */}
    {selectedItems.length > 0 ? (
        selectedItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={selectedItems.includes(item)} onChange={() => handleItemToggle(item)} />
                <span style={{ flex: 1 }}>
                    {item} - 섭취한 양(g) :&nbsp;&nbsp;
                    <Input
                        type="number"
                        value={gramAmounts[item] || ''}
                        onChange={(e) => handleGramAmountChange(item, e.target.value)}
                        style={{ width: '100px', height:'15px' }}
                    />
                </span>
            </div>
        ))
    ) : (
        <p>식단에 항목을 추가하세요.</p>
    )}
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

// 컴포넌트의 PropTypes 정의
DialogMenu.propTypes = {
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

// 컴포넌트의 기본 속성값 정의
DialogMenu.defaultProps = {
    closable: true,
    width: 520,
    closeTimeoutMS: 150,
}

export default DialogMenu;

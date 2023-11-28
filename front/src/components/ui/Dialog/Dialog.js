import React, { useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';
import { motion } from 'framer-motion';
import { theme } from 'twin.macro';
import useWindowSize from '../hooks/useWindowSize';

const Dialog = (props) => {
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

    const onCloseClick = (e) => {
        onClose(e);
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

    const [mealType, setMealType] = useState('아침'); // 아침을 기본값으로 설정

    const mealTypes = ['아침', '점심', '저녁', '간식'];

    const handleMealTypeChange = (e) => {
        setMealType(e.target.value);
    }

    // 아래에 음식 검색, 선택, 확인 기능을 추가할 수 있습니다.

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
                <h2>음식 선택</h2>
                <div>
                    <select value={mealType} onChange={handleMealTypeChange}>
                        {mealTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {/* 아래에 음식 검색, 선택, 확인 기능을 추가할 수 있습니다. */}
            </motion.div>
        </Modal>
    );
}

Dialog.propTypes = {
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

Dialog.defaultProps = {
    closable: true,
    width: 520,
    closeTimeoutMS: 150,
}

export default Dialog;

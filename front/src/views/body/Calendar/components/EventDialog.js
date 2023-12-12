import React from 'react';
import {
    Button,
    Select,
    DatePicker,
    Dialog,
    FormContainer,
    FormItem,
    Badge,
    hooks,
} from 'components/ui';
import { eventColors } from 'components/shared/CalendarView';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../store/stateSlice';
import { Field, Form, Formik } from 'formik';
import { HiCheck } from 'react-icons/hi';
import { components } from 'react-select';
import * as Yup from 'yup';
import axios from 'axios';
const { DateTimepicker } = DatePicker;

const { Control } = components;

const { useUniqueId } = hooks;

// 캘린더 이벤트 색상 목록 가져오기
const colorKeys = Object.keys(eventColors);

const colorOptions = colorKeys.map((color) => {
    return { value: color, label: color, color: eventColors[color].dot };
});

// 커스텀 선택 옵션 컴포넌트
const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Badge className={data.color} />
                <span className="ml-2 rtl:mr-2 capitalize">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    );
};

// 커스텀 컨트롤 컴포넌트
const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0];
    return (
        <Control className="capitalize" {...props}>
            {selected && (
                <Badge className={`${selected.color} ltr:ml-4 rtl:mr-4`} />
            )}
            {children}
        </Control>
    );
};

// 폼 유효성 검사 스키마 정의
const validationSchema = Yup.object().shape({
    category: Yup.string().required('⚠️수면 유형을 선택하세요.'), // 수면 유형 필드 검사
    startDate: Yup.string().nullable().required('⚠️취침 시각을 입력하세요.'), // 취침 시각 필드 검사
    endDate: Yup.string().nullable().required('⚠️기상 시각을 입력하세요.'), // 기상 시각 필드 검사
    color: Yup.string().required('⚠️색상을 선택하세요.'), // 색상 필드 검사
});



const EventDialog = ({ submit }) => {
    const dispatch = useDispatch();

    // 다이얼로그 상태와 선택된 이벤트 정보를 가져오기
     const open = useSelector((state) => state.sleepCalendar.state.dialogOpen);
     const selected = useSelector((state) => state.sleepCalendar.state.selected);

     console.log( selected );
     const newId = useUniqueId('event-');

    // 분류 옵션 정의
    const categoryOptions = [
        { value: 0, label: '낮잠' },
        { value: 1, label: '밤잠' },
    ];

    // 다이얼로그 닫기 핸들러
    const handleDialogClose = () => {
        dispatch(closeDialog());
    };
    
    // 폼 제출 핸들러
    const handleSubmit  = async (values, setSubmitting) => {
        setSubmitting(false);

        // 이벤트 데이터 구성
        const eventData = {
            id: selected.id || newId, // 선택된 이벤트의 ID 또는 새로운 ID
            title: values.title, // 제목
            start: values.startDate, // 취침 시각
            eventColor: values.color, // 이벤트 색상
        };
        if (values.endDate) {
            eventData.end = values.endDate; // 기상 시각 (선택적)
        }
        try {
            // Axios 요청 수행
            const response = await axios.post('http://localhost:9000/api/sleep/save', eventData);
    
            // 응답을 필요에 맞게 처리
            console.log('Axios 응답:', response.data);
        } catch (error) {
            // 에러 처리
            console.error('Axios 에러:', error);
        }
        // 이벤트 제출 및 다이얼로그 닫기
        submit?.(eventData, selected.type);
        dispatch(closeDialog());
    };

    return (
        <Dialog
            isOpen={open}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            <h5 className="mb-4">
                {selected.type === 'NEW'
                    ? '수면 시간 등록😴'
                    : '📌수면 시간 수정'}
            </h5>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: selected.title || '', // 제목
                        startDate: new Date(selected.sleepGodate) || '', // 취침 시각
                        endDate: new Date(selected.sleepWudate) || '', // 기상 시각
                        color: selected.eventColor || colorOptions[0].value, // 색상te
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values, setSubmitting);
                    }}
                >
                    {({ values, touched, errors, resetForm }) => (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label="취침 시각"
                                    invalid={
                                        errors.startDate && touched.startDate
                                    }
                                    errorMessage={errors.startDate}
                                >
                                    <Field name="startDate" placeholder="Date">
                                        {({ field, form }) => (
                                            <DateTimepicker
                                                field={field}
                                                form={form}
                                                value={field.value}
                                                onChange={(date) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        date
                                                    );
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="기상 시각"
                                    invalid={errors.endDate && touched.endDate}
                                    errorMessage={errors.endDate}
                                >
                                    <Field name="endDate" placeholder="Date">
                                        {({ field, form }) => (
                                            <DateTimepicker
                                                field={field}
                                                form={form}
                                                value={field.value}
                                                onChange={(date) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        date
                                                    );
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="수면 유형"
                                    invalid={errors.category && touched.category}
                                    errorMessage={errors.category}
                                >
                                    <Field name="category">
                                        {({ field, form }) => (
                                            <Select
                                                placeholder="수면 유형을 선택하세요"
                                                field={field}
                                                form={form}
                                                options={categoryOptions}
                                                value={categoryOptions.find(
                                                    (option) =>
                                                        option.value ===
                                                        values.category
                                                )}
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="색상 선택"
                                    asterisk={true}
                                    invalid={errors.color && touched.color}
                                    errorMessage={errors.color}
                                >
                                    <Field name="color">
                                        {({ field, form }) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                options={[
                                                    { value: 'red', label: '빨강' },
                                                    { value: 'blue', label: '파랑' },
                                                    { value: 'green', label: '초록' },
                                                    // ... 다른 색상 옵션들
                                                ]}
                                                // 선택된 값이 현재 색상인지 확인
                                                value={values.color && values.color !== '' ? { value: values.color, label: values.color } : null}
                                                onChange={(option) => form.setFieldValue(field.name, option.value)}
                                                components={{
                                                    Option: CustomSelectOption,
                                                    Control: CustomControl,
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem className="mb-0 text-right rtl:text-left">
                                    <Button variant="solid" type="submit" onClick={() => handleSubmit(values)}>
                                        등록
                                    </Button>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </Dialog>
    );
};

export default EventDialog;

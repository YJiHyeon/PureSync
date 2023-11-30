import React from 'react'
import {
    Input,
    FormItem,
    FormContainer,
    Select,
    Button,
} from 'components/ui'
import { RichTextEditor } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    emotion: Yup.string().required('Emotion required'),
    content: Yup.string().required('Content required'),
})

/*
{
    "dyDate":"2023-11-24",
    "dyTitle":"aaa의 감정일기3",
    "dyContents": "오늘은 끝내야 하는데...",
    "emoState" : "걱정",
    "memId" : "aaa"
}
*/
const Editor = (props) => {
    const navigate = useNavigate()

    const diary = props.diary ? props.diary : '';
    console.log(diary);


    //유저 아이디 받아와야함
    const memId = 'aaa';

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 문자열로 변환
    const day = String(today.getDate()).padStart(2, '0'); // 일을 문자열로 변환하고 2자리로 맞춤

    const formattedDate = `${year}-${month}-${day}`;
    const EmotionList = [
        { label: "좋음", value: "좋음" },
        { label: "행복", value: "행복" },
        { label: "상쾌", value: "상쾌" },
        { label: "사랑", value: "사랑" },
        { label: "감사", value: "감사" },
        { label: "만족", value: "만족" },
        { label: "평범", value: "평범" },
        { label: "무난", value: "무난" },
        { label: "안정", value: "안정" },
        { label: "슬픔", value: "슬픔" },
        { label: "분노", value: "분노" },
        { label: "불안", value: "불안" },
        { label: "걱정", value: "걱정" },
        { label: "외로움", value: "외로움" },
        { label: "우울", value: "우울" }
    ]

    function stripHtmlUsingDOM(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    const onComplete = async (values, setSubmitting) => {
        setSubmitting(true);
        values.dyContents = stripHtmlUsingDOM(values.dyContents)
        const data = {
            dyDate: values.dyDate,
            dyTitle: values.dyTitle,
            dyContents: values.dyContents,
            emoState: values.emoState,
            memId: values.memId
        }

        console.log(data);

        try {
            const response = diary ? 
            await axios.put(`http://127.0.0.1:9000/api/mind/diary/${diary.dySeq}`, data,
            ) : 
            await axios.post('http://127.0.0.1:9000/api/mind/diary', data,
            );

            // 요청이 성공하면 처리할 부분
            alert('일기저장이 완료 되었습니다.');
            navigate('/mind/diary');
        } catch (error) {
            // 요청이 실패한 경우 에러 처리
            console.error('Error while saving article:', error);
        }
        setSubmitting(false);
    };


    return (
        <Formik
            initialValues={{
                dyTitle: diary.dyTitle ? diary.dyTitle : '',
                dyContents: diary.dyContents ? diary.dyContents : '',
                emoState: diary.emoState ? diary.emoState : '',
                dyDate: diary.dyWdate ? diary.dyWdate : formattedDate,
                memId: diary.memId ? diary.memId : memId
            }}
            onSubmit={(values, { setSubmitting }) => {
                onComplete(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting }) => (
                <Form>

                    <FormContainer>
                        <FormItem label="제목">
                            <Field
                                name="dyTitle"
                                autoComplete="off"
                                component={Input}
                                value={values.dyTitle}
                            />
                        </FormItem>
                        <FormItem label="감정">
                            <Field name="emoState">
                                {({ field, form }) => (
                                    <Select
                                        placeholder="Emotion"
                                        field={field}
                                        form={form}
                                        options={EmotionList}
                                        value={EmotionList.filter(
                                            (emotion) =>
                                                emotion.value ===
                                                values.emoState
                                        )}
                                        onChange={(emotion) =>
                                            form.setFieldValue(
                                                field.name,
                                                emotion.value,
                                            )
                                        }
                                    />
                                )}
                            </Field>
                        </FormItem>
                        <FormItem
                            label="내용"
                            className="mb-0"
                            labelClass="!justify-start"
                            invalid={errors.content && touched.content}
                            errorMessage={errors.content}
                        >
                            <Field name="dyContents">
                                {({ field, form }) => (

                                    <RichTextEditor
                                        value={field.value}
                                        onChange={(val) =>
                                            form.setFieldValue(
                                                field.name,
                                                val
                                            )
                                        }
                                        initialValue={field.value}
                                    />
                                )}
                            </Field>
                        </FormItem>
                        <div className="mt-4 flex justify-end">
                            {props.diary ? (
                                <Button loading={isSubmitting} variant="solid">
                                    수정하기
                                </Button>
                            ) :
                                (
                                    <Button loading={isSubmitting} variant="solid">
                                        등록하기
                                    </Button>
                                )
                            }

                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default Editor
import React, { useState, useEffect } from 'react'
import {
    Input,
    FormItem,
    FormContainer,
    Select,
    Button,
    Notification,
    toast,
} from 'components/ui'
import { RichTextEditor } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { apiPostArticle } from 'services/KnowledgeBaseService'
import { useNavigate } from 'react-router-dom'
import ReactHtmlParser from 'html-react-parser'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    emotion: Yup.string().required('Emotion required'),
    content: Yup.string().required('Content required'),
})

const Editor = () => {
    const navigate = useNavigate()

    const article = useSelector(
        (state) => state.knowledgeBaseEditArticle.data.article
    )
    const categoryLabel = useSelector(
        (state) => state.knowledgeBaseEditArticle.state.categoryLabel
    )
    const categoryValue = useSelector(
        (state) => state.knowledgeBaseEditArticle.state.categoryValue
    )

    const [EmotionList, setCategoryList] = useState([
        { label: 'Survey', value: 'survey' },
        { label: 'Themes', value: 'themes' },
        { label: 'Security', value: 'security' },
        { label: 'Integration', value: 'integration' },
        { label: 'Media', value: 'media' },
        { label: 'Analytic', value: 'analytic' },
        { label: 'Chatbot', value: 'chatbot' },
        { label: 'Commission', value: 'commission' },
    ])

    const onComplete = async (value, setSubmitting) => {
        setSubmitting(true)
        const newData = { ...article, ...value, categoryLabel }
        const resp = await apiPostArticle(newData)
        setSubmitting(false)
        if (resp.data) {
            toast.push(
                <Notification
                    title={`Successfully article`}
                    type="success"
                />,
                { placement: 'top-center' }
            )
            navigate('/app/knowledge-base/manage-articles')
        }
    }

    return (
        <Formik
            initialValues={{
                title: article.title ? article.title : '',
                content: article.content ? article.content : '',
                
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onComplete(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting }) => (
                <Form>
                    
                        <FormContainer>
                            <FormItem
                                label="Title"
                                invalid={errors.title && touched.title}
                                errorMessage={errors.title}
                            >
                                <Field
                                    autoComplete="off"
                                    name="title"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Emotion"
                                invalid={errors.category && touched.category}
                                errorMessage={errors.category}
                            >
                                <Field name="emotion">
                                    {({ field, form }) => (
                                        <Select
                                            placeholder="Emotion"
                                            field={field}
                                            form={form}
                                            options={EmotionList}
                                            value={EmotionList.filter(
                                                (emotion) =>
                                                    emotion.value ===
                                                    values.emotion
                                            )}
                                            onChange={(emotion) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    emotion.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="Content"
                                className="mb-0"
                                labelClass="!justify-start"
                                invalid={errors.content && touched.content}
                                errorMessage={errors.content}
                            >
                                <Field name="content">
                                    {({ field, form }) => (
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <div className="mt-4 flex justify-end">
                                <Button loading={isSubmitting} variant="solid">
                                    Submit
                                </Button>
                            </div>
                        </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default Editor

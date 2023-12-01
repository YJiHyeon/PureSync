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
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title required'),
//     category: Yup.string().required('Category required'),
//     content: Yup.string().required('Content required'),
// })


const Editor = () => {
    const navigate = useNavigate();
    const memId = 'aaa';
  
    const onUpload=( files)=>{

      console.log(files);
    }
    
  
    function stripHtmlUsingDOM(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }
  
    const onComplete = async (values, setSubmitting) => {
      setSubmitting(true);
      values.boardContents = stripHtmlUsingDOM(values.boardContents)
      const formData = new FormData(window.document.myform);
      
      formData.append("boardContents",  values.boardContents);
      console.log("****", formData);
      
      //formData.append("boardContents",  values.boardContents);
      for(let key of formData.keys())
      {
        console.log(key, formData.get(key));
      }
      // formData.append('boardDto', new Blob([JSON.stringify({
      //   boardName: values.boardName,
      //   boardContents: values.boardContents,
      //   memId: memId,
      // })], { type: 'application/json' }));
  
      // formData.append("boardName", values.boardName);
      // formData.append("boardContents", values.boardContents);
      // formData.append("memId", memId);

      // console.log( values.files);
      // // Add file to the FormData
      // formData.append('file', values.file);
  
      
      try {
        const response = await axios.post('http://localhost:9000/api/board', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            
          },
          data: formData,
        });
  
        console.log('파일 업로드 성공:', response.data);
        alert('게시글이 작성되었습니다.');
        navigate('/board');
      } catch (error) {
        // Handle errors
        console.error('Error while saving article:', error);
      }
  
      setSubmitting(false);
    };
  
    return (
      <Formik
        initialValues={{
          boardName: '',
          boardContents: '',
          memId: memId,
          file: '', 
        }}
        onSubmit={(values, { setSubmitting }) => {
          onComplete(values, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <Form enctype="multipart/form-data" name="myform">
            <FormContainer>
              <FormItem label="제목">
                <Field autoComplete="off" name="boardName" component={Input} />
              </FormItem>
              <FormItem
                label="내용"
                className="mb-0"
                labelClass="!justify-start"
                invalid={errors.content && touched.content}
                errorMessage={errors.content}
              >
                <Field name="boardContents">
                  {({ field, form }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    />
                  )}
                </Field>
              </FormItem>
              <FormItem label="파일 업로드">
                <Field
                  type="file"
                  name="file"
                />
                {({ field, form }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    />
                  )}
              </FormItem>
              <div className="mt-4 flex justify-end">
                <Button loading={isSubmitting} variant="solid" type="submit">
                  등록
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    );
  };
  
  export default Editor;
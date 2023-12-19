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
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useLocation } from 'react-router-dom';
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'
import { apiPostArticle, apiPutArticle } from 'services/BoardService'

// const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title required'),
//     category: Yup.string().required('Category required'),
//     content: Yup.string().required('Content required'),
// })

const Editor = () => {
  const navigate = useNavigate();

  const access_token = getHeaderCookie();
  let parse_token = parseJwt(access_token);
  let { memId } = getMemInfoFromToken(parse_token);
  const { state } = useLocation();
  const { updateData } = state || {};
  const [initialFilePreviews, setInitialFilePreviews] = useState([]);
  console.log(updateData);


  useEffect(() => {
    // 페이지 진입 시 이미 존재하는 파일에 대한 정보를 가져와서 filePreviews를 초기화
    if (updateData && updateData.boardFile) {

      console.log(updateData.boardFile);
      setInitialFilePreviews([updateData.boardFile]);

    }
  }, [updateData]);
  // useEffect(() => {
  //   // 페이지 진입 시 이미 존재하는 파일에 대한 정보를 가져와서 filePreviews를 초기화
  //   if (updateData && updateData.boardFile) {
  //     const existingFilePreviews = updateData.boardFile.map((file) => ({
  //       fileUrl: file.fileUrl,
  //       file,
  //     }));
  //     setInitialFilePreviews(existingFilePreviews);
  //   }
  // }, [updateData]);

  useEffect(() => {
    console.log(initialFilePreviews);
  }, [initialFilePreviews]);


  //const updateData = location.state && location.state.updateData;
  const onUpload = (files) => {
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

    formData.append("boardContents", values.boardContents);
    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }

    console.log(values.files);
    if (values.files.length === 0) {
      formData.delete("file");
    }
    
    if (updateData == null) {
      await apiPostArticle(formData)
        .then((res) => {
          console.log('파일 업로드 성공:', res.data);
          alert('게시글이 작성되었습니다.');
          navigate(`/board/view?id=${res.data.data.board.boardSeq}`);
        })
        .catch((error) => {console.log(error)})
      
    } else {
      console.log(updateData);
      await apiPutArticle(updateData.articleId, formData)
        .then((res) => {
          console.log('파일 업로드 성공:', res.data);
          alert('게시글이 수정되었습니다.');
          navigate(`/board/view?id=${res.data.data.board.boardSeq}`);
        })
        .catch((error) => {console.log(error)})
    }
    
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        boardName: updateData ? updateData.boardName : '',
        boardContents: updateData ? updateData.boardContents : '',

        files: updateData && updateData.boardFile ? [...updateData.boardFile] : [],
        filePreviews: initialFilePreviews,
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
                multiple
                onChange={(event) => {
                  const file = event.currentTarget.files;
                  console.log(file);

                  // 기존에 업로드된 파일 목록
                  const existingFiles = values.files ? [...values.files] : [];

                  // 새로 업로드한 파일 목록
                  const newFiles = Array.from(file);

                  // 기존에 업로드된 파일 목록과 새로 업로드한 파일 목록을 합침
                  const mergedFiles = [...existingFiles, ...newFiles];

                  // 업로드된 파일 목록 업데이트
                  setFieldValue('files', mergedFiles);

                  console.log('file:', file);

                  if (file.length > 0) {
                    const previews = values.filePreviews ? [...values.filePreviews] : [];
                    newFiles.forEach((files) => {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        previews.push(reader.result);
                        if (previews.length === mergedFiles.length) {
                          setFieldValue('filePreviews', previews);
                          console.log(file);
                        }
                      };
                      reader.readAsDataURL(files);
                    });
                  } else {
                    setFieldValue('filePreviews', values.filePreviews || []);
                  }
                }}
              />

              {/* 파일 미리보기 맵핑 */}
              <div className='flex'>
                {Array.from(values.files).map((file, index) => (
                  <img
                    key={index}
                    src={file.fileUrl || URL.createObjectURL(file)}
                    alt={`이미지 미리보기 ${index + 1}`}
                    style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                  />
                ))}
                {console.log('File Previews:', values.filePreviews)}
                {values.filePreviews &&
                  values.filePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`이미지 미리보기 ${index + 1}`}
                      style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                    />
                  ))}
              </div>
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
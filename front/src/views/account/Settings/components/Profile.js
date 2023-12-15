import React, {useState} from 'react'
import {
    Input,
    Avatar,
    Upload,
    Button,
    Notification,
    toast,
    FormContainer,
} from 'components/ui'
import SendHeaderCookie from 'utils/hooks/getHeaderCookie'
import { apiPutSettingData } from 'services/AccountServices'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import { HiOutlineUser } from 'react-icons/hi'
import * as Yup from 'yup'
import axios from 'axios'

const { Control } = components

const validationSchema = Yup.object().shape({
    nickname: Yup.string()
        .min(2, '2글자 이상 입력해주세요.')
        .max(21, '20자 이내로 입력해주세요.')
        .required('User Name Required'),
})


const Profile = ({ data, onDataUpdate }) => {
    const token = SendHeaderCookie(); 
    const imgPath = "https://fccbucket123.s3.ap-northeast-2.amazonaws.com/profileImg/";
    const [previewImage, setPreviewImage] = useState('');

    const onSetFormFile = (form, field, files) => {
        const file = files[0];

        // Blob만 처리하도록 추가 확인
        if (file instanceof Blob) {
            form.setFieldValue(field.name, file);

            // 미리보기 이미지를 업데이트
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Invalid file type:', file);
        }
    }

    const beforeUpload = (files) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png', 'image/gif']
        const maxFileSize = 500000

        for (let file of files) {
            console.log(file);
            if (!allowedFileType.includes(file.type)) {
                valid = 'jpeg/png/gif 파일만 업로드 가능합니다.'
            }
            if (file.size >= maxFileSize) {
                valid = '500kb미만의 파일만 업로드 가능합니다.'
            }
        }

        return valid
    }



    const onFormSubmit = async (values, setSubmitting) => {
        try {
            const formData = new FormData();
            formData.append('memberInfo', new Blob([JSON.stringify({
                memNick: values.nickname
            })], { type: 'application/json' }));
            formData.append('file', values.avatar);

            const response = await axios.put(process.env.REACT_APP_HOST_URL + '/api/my', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log('API 호출 성공:', response.data);
            
            onDataUpdate(response.data.data.result);
            
            toast.push(<Notification title={'수정이 완료되었습니다.'} type="success" />, { placement: 'top-center' });
        } catch (error) {
            console.error('API Error:', error);
            toast.push(<Notification title={'알 수 없는 이유로 수정에 실패했습니다.'} type="danger" />, { placement: 'top-center' });
        } finally {
            setSubmitting(false);
        }
        
    }

    return (
        <Formik
            initialValues={{
                nickname : data.memNick || '',
                avatar : data.memImg || ''
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, dirty  }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="기본정보"
                                desc="회원님의 기본정보 입니다."
                            />
                            <FormRow
                                name="avatar"
                                label="프로필 이미지"
                                {...validatorProps}
                            >
                                <Field name="avatar">
                                    {({ field, form }) => {
                                        const avatarProps = field.value || data.memImg
                                        ? { src: `${imgPath}${field.value}` || `${imgPath}${data.memImg}` }
                                        : {};
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                showList={false}
                                                uploadLimit={1}
                                                beforeUpload={beforeUpload}
                                            >
                                                {previewImage ? (
                                                    <Avatar
                                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                        size={100}
                                                        shape="circle"
                                                        src={previewImage}
                                                        alt="프로필 이미지"
                                                        {...avatarProps}
                                                    />
                                                ) : (
                                                    <Avatar
                                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                        size={100}
                                                        shape="circle"
                                                        icon={<HiOutlineUser />}
                                                        {...avatarProps}
                                                    />
                                                )}
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>
                            <FormRow
                                name="name"
                                label="아이디"
                                {...validatorProps}
                            >
                                {data.memId}
                            </FormRow>
                            <FormRow
                                name="nickname"
                                label="닉네임"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="nickname"
                                    component={Input}
                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label="이메일"
                                {...validatorProps}
                            >
                                {data.memEmail}
                            </FormRow>
                            
                            <FormRow
                                name="birth"
                                label="생년월일"
                                border={false}
                                {...validatorProps}
                            >
                                {data.memBirth}
                            </FormRow>
                            <FormRow
                                name="gender"
                                label="성별"
                                border={false}
                                {...validatorProps}
                            >
                                {data.memGender}
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                    disabled={!dirty || isSubmitting}
                                >
                                    {isSubmitting ? '수정중' : '기본정보 수정'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile

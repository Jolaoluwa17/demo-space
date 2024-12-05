import PageHeader from '@/components/pageHeader/PageHeader';
import './createEvaluation.css';
import { IoMdAdd } from 'react-icons/io';
import CustomSelect from '@/components/customselect/CustomSelect';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UploadedDocumentIcon from '@/icons/UploadedDocumentIcon';
import { BiSolidErrorAlt, BiX } from 'react-icons/bi';
import { TfiSave } from 'react-icons/tfi';
import {
  useCreateQuizMutation,
  useCreateQuizQuestionMutation,
  useDeleteQuizMutation,
  useGetAllAssessmentsQuery,
} from '@/services/features/quiz/quizSlice';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ErrorResponse from '@/types/ErrorResponse';

const time = ['40', '50', '60'];
const categoryList = ['Frontend', 'Backend', 'Full Stack', 'DevOps'];

const CreateEvaluation = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [isTime, setIsTime] = useState('');
  const [category, setCategory] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);

  const { data: assessmentData } = useGetAllAssessmentsQuery({});

  const filteredAssessment = assessmentData?.response?.find(
    (assessment: { _id: string }) => assessment._id === id
  );

  console.log(filteredAssessment);

  useEffect(() => {
    if (filteredAssessment) {
      const { course, duration, category } = filteredAssessment;

      setName(course);
      setIsTime(duration);
      setCategory(category);
    }
  }, [filteredAssessment]);

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocument(file); // Store the file object
    }
  };

  const handleRemoveDocument = () => {
    setUploadedDocument(null);
  };

  const [createEval, { isLoading: createEvalLoading }] =
    useCreateQuizMutation();

  const handleCreateEval = async () => {
    const quizData = {
      course: name,
      duration: isTime,
      category: category,
    };

    try {
      const res = await createEval(quizData).unwrap();

      if (res && res?.response._id !== '') {
        handleUploadQuestions(res?.response._id);
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;

      if (err?.data.message === 'Quiz with this name already exist') {
        setErrMsg('Assessment already exist');
      } else {
        setErrMsg('An issue occurred');
      }
      console.log(error);
    } finally {
      navigate('/admin/dashboard/evaluation');
    }
  };

  const [uploadQuestions, { isLoading: uploadQuestionsLoading }] =
    useCreateQuizQuestionMutation();

  const handleUploadQuestions = async (evalIdParam: string) => {
    if (!uploadedDocument) {
      console.error('No file uploaded');
      return;
    }

    const formData = new FormData();
    formData.append('id', evalIdParam);
    formData.append('file', uploadedDocument);

    try {
      await uploadQuestions(formData).unwrap();
      navigate('/admin/dashboard/evaluation');
    } catch (error) {
      console.log(error);
    }
  };

  const [deleteQuiz, { isLoading: deleteQuizLoading }] =
    useDeleteQuizMutation();

  const handleDeleteQuiz = async () => {
    const quizData = {
      id: id,
    };

    try {
      await deleteQuiz(quizData).unwrap();
      navigate('/admin/dashboard/evaluation');
    } catch (error) {
      console.log(error);
    }
  };

  const isFormComplete =
    name && isTime && category && uploadedDocument;

  return (
    <div className="create_evaluation_root">
      <PageHeader
        handleBackClick={() => navigate('/admin/dashboard/evaluation')}
        pageTitle={id ? 'Edit Evaluation' : 'Create Evaluation'}
      />
      <div></div>
      <div className="create_evaluation_content">
        <div className="left">
          <div className="left_main">
            <div className="create_evaluation_form_item">
              <label htmlFor="evalName">Name</label>
              <input
                type="text"
                id="evalName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={id ? true : false}
              />
            </div>
            {/* <div className="create_evaluation_form_item">
              <label htmlFor="evalDescription">Description</label>
              <textarea
                className="instructions_textarea"
                id="evalDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={id ? true : false}
              />
            </div> */}
            <div className="create_evaluation_form_item_cont">
              <div className="create_evaluation_form_item two">
                <label htmlFor="evalName">Time (minutes)</label>
                <CustomSelect
                  options={time}
                  value={isTime}
                  onChange={(value) => setIsTime(value)}
                  placeholder="select time"
                  disabled={id ? true : false}
                />
              </div>
              <div className="create_evaluation_form_item two">
                <label htmlFor="evalName">Category</label>
                <CustomSelect
                  options={categoryList}
                  value={category}
                  onChange={(value) => setCategory(value)}
                  placeholder="choose a category"
                  disabled={id ? true : false}
                />
              </div>
            </div>
          </div>
          {id ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                className="create_evaluation_confirm_btn"
                style={{
                  backgroundColor:
                    !uploadQuestionsLoading &&
                    uploadedDocument &&
                    !deleteQuizLoading
                      ? ''
                      : 'grey',
                  cursor:
                    !uploadQuestionsLoading &&
                    uploadedDocument &&
                    !deleteQuizLoading
                      ? 'pointer'
                      : 'not-allowed',
                  color: 'white',
                }}
                onClick={
                  !uploadQuestionsLoading &&
                  uploadedDocument &&
                  !deleteQuizLoading
                    ? () => handleUploadQuestions(id || '')
                    : undefined
                }
              >
                {uploadQuestionsLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TfiSave style={{ paddingRight: '10px' }} color="white" />
                    Update Evaluation
                  </div>
                )}
              </div>
              <div
                className="create_evaluation_confirm_btn"
                style={{
                  backgroundColor:
                    !deleteQuizLoading && !uploadQuestionsLoading
                      ? 'red'
                      : 'grey',
                  cursor:
                    !deleteQuizLoading && !uploadQuestionsLoading
                      ? 'pointer'
                      : 'not-allowed',
                  color: 'white',
                }}
                onClick={!deleteQuizLoading ? handleDeleteQuiz : undefined}
              >
                {deleteQuizLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RiDeleteBin6Line
                      style={{ paddingRight: '10px' }}
                      color="white"
                    />
                    Delete Evaluation
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="create_evaluation_confirm_btn"
              style={{
                backgroundColor:
                  !createEvalLoading &&
                  !uploadQuestionsLoading &&
                  isFormComplete
                    ? ''
                    : 'grey',
                cursor:
                  !createEvalLoading &&
                  !uploadQuestionsLoading &&
                  isFormComplete
                    ? 'pointer'
                    : 'not-allowed',
                color: 'white',
              }}
              onClick={
                !createEvalLoading && !uploadQuestionsLoading && isFormComplete
                  ? handleCreateEval
                  : undefined
              }
            >
              {createEvalLoading || uploadQuestionsLoading ? (
                <div className="spinner"></div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TfiSave style={{ paddingRight: '10px' }} color="white" />
                  Create Evaluation
                </div>
              )}
            </div>
          )}
          {errMsg && (
            <div className="error_message">
              <BiSolidErrorAlt fontSize={18} style={{ paddingRight: '5px' }} />
              {errMsg}
            </div>
          )}
        </div>
        <div className="right">
          <div>
            <div className="add_evaluation_title">Add Evaluation Questions</div>
            <div className="upload_file_title">Upload relevant file</div>
            <div className="create_evaluation_form_item">
              {uploadedDocument ? (
                <div className="file_name_display">
                  <UploadedDocumentIcon />
                  <div className="file_name_text">{uploadedDocument?.name}</div>
                  <BiX
                    fontSize={24}
                    color="#6A757E"
                    style={{ cursor: 'pointer' }}
                    onClick={handleRemoveDocument}
                  />
                </div>
              ) : (
                <div
                  className="uploadIcon"
                  onClick={() => {
                    const fileInput = document.getElementById('fileInput2');
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <IoMdAdd style={{ paddingRight: '5px' }} /> Add attachment
                </div>
              )}
              <input
                type="file"
                id="fileInput2"
                accept=".xls, .xlsx"
                style={{ display: 'none' }}
                onChange={handleDocumentChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvaluation;

import PageHeader from '@/components/pageHeader/PageHeader';
import './createEvaluation.css';
import { IoMdAdd } from 'react-icons/io';
import CustomSelect from '@/components/customselect/CustomSelect';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadedDocumentIcon from '@/icons/UploadedDocumentIcon';
import { BiX } from 'react-icons/bi';
import { TfiSave } from "react-icons/tfi";

const time = ['40', '50', '60'];
const passingGrade = ['60', '70', '80'];

const CreateEvaluation = () => {
  const [isTime, setIsTime] = useState('');
  const [isPassingGrade, setIsPassingGrade] = useState('');

  const navigate = useNavigate();

  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName('');
  };

  const [uploadedDocument, setUploadedDocument] = useState<string>('');

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocument(file.name);
    }
  };

  const handleRemoveDocument = () => {
    setUploadedDocument('');
  };

  return (
    <div className="create_evaluation_root">
      <PageHeader
        handleBackClick={() => navigate('/admin/dashboard/evaluation')}
        pageTitle={'Create Evaluation'}
      />
      <div className="create_evaluation_content">
        <div className="left">
          <div className="create_evaluation_form_item">
            <label htmlFor="evalName">Evaluation Name</label>
            <input type="text" />
          </div>
          <div className="create_evaluation_form_item">
            <label htmlFor="evalName">Add image or icon</label>
            {uploadedFileName ? (
              <div className="file_name_display">
                <UploadedDocumentIcon />
                <div className="file_name_text">{uploadedFileName}</div>
                <BiX
                  fontSize={24}
                  color="#6A757E"
                  style={{ cursor: 'pointer' }}
                  onClick={handleRemoveFile}
                />
              </div>
            ) : (
              <div
                className="uploadIcon"
                onClick={() => {
                  const fileInput = document.getElementById('fileInput');
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
              id="fileInput"
              accept=".png, .jpg, .jpeg"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div className="create_evaluation_form_item">
            <label htmlFor="evalName">Evaluation Description</label>
            <input type="text" />
          </div>
          <div className="create_evaluation_form_item">
            <label htmlFor="evalName">Instructions</label>
            <textarea className="instructions_textarea" />
          </div>
          <div className="create_evaluation_form_item_cont">
            <div className="create_evaluation_form_item two">
              <label htmlFor="evalName">Time</label>
              <CustomSelect
                options={time}
                value={isTime}
                onChange={(value) => setIsTime(value)}
                placeholder="select time"
              />
            </div>
            <div className="create_evaluation_form_item two">
              <label htmlFor="evalName">Passing Percentage</label>
              <CustomSelect
                options={passingGrade}
                value={isPassingGrade}
                onChange={(value) => setIsPassingGrade(value)}
                placeholder="select passing percentage"
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="add_evaluation_title">Add Evaluation Questions</div>
          <div className="upload_file_title">Upload relevant file</div>
          <div className="create_evaluation_form_item">
            {uploadedDocument ? (
              <div className="file_name_display">
                <UploadedDocumentIcon />
                <div className="file_name_text">{uploadedDocument}</div>
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
      <div className="create_evaluation_confirm_btn">
        <TfiSave style={{ paddingRight: '10px' }} color="white" />
        Create Evaluation
      </div>
    </div>
  );
};

export default CreateEvaluation;

import UploadedDocumentIcon from '@/icons/UploadedDocumentIcon';
import './createProgram.css';
import { BiX } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import { TfiSave } from 'react-icons/tfi';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const CreateProgram = () => {
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

  const navigate = useNavigate();

  return (
    <div className="create_program_root">
      <div
        className="customize_back_btn"
        onClick={() => navigate('/admin/dashboard/skill-gap-program/programs')}
      >
        <IoIosArrowRoundBack style={{ marginRight: '10px' }} fontSize={25} />
        Back
      </div>
      <div className="create_program_container">
        <div className="title">Create Skill Gap Program</div>
        <div className="create_program_card">
          <div className="create_program_form_item">
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
          <div className="create_program_form_item">
            <label htmlFor="evalName">Program Description</label>
            <input type="text" />
          </div>
          <div className="create_evaluation_form_item">
            <label htmlFor="evalName">Instructions</label>
            <textarea className="instructions_textarea" />
          </div>
        </div>
        <div className="create_program_btn_new">
          <TfiSave style={{ paddingRight: '10px' }} color="white" />
          Create Evaluation
        </div>
      </div>
    </div>
  );
};

export default CreateProgram;

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TfiSave } from 'react-icons/tfi';
import { IoIosArrowRoundBack } from 'react-icons/io';
import CustomSelect from '@/components/customselect/CustomSelect';
import {
  useCreateProgramMutation,
  useDeleteProgramMutation,
  useGetSpecificProgramQuery,
  useUpdateProgramMutation,
} from '@/services/features/skillGap/skillGapSlice';
import './createProgram.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ToastNotification from '@/components/toastNotification/ToastNotification';

const durationList = ['6 months', '12 months', '18 months'];

const extractField = (htmlString: string, label: string) => {
  const regex = new RegExp(
    `<strong>${label}:</strong>([\\s\\S]*?)(?=<strong>|$)`,
    'i'
  );
  const match = htmlString.match(regex);
  return match
    ? match[1].trim().replace(/<br>/g, '').replace(/\n\s*/g, '\n')
    : '';
};

const CreateProgram = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [duration, setDuration] = useState('6 months');
  const [modules, setModules] = useState('');
  const [benefits, setBenefits] = useState('');
  const [programDescriptionMain, setProgramDescriptionMain] = useState('');

  const { data, isLoading, refetch } = useGetSpecificProgramQuery(id);
  const [createProgram, { isLoading: createProgramLoading }] =
    useCreateProgramMutation();
  const [updateProgram, { isLoading: updateProgramLoading }] =
    useUpdateProgramMutation();
  const [deleteProgram, { isLoading: deleteProgramLoading }] =
    useDeleteProgramMutation();

  useEffect(() => {
    if (data?.response) {
      const { title, discreption } = data.response;

      setProgramName(title);
      setProgramDescription(extractField(discreption, 'Description'));
      setDuration(extractField(discreption, 'Duration'));
      setBenefits(extractField(discreption, 'Benefits'));
      setModules(extractField(discreption, 'Modules'));
    }
  }, [data]);

  useEffect(() => {
    if (programDescription && duration && modules) {
      const combined = `
        <strong>Description:</strong> ${programDescription} <br>
        <strong>Duration:</strong> ${duration} <br>
        <strong>Benefits:</strong> ${benefits} <br>
        <strong>Modules:</strong> ${modules} <br>
      `;
      setProgramDescriptionMain(combined);
    }
  }, [programDescription, duration, modules, benefits]);

  const handleCreateProgram = async () => {
    const programData = {
      title: programName,
      discreption: programDescriptionMain,
    };
    try {
      const res = await createProgram(programData).unwrap();
      console.log(res);
      navigate('/admin/dashboard/skill-gap-program/programs');
    } catch (error) {
      console.log(error);
    }
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastStatus, setToastStatus] = useState(false);

  const handleUpdateProgram = async () => {
    const programData = {
      id: id,
      title: programName,
      discreption: programDescriptionMain,
    };
    try {
      const res = await updateProgram(programData).unwrap();
      refetch();
      setShowToast(true);
      setToastMsg('Skill Gap Updated Successfully !!!');
      setToastStatus(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
  };

  const handleDeleteProgram = async () => {
    const programData = {
      id: id,
    };
    try {
      await deleteProgram(programData).unwrap();
      navigate('/admin/dashboard/skill-gap-program/programs');
    } catch (error) {
      console.log(error);
    }
  };

  const isFormComplete =
    programName && programDescription && duration && modules && benefits;

  return (
    <div className="create_program_root">
      {showToast && (
        <ToastNotification
          message={toastMsg}
          show={showToast}
          error={toastStatus}
        />
      )}
      <div
        className="customize_back_btn"
        onClick={() => navigate('/admin/dashboard/skill-gap-program/programs')}
      >
        <IoIosArrowRoundBack style={{ marginRight: '10px' }} fontSize={25} />
        Back
      </div>
      <div className="create_program_container">
        <div className="title">
          {id ? 'Edit Skill Gap Program' : 'Create Skill Gap Program'}
        </div>
        <div className="create_program_card">
          <div className="create_program_form_item">
            <label htmlFor="evalName">Evaluation Name</label>
            <input
              type="text"
              id="evalName"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              disabled={isLoading ? true : false}
            />
          </div>
          <div className="create_program_form_item">
            <label htmlFor="programDescription">Program Description</label>
            <input
              type="text"
              id="programDescription"
              value={programDescription}
              onChange={(e) => setProgramDescription(e.target.value)}
              disabled={isLoading ? true : false}
            />
          </div>
          <div className="create_program_form_item">
            <label htmlFor="duration">Duration</label>
            <CustomSelect
              options={durationList}
              value={duration}
              onChange={(value) => setDuration(value)}
              disabled={isLoading ? true : false}
            />
          </div>
          <div className="create_program_form_item">
            <label htmlFor="benefits">
              Benefits
              <button
                onClick={() => setBenefits((prev) => prev + '\n- ')}
                type="button"
                disabled={isLoading ? true : false}
                className="add_benefits_modules"
              >
                Add Benefit
              </button>
            </label>
            <textarea
              id="benefits"
              className="instructions_textarea"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              disabled={isLoading ? true : false}
            />
          </div>
          <div className="create_program_form_item">
            <label htmlFor="modules">
              Modules
              <button
                onClick={() => setModules((prev) => prev + '\n- ')}
                type="button"
                disabled={isLoading ? true : false}
                className="add_benefits_modules"
              >
                Add Module
              </button>
            </label>
            <textarea
              id="modules"
              className="instructions_textarea"
              value={modules}
              onChange={(e) => setModules(e.target.value)}
              disabled={isLoading ? true : false}
            />
          </div>
        </div>
        {id ? (
          <div className="program_action_btn_container">
            <div
              className="create_program_btn_new"
              style={{
                backgroundColor:
                  !updateProgramLoading && !isLoading && !deleteProgramLoading
                    ? ''
                    : 'grey',
                cursor:
                  !updateProgramLoading && !isLoading && !deleteProgramLoading
                    ? 'pointer'
                    : 'not-allowed',
                color: 'white',
              }}
              onClick={
                !updateProgramLoading && !isLoading && !deleteProgramLoading
                  ? handleUpdateProgram
                  : undefined
              }
            >
              {updateProgramLoading ? (
                <div className="spinner"></div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TfiSave style={{ paddingRight: '10px' }} color="white" />
                  Update Program
                </div>
              )}
            </div>
            <div
              className="create_program_btn_new"
              style={{
                backgroundColor:
                  !deleteProgramLoading && !isLoading && !updateProgramLoading
                    ? 'red'
                    : 'grey',
                cursor:
                  !deleteProgramLoading && !isLoading && !updateProgramLoading
                    ? 'pointer'
                    : 'not-allowed',
                color: 'white',
              }}
              onClick={
                !isLoading && !deleteProgramLoading && !updateProgramLoading
                  ? handleDeleteProgram
                  : undefined
              }
            >
              {deleteProgramLoading ? (
                <div className="spinner"></div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RiDeleteBin6Line
                    style={{ paddingRight: '10px' }}
                    color="white"
                  />
                  Delete Program
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="create_program_btn_new"
            style={{
              backgroundColor:
                isFormComplete && !createProgramLoading ? '' : 'grey',
              cursor:
                isFormComplete && !createProgramLoading
                  ? 'pointer'
                  : 'not-allowed',
              color: 'white',
            }}
            onClick={
              isFormComplete && !createProgramLoading
                ? handleCreateProgram
                : undefined
            }
          >
            {createProgramLoading ? (
              <div className="spinner"></div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TfiSave style={{ paddingRight: '10px' }} color="white" />
                Create Program
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProgram;

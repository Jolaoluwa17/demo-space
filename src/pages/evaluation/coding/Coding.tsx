import { useEffect, useRef, useState } from 'react';
import './coding.css';
import { Editor } from '@monaco-editor/react';
import { executeCode } from '../../../services/codeEditorApi';
import LanguageSelector from '../../../components/languageselector/LanguageSelector';
import { languages } from '../../../utils/Constants';

interface ExecuteCodeResponse {
  result?: string; // Ensure this is a string
  error?: string; // Optional error property
  stdout?: string;
}

const Coding = () => {
  const [code, setCode] = useState<string>(''); // Initialize with empty string
  const [output, setOutput] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript'); // Default language
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, isLoading] = useState<boolean>(false);

  const editorRef = useRef<any>(null);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Load the sample code for the selected language
  useEffect(() => {
    const selectedLanguage = languages.find((lang) => lang.value === language);
    if (selectedLanguage) {
      setCode(selectedLanguage.sampleCode); // Set the sample code when language changes
    }
  }, [language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    isLoading(true);

    try {
      // Find the selected language object
      const selectedLanguage = languages.find(
        (lang) => lang.value === language
      );

      // Pass language, version, and source code as an object
      const result: ExecuteCodeResponse = await executeCode({
        language: selectedLanguage?.value,
        version: selectedLanguage?.version,
        sourceCode,
      });

      // Extract output string from result and set it to output state
      setOutput(result.stdout ?? ''); // Use the result property or default to an empty string
      setIsError(!!result.error); // Set isError based on whether an error exists
    } catch (error) {
      console.log('Execution error:', error);
      setIsError(true); // Optionally set isError to true on error
      setOutput('An error occurred while executing the code.'); // Optional error message
    } finally {
      isLoading(false);
      console.log('Code execution finished');
    }
  };

  const [time, setTime] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer
  }, []);

  // Function to format time as mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="coding_root">
      <div className="coding_header">
        <div>Questions</div>
        <div className="timer">{formatTime(time)}</div>
      </div>
      <div className="coding_container">
        <div className="coding_question">
          Given an integer n, return a counter function. This counter function
          initially returns n and then returns 1 more than the previous value
          every subsequent time it is called (n, n + 1, n + 2, etc). <br />
          <br />
          Sample: <br />
          Input: n = 10 ["call","call","call"] <br />
          Output: 10,11,12 <br />
        </div>

        <div className="coding_interface">
          <div className="left">
            <LanguageSelector
              language={language}
              handleLanguageChange={handleLanguageChange}
            />
            <Editor
              height="100%"
              width="100%"
              className="code_editor"
              language={language}
              value={code} // Set the value to the sample code
              onChange={(code: any) => setCode(code)} // Handle code changes
              onMount={onMount}
              defaultValue={code} // Set the default value
            />
          </div>
          <div className="right">
            <button onClick={runCode} className="run_code_btn">
              {loading ? <div className="spinner"></div> : 'Run Code'}
            </button>
            <div>Output:</div>
            <pre>{isError ? `Error: ${output}` : output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coding;

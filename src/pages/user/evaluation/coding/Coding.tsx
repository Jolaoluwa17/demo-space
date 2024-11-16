import { useEffect, useRef, useState } from 'react';
import './coding.css';
import { Editor, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { languages } from '@/utils/Constants';
import { executeCode } from '@/services/codeEditorApi';
import LanguageSelector from '@/components/languageselector/LanguageSelector';

interface Language {
  value: string;
  version: string;
  sampleCode: string;
}

interface ExecuteCodeResponse {
  result?: string;
  error?: string;
  stdout?: string;
}

const Coding = () => {
  const [code, setCode] = useState<string>(''); // Initialize with empty string
  const [output, setOutput] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript'); // Default language
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Type for the onMount function from Monaco Editor
  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Load the sample code for the selected language
  useEffect(() => {
    const selectedLanguage = languages.find(
      (lang: Language) => lang.value === language
    );
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
    setLoading(true);

    try {
      const selectedLanguage = languages.find(
        (lang: Language) => lang.value === language
      );

      const result: ExecuteCodeResponse = await executeCode({
        language: selectedLanguage?.value ?? 'javascript',
        version: selectedLanguage?.version ?? '1.0.0',
        sourceCode,
      });

      setOutput(result.stdout ?? '');
      setIsError(!!result.error);
    } catch (error) {
      console.log('Execution error:', error);
      setIsError(true);
      setOutput('An error occurred while executing the code.');
    } finally {
      setLoading(false);
      console.log('Code execution finished');
    }
  };

  const [time, setTime] = useState<number>(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
          every subsequent time it is called (n, n + 1, n + 2, etc).
          <br />
          <br />
          Sample: <br />
          Input: n = 10 ["call", "call", "call"] <br />
          Output: 10, 11, 12 <br />
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
              value={code}
              onChange={(newCode) => setCode(newCode ?? '')}
              onMount={onMount}
              defaultValue={code}
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

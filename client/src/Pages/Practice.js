import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { useNavigate } from "react-router-dom";
import HelpPopup from "../Components/Help/HelpPopup";

const PracticePage = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here\n");
  const [output, setOutput] = useState("");
  const [notes, setNotes] = useState("");

  const runCode = () => {
    try {
      let capturedOutput = "";

      if (language === "javascript") {
        const captureLog = (msg) => (capturedOutput += `${msg}\n`);
        const originalLog = console.log;
        console.log = captureLog;
        eval(code);
        console.log = originalLog;
        setOutput(capturedOutput || "No output");
      } else if (language === "python") {
        if (window.pyodide) {
          window.pyodide
            .runPythonAsync(code)
            .then((result) => setOutput(result || "No output"))
            .catch((err) => setOutput(`Error: ${err.message}`));
        } else {
          setOutput("Python environment not available.");
        }
      } else if (language === "java") {
        setOutput("Java execution is currently not supported.");
      }
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  const back = () => {
    navigate("/battle");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
        <button
          onClick={back}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform"
        >
          Back
        </button>
        <h1 className="text-xl font-semibold tracking-wider">Practice Ground</h1>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          {/* Run Button */}
          <button
            onClick={runCode}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform"
          >
            Run
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Code Editor */}
        <div className="w-3/4 bg-gray-800 p-4 shadow-inner">
          <MonacoEditor
            language={language}
            theme="vs-dark"
            value={code}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
            }}
            onChange={(newCode) => setCode(newCode)}
          />
        </div>

        {/* Notes Section */}
        <div className="w-1/4 bg-gray-900 p-4 text-white border-l border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            className="w-full h-full p-3 bg-gray-800 rounded-lg text-gray-300 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Output Section */}
      <div className="p-4 bg-gray-900 text-white border-t border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Output:</h3>
        <pre className="bg-gray-800 p-4 rounded-lg shadow-inner text-gray-300 overflow-auto whitespace-pre-wrap h-40">
          {output}
        </pre>
      </div>
      <HelpPopup/>

    </div>
  );
};

export default PracticePage;

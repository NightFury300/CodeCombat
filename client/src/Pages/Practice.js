import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import HelpPopup from "../Components/Help/HelpPopup";

const PracticePage = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here\n");
  const [output, setOutput] = useState("");
  const [notes, setNotes] = useState("");

  // Judge0 API endpoint and headers
  const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  const API_KEY = "4de953dca3msh9e69eb61e89af05p1b21a7jsn7ebf34d234a5"; // Use your own API key here

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runCode = async () => {
    setOutput("Running...");
    try {
      // Prepare the submission payload
      const languageId = getLanguageId(language); // Define this function to get the language ID
      const body = {
        source_code: code,
        language_id: languageId,
      };
  
      // Send the code to Judge0 API for evaluation
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "4de953dca3msh9e69eb61e89af05p1b21a7jsn7ebf34d234a5", // Use your RapidAPI Key here
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
  
      const token = response.data.token;
  
      // Poll for the result from Judge0
      let result;
      while (true) {
        const resultResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "X-RapidAPI-Key": "4de953dca3msh9e69eb61e89af05p1b21a7jsn7ebf34d234a5",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );
  
        result = resultResponse.data;
  
        // Check if the status is "completed"
        if (result.status.id === 3 || result.status.id > 3) {
          break;
        }
  
        // If not completed, wait for a while and retry
        await sleep(500); // sleep function can be defined as `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));`
      }
  
      // Process the output from the result
      if (result.status.id === 3) {
        setOutput(result.stdout || "No output");
      } else {
        setOutput(`Error: ${result.stderr || "Unknown error"}`);
      }
  
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      console.error("Error details:", error);
    }
  };
  
  // Helper function to map language to its corresponding Judge0 language ID
  const getLanguageId = (language) => {
    switch (language) {
      case "javascript":
        return 63; // Language ID for JavaScript
      case "python":
        return 71; // Language ID for Python
      case "java":
        return 62; // Language ID for Java
      default:
        return 63; // Default to JavaScript if language is unsupported
    }
  };
  

  // Function to fetch result from Judge0 using the token
  const getResult = async (token) => {
    while (true) {
      const resultResponse = await axios.get(
        `${JUDGE0_API_URL}/${token}`,
        {
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const result = resultResponse.data;
      const status = result.status.id;

      if (status === 3 || status > 3) {
        return result;
      }

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms before retrying
    }
  };

  // Mapping language to Judge0 language ID
  // const getLanguageId = (language) => {
  //   switch (language) {
  //     case "javascript":
  //       return 63; // Judge0 language ID for JavaScript
  //     case "python":
  //       return 71; // Judge0 language ID for Python
  //     case "java":
  //       return 62; // Judge0 language ID for Java
  //     default:
  //       return 63; // Default to JavaScript
  //   }
  // };

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

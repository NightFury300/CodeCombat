import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from '../../Contexts/UserContext';
import HelpPopup from "../Help/HelpPopup";
const CodeEditor = () => {
  const navigate = useNavigate();
  const { contestId, teamId } = useParams(); // Extract the teamId from the URL
  const { user } = useUser(); // Get user data from context
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [teamScore, setTeamScore] = useState(0); // Team's score state
  const socket = useRef(null); // Use useRef for the socket connection
  const [taskScores, setTaskScores] = useState({});
  

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);


  // Persistent data - load from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem("savedCode");
    const savedScore = localStorage.getItem("teamScore");
    const fetchTeamScore = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contest/team/${teamId}`
        );
        setTeamScore(response.data.score)
        console.log(response.data.score)
        // setTeamScore(response.data.score);
              } catch (error) {
        console.error("Error fetching team score:", error);
      }
    };
    if (savedCode) setCode(savedCode);
    if (savedScore) setTeamScore(Number(savedScore));

    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/codestatment/problems"
        );
        setTasks(response.data); // Set tasks from API response
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    socket.current = io("http://localhost:5000");

  // Emit event to join the team room
    socket.current.emit("joinRoom", teamId);

  // Listen for incoming messages
    socket.current.on("message", (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });
  fetchTeamScore()
  fetchTasks()
  // Cleanup on component unmount
  return () => {
    socket.current.disconnect(); // Disconnect the socket when component is unmounted
  };
  }, [teamId,teamScore]);


  // useEffect(() => {
  //   const storageKey = `savedCode_page_${currentPage}`;
  //   const savedCode = localStorage.getItem(storageKey);
  
  //   if (savedCode) {
  //     setCode(savedCode); // Load the saved code for the current page
  //   } else {
  //     setCode("// Write your code here..."); // Default code template
  //   }
  // }, [currentPage]);
  
  const handleEditorChange = (value) => {
    setCode(value);
    // Save the code to localStorage when it changes
    localStorage.setItem("savedCode", value);
  };

  const getLanguageId = (language) => {
    const languages = { javascript: 63, python: 71, java: 62 };
    return languages[language] || 63; // Default to JavaScript
  };

 

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const submitCode = async () => {
//   setLoading(true);
//   setTestResults([]);

//   try {
//     const selectedTask = tasks[currentPage];
//     const testcases = selectedTask.testcases;
//     console.log(testcases)
//     const results = [];

//     for (const [index, testcase] of testcases.entries()) {
//       try {
//         const response = await axios.post(
//           "https://judge0-ce.p.rapidapi.com/submissions",
//           {
//             source_code: code,
//             language_id: getLanguageId(language),
//             stdin: testcase.input.trim(),
//             expected_output: testcase.output.trim(),
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "X-RapidAPI-Key": "97a2cfe742msh47f27778f669887p104fa4jsn1e20de95c67b",
//               "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//             },
//           }
//         );

//         const token = response.data.token;

//         // Wait before fetching the result
//         await sleep(200); // Add delay (200 ms)

//         const resultResponse = await axios.get(
//           `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
//           {
//             headers: {
//               "X-RapidAPI-Key": "97a2cfe742msh47f27778f669887p104fa4jsn1e20de95c67b",
//               "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//             },
//           }
//         );

//         const result = resultResponse.data;
//         const status = result.status.id === 3 ? "Passed" : "Failed";
//         const actualOutput = result.stdout?.trim() || "Error/No Output";

//         results.push({
//           input: testcase.input,
//           expected: testcase.output,
//           actual: actualOutput,
//           status,
//         });
//       } catch (innerError) {
//         console.error("Error evaluating testcase:", innerError.message);
//       }
//     }

//     setTestResults(results);

//     const passed = results.filter((result) => result.status === "Passed").length;
//     const scoreForThisTask = (passed / testcases.length) * 50;

//     // Update scores
//     setTaskScores((prevScores) => {
//       const updatedScores = { ...prevScores, [currentPage]: scoreForThisTask };
//       localStorage.setItem("taskScores", JSON.stringify(updatedScores));
//       return updatedScores;
//     });

//     setTeamScore(scoreForThisTask);

//     setOutput(`${passed}/${testcases.length} test cases passed. You earned ${scoreForThisTask} points.`);
//   } catch (error) {
//     setOutput(`Error evaluating testcase: ${error.message}`);
//   } finally {
//     setLoading(false);
//   }
// };

  

  // const sendMessage = () => {
  //   if (currentMessage.trim()) {
  //     const message = { teamId, content: currentMessage, sender: "You" };
  //     socket.current.emit("message", message);
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //     setCurrentMessage("");
  //   }
  // };
//   const fetchSubmissionResult = async (token) => {
//   let status;
//   let result;

//   while (true) {
//     const resultResponse = await axios.get(
//       `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
//       {
//         headers: {
//           "X-RapidAPI-Key": "97a2cfe742msh47f27778f669887p104fa4jsn1e20de95c67b",
//           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//         },
//       }
//     );

//     result = resultResponse.data;
//     status = result.status.id;

//     if (status === 3 || status > 3) break; // Status 3 = success, >3 = failure/error
//     await sleep(500); // Wait 500ms before the next poll
//   }

//   return result;
// };

//   const submitCode = async () => {
//     setLoading(true);
//     setTestResults([]);
  
//     try {
//       const selectedTask = tasks[currentPage];
//       const testcases = selectedTask.testcases;
  
//       // Prepare batch submission
//       const submissions = testcases.map((testcase) => ({
//         source_code: code,
//         language_id: getLanguageId(language),
//         stdin: testcase.input.trim(),
//         expected_output: testcase.output.trim(),
//       }));
  
//       const response = await axios.post(
//         "https://judge0-ce.p.rapidapi.com/submissions/batch",
//         { submissions },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-RapidAPI-Key": "97a2cfe742msh47f27778f669887p104fa4jsn1e20de95c67b",
//             "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//           },
//         }
//       );
  
//       const tokens = response.data.map((submission) => submission.token);
  
//       // Fetch results for all tokens
//       const results = await Promise.all(tokens.map(fetchSubmissionResult));
  
//       const formattedResults = results.map((result, index) => ({
//         input: testcases[index].input,
//         expected: testcases[index].output,
//         actual: result.stdout?.trim() || "Error/No Output",
//         status: result.status.id === 3 ? "Passed" : "Failed",
//       }));
  
//       setTestResults(formattedResults);
//       const passed = formattedResults.filter((r) => r.status === "Passed").length;
//       setOutput(`${passed}/${testcases.length} test cases passed.`);
//     } catch (error) {
//       setOutput(`Error evaluating testcase: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   const submitCode = async () => {
//   setLoading(true);
//   setTestResults([]);
//   try {
//     const selectedTask = tasks[currentPage];  
//     const testcases = selectedTask.testcases;

//     // Prepare batch submission
//     const submissions = testcases.map((testcase) => ({
//       source_code: code,
//       language_id: getLanguageId(language),
//       stdin: testcase.input.trim(),
//       expected_output: testcase.output.trim(),
//     }));

//     const response = await axios.post(
//       "https://judge0-ce.p.rapidapi.com/submissions/batch",
//       { submissions },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-RapidAPI-Key": "97a2cfe742msh47f27778f669887p104fa4jsn1e20de95c67b",
//           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//         },
//       }
//     );

//     const tokens = response.data.map((result) => result.token);

//     // Fetch results with delay
//     const results = [];
//     for (const token of tokens) {
//       await sleep(1000); // Wait 1 second
//       const resultResponse = await axios.get(
//         `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
//         {
//           headers: {
//             "X-RapidAPI-Key": "97a2cfe742msh47f27778f669887p104fa4jsn1e20de95c67b",
//             "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//           },
//         }
//       );
//       const result = resultResponse.data;
//       results.push({
//         input: testcases.find(tc => tc.token === token)?.input,
//         expected: testcases.find(tc => tc.token === token)?.expected_output,
//         actual: result.stdout?.trim() || "Error/No Output",
//         status: result.status.id === 3 ? "Passed" : "Failed",
//       });
//     }

//     setTestResults(results);
//     setOutput(`${results.filter(r => r.status === "Passed").length}/${testcases.length} test cases passed.`);
//   } catch (error) {
//     setOutput(`Error evaluating testcase: ${error.message}`);
//   } finally {
//     setLoading(false);
//   }
// };

  const sendMessage = () => {
      const message = { teamId, content: currentMessage, sender: user.username };
      socket.current.emit("message", message); // Emit to the server
      setMessages((prevMessages) => [...prevMessages, message]); // Update local message list
      setCurrentMessage(""); 
      console.log(messages)// Clear the input
    
  };
  
  const submitCode = async () => {
    setLoading(true);
    setTestResults([]);
    try {
      const selectedTask = tasks[currentPage];
      const taskId = currentPage;
      const testcases = selectedTask.testcases;
  
      const submissions = testcases.map((testcase) => ({
        source_code: code,
        language_id: getLanguageId(language),
        stdin: testcase.input.trim(),
        expected_output: testcase.output.trim(),
      }));
  
      // Submit batch
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions/batch",
        { submissions },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "4de953dca3msh9e69eb61e89af05p1b21a7jsn7ebf34d234a5",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
  
      const tokens = response.data.map((submission) => submission.token);
  
      // Fetch results
      const results = await Promise.all(
        tokens.map(async (token) => {
          let status, result;
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
            status = result.status.id;
            if (status === 3 || status > 3) break; // Success or error
            await sleep(500); // Wait 500ms before retrying
          }
          return result;
        })
      );
  
      // Calculate and update task score
      const questionMaxScore = 100; // Maximum score per question
      const testcaseScore = questionMaxScore / testcases.length; // Score per test case
  
      const updatedScores = { ...taskScores };
  
      if (!updatedScores[taskId]) {
        updatedScores[taskId] = { score: 0, passedInputs: new Set() };
      }
  
      let taskScore = updatedScores[taskId].score;
      const passedInputs = updatedScores[taskId].passedInputs;
  
      results.forEach((result, index) => {
        const input = testcases[index].input;
        const passed = result.status.id === 3;
  
        if (passed && !passedInputs.has(input)) {
          taskScore += testcaseScore;
          passedInputs.add(input);
        }
      });
  
      updatedScores[taskId] = { score: taskScore, passedInputs };
      setTaskScores(updatedScores);

      // Calculate and update total team score
      const totalTeamScore = Object.values(updatedScores).reduce((total, task) => total + task.score, 0);
      await axios.put(`http://localhost:5000/api/contest/team/${teamId}/score`, { score:totalTeamScore });

      // Display results
      const formattedResults = results.map((result, index) => ({
        input: testcases[index].input,
        expected: testcases[index].output.trim(),
        actual: result.stdout?.trim() || "Error/No Output",
        status: result.status.id === 3 ? "Passed" : "Failed",
      }));
  
      setTestResults(formattedResults);
      const totalPassed = formattedResults.filter((result) => result.status === "Passed").length;
      setOutput(
        `${totalPassed}/${testcases.length} test cases passed. Task Score: ${taskScore}`
      );
    } catch (error) {
      setOutput(`Error evaluating test cases: ${error.message}`);
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  
  
  
  const handlePagination = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < tasks.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const finish = async () => {
    try {
      const score = teamScore; 
      const response = await axios.put(`http://localhost:5000/api/contest/team/${teamId}/score`, { score });

      if (response.status === 200) {
        console.log("Team score updated successfully");
        navigate(`/contest/${contestId}/result/${teamId}`);
      } else {
        console.error("Failed to update score");
      }
    } catch (error) {
      console.error("Error updating team score:", error);
    }
  };

 

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4  bg-gray-100 border-b">
        <h1 className="text-xl font-semibold">Code Battle 2024</h1>  
        <div><HelpPopup/></div>

        {/* Pagination */}
        <div className="p-4  flex justify-center gap-10 items-center">
          <div className="text-lg">Score: {teamScore}</div>
          <button
            onClick={() => handlePagination("prev")}
            className="px-4 py-2 mx-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Task ${currentPage + 1} of ${tasks.length}`}</span>
          <button
            onClick={() => handlePagination("next")}
            className="px-4 py-2 mx-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            disabled={currentPage === tasks.length - 1}
          >
            Next
          </button>
        </div>

        {/* Finish Button */}
        <div className="p-4  flex justify-center gap-10">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          <button
            onClick={finish}
            className="px-6 py-3 bg-blue-500 text-white rounded-md"
          >
            Finish
          </button>
        </div>
      </div>
  {/**Qusetion Display */}
  <div className="flex-1 flex justify-center bg-gray-200 w-full">
  {/* Test Cases */}
  <div className="flex flex-col gap-4 justify-between p-4 w-2/5 border-r-2 border-gray-400">
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{tasks[currentPage]?.title}</h2>
      <p>{tasks[currentPage]?.statement}</p>
      <p>{tasks[currentPage]?.explanation}</p>
      <p>{tasks[currentPage]?.description}</p>
    </div>
    {/* Display Test Cases */}
    <div className="p-4 flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Test Cases</h3>
      {tasks[currentPage]?.testcases?.length > 0 ? (
        tasks[currentPage].testcases.map((testcase, index) => (
          <div
            key={index}
            className="bg-gray-100 p-2 border rounded-md shadow-sm"
          >
            <p>
              <strong>Input:</strong> {testcase.input}
            </p>
            <p>
              <strong>Expected Output:</strong> {testcase.output}
            </p>
          </div>
        ))
      ) : (
        <p>No test cases available.</p>
      )}
    </div>
    <div className="p-4 flex gap-2 justify-between">
      <button
        onClick={submitCode}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit Code
      </button>
    </div>
  </div>

  {/* Code Editor */}
    <div className="w-full max-w-3/5 py-2 px-1">
    <Editor
      height="500px"
     language={language}
      value={code}
      onChange={handleEditorChange}
    />
     </div>
  </div>


      {/* Output */}
      <div className="bg-gray-100 px-4 py-2 flex justify-between">
        <div className="flex flex-col gap-4 w-full">
    <h2 className="text-xl font-semibold">Test Output</h2>

    {/* Table for test case results */}
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2 text-left">Input</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Expected Output</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Actual Output</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {testResults.length > 0 ? (
          testResults.map((result, index) => (
            <tr key={index} className={result.status === "Passed" ? "bg-green-100" : "bg-red-100"}>
              <td className="border border-gray-300 px-4 py-2">{result.input}</td>
              <td className="border border-gray-300 px-4 py-2">{result.expected}</td>
              <td className="border border-gray-300 px-4 py-2">{result.actual}</td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">{result.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
              No results available
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* Raw Output */}
    <pre className="mt-4 p-4 bg-gray-200 rounded-md overflow-auto">
      {output || "No output available"}
    </pre>
         </div>
      {/* Chat Section */}
        <div className="flex flex-col gap-1 p-2 w-2/5 bg-violet-100 rounded-xl border-l-2 border-violet-100">
    <h2 className="text-xl font-semibold">Team Bashes</h2>
    <div className="flex flex-col bg-gray-200 p-4 h-52 overflow-auto">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <p>{msg.sender}:</p> <p>{msg.content}</p>
        </div>
      ))}
    </div>
    <div className="flex gap-2">
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        className="px-4 py-2 w-[73%] border rounded-md"
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Send
      </button>
    </div>
        </div>
      </div>


    </div>
  );
};

export default CodeEditor;

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [task, setTask] = useState("");
  const [aiData, setAiData] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [priority, setPriority] = useState(null);

  const handleAssist = async () => {
    setAllTasks([...allTasks, task]);

    try {
      const response = await axios.post(
        "http://localhost:5678/webhook/assistTask",
        { task }
      );
      console.log(response);
      setAiData([...aiData, response.data.task]);
      setTask("");
    } catch (err) {
      console.log(err);
    }
  };

  const prioritizeTasks = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5678/webhook/prioritizeTasks",
        { allTasks }
      );
      console.log(response);
      setAiData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>AI Powered To-Do</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleAssist}>AI Assist</button>

      {allTasks.length && (
          <button onClick={prioritizeTasks}>Prioritize</button>
        ) 
       }

        {allTasks.length &&  aiData.map((t) => {
          return <p>{t.task}</p>;
        })}

        {setPriority && <p>{setPriority.clarified_task}</p>}

      {/* {aiData && (
        <div style={{ marginTop: "20px" }}>
          {aiData.task} | {aiData.priority}
        </div>
      )} */}
    </div>
  );
};

export default App;

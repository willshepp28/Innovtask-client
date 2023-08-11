import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    const fetchTaskAndSubtasks = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}tasks/${id}/subtasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch task and subtasks");
        }

        const data = await response.json();
        setTask(data.taskTitle);
        setSubtasks(data.subtasks);
      } catch (error) {
        console.error("There was an error fetching task and subtasks:", error);
      }
    };

    fetchTaskAndSubtasks();
  }, [id]);

  return (
    <div>
      <h3>Task Title: {task}</h3>
      <h3>Subtasks:</h3>
      <ul>
        {subtasks.length ? (
          subtasks.map((subtask) => <li key={subtask.id}>{subtask.name}</li>)
        ) : (
          <h1>You have no Sub tasks at the moment!!!</h1>
        )}
      </ul>
    </div>
  );
}

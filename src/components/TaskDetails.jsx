import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [subTaskData, setSubTaskData] = useState([]);
  const [newSubTaskData, setNewSubTaskData] = useState({
    title: ''
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('submitting')
  }

  return (
    <div>
      <h3>Task Title: {task}</h3>

      <ul>
        {subtasks.length ? (
          <>
            <h1>Subtasks</h1>
            {subtasks.map((subtask) => (
              <li key={subtask.id}>{subtask.name}</li>
            ))}
          </>
        ) : (
          <span>You have no Sub tasks at the moment!!!</span>
        )}
      </ul>
      <button onClick={() => setModalOpen(true)}>Create a new subtask</button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={newSubTaskData.title}
                onChange={(event) => setNewSubTaskData((previousSubtask) => ({
                    ...previousSubtask,
                    title: event.target.value
                  
                }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Create Task
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Make sure to import the Modal component

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("There was an error fetching tasks:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      fetchTasks(); // Refresh the task list after adding a new one
      setModalOpen(false); // Close the modal after successful submission
    } catch (error) {
      console.error("There was an error creating the task:", error);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button className="btn btn-primary mb-4 mt-6 create-task-button" onClick={() => setModalOpen(true)}>
        Create Task
      </button>
      {tasks.length ? (
        tasks.map((task) => (
          <div className="card p-0 mb-4" key={task.id}>
            <h5 className="card-header">{task.title}</h5>
            <div className="card-body">
              <p className="card-text">{task.description}</p>
              <button className="btn btn-primary" onClick={() => navigate(`/task/${task.id}`)}>
                View Subtasks
              </button>
            </div>
          </div>
        ))
      ) : (
        <>
          <p>You have no tasks scheduled!</p>
        </>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2>Create New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={taskData.title}
                onChange={(event) => setTaskData((previous) => ({ ...previous, title: event.target.value }))}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={taskData.description}
                onChange={(e) => setTaskData((previous) => ({ ...previous, description: event.target.value }))}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={taskData.priority}
                onChange={(event) => setTaskData((previous) => ({ ...previous, priority: event.target.value }))}
                required
              >
                <option value="">Select a priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              Create Task
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

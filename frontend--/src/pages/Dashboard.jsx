import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const navigate = useNavigate()

    const authUser = JSON.parse(localStorage.getItem("authUser"))
    const token = authUser?.token

    const [tasks, setTasks] = useState([])
    const [taskInput, setTaskInput] = useState("")

    // 🔹 Fetch tasks from backend and normalize
    function fetchTasks() {
        fetch("http://localhost:5000/v1/api/tasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch tasks")
                return res.json()
            })
            .then(data => {
                console.log("TASKS RESPONSE 👉", data)
                
                // Handle different response structures
                let tasksArray = []
                
                if (Array.isArray(data)) {
                    tasksArray = data
                } else if (data.data && Array.isArray(data.data)) {
                    tasksArray = data.data
                } else if (data.tasks && Array.isArray(data.tasks)) {
                    tasksArray = data.tasks
                }

                const normalizedTasks = tasksArray.map(task => ({
                    _id: task._id || task.id,
                    title: task.title || "",
                    completed: task.completed || false,
                }))

                setTasks(normalizedTasks)
            })
            .catch(err => console.error("Fetch tasks error:", err))
    }

    // 🔹 Initial load
    useEffect(() => {
        if (!token) {
            navigate("/login")
            return
        }
        fetchTasks()
    }, [])

    // 🔹 Add task
    function handleAddTask(e) {
        e.preventDefault()
        if (!taskInput.trim()) return

        fetch("http://localhost:5000/v1/api/tasks/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: taskInput }),
        })
            .then(res => {
                if (!res.ok) throw new Error("Task creation failed")
                return res.json()
            })
            .then((response) => {
                console.log("CREATE TASK RESPONSE 👉", response)
                setTaskInput("")
                fetchTasks() // refresh tasks from backend
            })
            .catch(err => console.error("Create task error:", err))
    }

    // 🔹 Delete task
    function deleteTask(id) {
        fetch(`http://localhost:5000/v1/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Delete failed")
                return res.json()
            })
            .then(() => {
                fetchTasks() // refresh tasks
            })
            .catch(err => console.error("Delete task error:", err))
    }

    // 🔹 Logout
    function handleLogout() {
        localStorage.removeItem("authUser")
        navigate("/login")
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>
                    Welcome, {authUser?.user?.name || authUser?.name}
                </h2>

                <form onSubmit={handleAddTask} style={styles.form}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Add a task..."
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                    />
                    <button type="submit" style={styles.addBtn}>Add</button>
                </form>

                <div style={styles.taskList}>
                    {tasks.length === 0 && (
                        <p style={styles.empty}>No tasks yet</p>
                    )}

                    {tasks.map(task => (
                        <div key={task._id} style={styles.task}>
                            <span style={styles.taskText}>
                                {task.title}
                            </span>
                            <button
                                onClick={() => deleteTask(task._id)}
                                style={styles.deleteBtn}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        </div>
    )
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },

  card: {
    backgroundColor: "#020617",
    padding: "28px",
    borderRadius: "14px",
    width: "380px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    color: "#e5e7eb",
  },

  heading: {
    textAlign: "center",
    fontSize: "22px",
    marginBottom: "16px",
  },

  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    outline: "none",
    fontSize: "14px",
  },

  addBtn: {
    padding: "10px 14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },

  taskList: {
    marginBottom: "16px",
  },

  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    backgroundColor: "#020617",
    borderRadius: "8px",
    marginBottom: "8px",
    border: "1px solid #1e293b",
  },

  taskText: {
    cursor: "pointer",
    fontSize: "14px",
  },

  deleteBtn: {
    background: "none",
    border: "none",
    color: "#ef4444",
    fontSize: "16px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    fontSize: "13px",
    color: "#94a3b8",
    fontStyle: "italic",
  },

  logoutBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

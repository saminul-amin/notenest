import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false,
      subtasks: [],
      subtaskInput: "",
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSubtaskInputChange = (taskId, value) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, subtaskInput: value } : task
      )
    );
  };

  const addSubtask = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId && task.subtaskInput.trim()) {
          const newSubtask = {
            id: Date.now(),
            title: task.subtaskInput,
            completed: false,
          };
          return {
            ...task,
            subtasks: [...task.subtasks, newSubtask],
            subtaskInput: "",
          };
        }
        return task;
      })
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      )
    );
  };

  return (
    <div className="bg-gray-300 h-screen">
      <div className="max-w-2xl mx-auto p-4">
        <motion.h1
          className="text-2xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📝 Todo List
        </motion.h1>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Add new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={addTask}
            className="bg-stone-500 text-white px-4 py-2 rounded-lg hover:bg-stone-700 cursor-pointer"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                className="border p-4 rounded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-stone-400 flex items-center justify-center transition-colors peer-checked:bg-stone-500 peer-checked:border-stone-500">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <motion.span
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                    initial={false}
                    animate={{ opacity: task.completed ? 0.5 : 1 }}
                  >
                    {task.title}
                  </motion.span>
                </label>

                <div className="ml-6 mt-2">
                  <AnimatePresence>
                    {task.subtasks.map((subtask) => (
                      <motion.label
                        key={subtask.id}
                        className="flex items-center gap-2 text-sm cursor-pointer group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        layout
                      >
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => toggleSubtask(task.id, subtask.id)}
                          className="hidden peer"
                        />
                        <span className="w-4 h-4 rounded-full border-2 border-stone-400 flex items-center justify-center transition-colors peer-checked:bg-stone-500 peer-checked:border-stone-500">
                          <svg
                            className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <motion.span
                          className={
                            subtask.completed
                              ? "line-through text-gray-500"
                              : ""
                          }
                          initial={false}
                          animate={{ opacity: subtask.completed ? 0.5 : 1 }}
                        >
                          {subtask.title}
                        </motion.span>
                      </motion.label>
                    ))}
                  </AnimatePresence>

                  <div className="flex mt-2 gap-2">
                    <input
                      type="text"
                      placeholder="Add subtask..."
                      value={task.subtaskInput}
                      onChange={(e) =>
                        handleSubtaskInputChange(task.id, e.target.value)
                      }
                      className="flex-1 border rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => addSubtask(task.id)}
                      className="bg-stone-500 text-white px-4 py-2 rounded-lg hover:bg-stone-700 cursor-pointer"
                    >
                      Add Subtask
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;

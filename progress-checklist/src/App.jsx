import React, { useState, useEffect } from 'react';
import './ProgressChecklist.css';

const ProgressChecklist = () => {
  const initialTasks = [
    { id: 1, phase: 1, text: "Express.js fundamentals: routing, middleware, error handling, request/response cycle", daily: false },
    { id: 2, phase: 1, text: "Database integration: MongoDB with Mongoose OR PostgreSQL with Sequelize/Prisma", daily: false },
    { id: 3, phase: 1, text: "Build REST APIs: CRUD operations, proper status codes, request validation (Joi/Zod)", daily: false },
    { id: 4, phase: 1, text: "Authentication & authorization: JWT tokens, bcrypt password hashing, protected routes", daily: false },
    { id: 5, phase: 1, text: "API security: CORS, helmet, rate limiting, input sanitization", daily: false },
    { id: 6, phase: 1, text: "Testing basics: Jest or Mocha for unit tests, Supertest for API testing", daily: false },
    { id: 7, phase: 1, text: "Environment variables, config management (.env files), error logging", daily: false },
    { id: 8, phase: 1, text: "Learn about async patterns, promises, error handling in Node.js", daily: false },
    { id: 9, phase: 2, text: "Project 1: Full-stack CRUD app (React/Vue frontend + Node.js backend + database) - e.g., task manager, expense tracker, social feed", daily: false },
    { id: 10, phase: 2, text: "Project 2: REST API with authentication - e.g., blog API, e-commerce backend, booking system with user login", daily: false },
    { id: 11, phase: 2, text: "Project 3: Something unique or interesting - real-time chat app (Socket.io), API aggregator, job board, etc.", daily: false },
    { id: 12, phase: 2, text: "Add tests to at least one project (show you understand testing)", daily: false },
    { id: 13, phase: 2, text: "Deploy all projects (backend: Railway/Render/Fly.io, frontend: Vercel/Netlify)", daily: false },
    { id: 14, phase: 2, text: "Write excellent READMEs: screenshots/demo, features list, tech stack, setup instructions, challenges faced", daily: false },
    { id: 15, phase: 2, text: "Clean up code: good variable names, comments where needed, consistent formatting", daily: false },
    { id: 16, phase: 3, text: "Solve 2-3 LeetCode problems today", daily: true },
    { id: 17, phase: 3, text: "Complete 50-75 total LeetCode problems: arrays, strings, hashmaps, two pointers", daily: false },
    { id: 18, phase: 3, text: "Practice medium LeetCode: trees, graphs, recursion, dynamic programming basics", daily: false },
    { id: 19, phase: 3, text: "Master common patterns: sliding window, two pointers, DFS/BFS, backtracking", daily: false },
    { id: 20, phase: 3, text: "Learn Big O notation and analyze time/space complexity of your solutions", daily: false },
    { id: 21, phase: 3, text: "Practice explaining your projects: features, tech choices, challenges overcome, what you'd improve", daily: false },
    { id: 22, phase: 3, text: "Study Node.js interview topics: event loop, streams, buffers, clustering, how Node.js works", daily: false },
    { id: 23, phase: 3, text: "System design basics: REST vs GraphQL, caching, load balancing, database choices, API design", daily: false },
    { id: 24, phase: 3, text: "Behavioral prep: prepare STAR stories for teamwork, challenges, failures, successes", daily: false },
    { id: 25, phase: 3, text: "Do mock interviews on Pramp or with friends - practice coding on a whiteboard/screen share", daily: false },
    { id: 26, phase: 4, text: "Polish your resume: highlight projects prominently, quantify impact, keep it to 1 page", daily: false },
    { id: 27, phase: 4, text: "Update LinkedIn: professional photo, detailed project descriptions, skills section, custom URL", daily: false },
    { id: 28, phase: 4, text: "Create a portfolio website showcasing your 3 projects with live demos", daily: false },
    { id: 29, phase: 4, text: "Apply to 3-5 jobs today", daily: true },
    { id: 30, phase: 4, text: "Customize cover letters - mention specific projects relevant to each job", daily: false },
    { id: 31, phase: 4, text: "Network on LinkedIn today: connect with 2-3 people, comment on posts", daily: true },
    { id: 32, phase: 4, text: "Attend local meetups, hackathons, or tech events (great for networking)", daily: false },
    { id: 33, phase: 4, text: "Contribute to open source - even small PRs show you can work with codebases", daily: false },
    { id: 34, phase: 4, text: "Follow up on applications after 1 week, prepare thank-you emails after interviews", daily: false },
    { id: 35, phase: 4, text: "Spend 30 mins learning something new today (article, video, documentation)", daily: true },
  ];

  const phases = [
    { id: 1, title: "Master Node.js Backend", subtitle: "4-6 weeks | Your core backend skill" },
    { id: 2, title: "Build 3 Portfolio Projects", subtitle: "6-8 weeks | Show employers what you can do" },
    { id: 3, title: "Interview Preparation", subtitle: "6-8 weeks (parallel with projects) | Get interview-ready" },
    { id: 4, title: "Job Search & Applications", subtitle: "Ongoing | Land that role" },
  ];

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('reactProgressChecklist');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if we need to reset daily tasks
      const today = new Date().toDateString();
      if (parsed.lastReset !== today) {
        const updatedCompleted = { ...parsed.completed };
        initialTasks.forEach(task => {
          if (task.daily) {
            updatedCompleted[task.id] = false;
          }
        });
        return { ...parsed, completed: updatedCompleted, lastReset: today };
      }
      return parsed;
    }
    return { completed: {}, texts: {}, lastReset: new Date().toDateString() };
  });

  const [customTasks, setCustomTasks] = useState(() => {
    const saved = localStorage.getItem('reactProgressChecklistCustom');
    return saved ? JSON.parse(saved) : [];
  });

  const [deletedTasks, setDeletedTasks] = useState(() => {
    const saved = localStorage.getItem('reactProgressChecklistDeleted');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('reactProgressChecklist', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('reactProgressChecklistCustom', JSON.stringify(customTasks));
  }, [customTasks]);

  useEffect(() => {
    localStorage.setItem('reactProgressChecklistDeleted', JSON.stringify(deletedTasks));
  }, [deletedTasks]);

  const toggleTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      completed: {
        ...prev.completed,
        [taskId]: !prev.completed[taskId]
      }
    }));
  };

  const updateTaskText = (taskId, newText) => {
    setTasks(prev => ({
      ...prev,
      texts: {
        ...prev.texts,
        [taskId]: newText
      }
    }));
  };

  const resetDailyTasks = () => {
    const updatedCompleted = { ...tasks.completed };
    initialTasks.forEach(task => {
      if (task.daily) {
        updatedCompleted[task.id] = false;
      }
    });
    setTasks(prev => ({
      ...prev,
      completed: updatedCompleted,
      lastReset: new Date().toDateString()
    }));
  };

  const addNewTask = (phaseId) => {
    const newTask = {
      id: Date.now(),
      phase: phaseId,
      text: '',
      daily: false,
      isCustom: true
    };
    setCustomTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (taskId, isCustom) => {
    if (isCustom) {
      setCustomTasks(prev => prev.filter(task => task.id !== taskId));
    } else {
      setDeletedTasks(prev => [...prev, taskId]);
    }
    setTasks(prev => {
      const { [taskId]: _, ...remainingCompleted } = prev.completed;
      const { [taskId]: __, ...remainingTexts } = prev.texts;
      return {
        ...prev,
        completed: remainingCompleted,
        texts: remainingTexts
      };
    });
  };

  const allTasks = [...initialTasks.filter(task => !deletedTasks.includes(task.id)), ...customTasks];
  const completedCount = Object.values(tasks.completed).filter(Boolean).length;
  const totalCount = allTasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="app-container">
      <div className="main-card">
        {/* Header */}
        <div className="header">
          <h1>Progress Checklist</h1>
          <p>Node.js → Projects → Interviews → Job</p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* Controls */}
          <div className="controls">
            <div className="controls-text">
              💡 <strong>Daily tasks</strong> reset each day. <strong>Regular tasks</strong> stay checked. Click text to edit any task!
            </div>
            <button onClick={resetDailyTasks} className="reset-button">
              Reset Daily Tasks
            </button>
          </div>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">{completedCount}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{totalCount}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{percentage}%</div>
              <div className="stat-label">Progress</div>
            </div>
          </div>

          {/* Phases */}
          {phases.map(phase => (
            <div key={phase.id} className="phase-container">
              <div className="phase-header">
                <div className="phase-number">
                  {phase.id}
                </div>
                <div className="phase-title">{phase.title}</div>
              </div>
              <div className="phase-subtitle">{phase.subtitle}</div>

              {/* Tasks for this phase */}
              {allTasks.filter(task => task.phase === phase.id).map(task => (
                <Task
                  key={task.id}
                  task={task}
                  completed={tasks.completed[task.id]}
                  customText={tasks.texts[task.id]}
                  onToggle={() => toggleTask(task.id)}
                  onTextChange={(newText) => updateTaskText(task.id, newText)}
                  onDelete={() => deleteTask(task.id, task.isCustom)}
                />
              ))}

              {/* Add New Task Button */}
              <button onClick={() => addNewTask(phase.id)} className="add-task-button">
                <span className="add-task-icon">+</span>
                Add task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Task = ({ task, completed, customText, onToggle, onTextChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(task.text === '');
  const [editText, setEditText] = useState(customText || task.text);

  const handleBlur = () => {
    setIsEditing(false);
    if (editText !== task.text) {
      onTextChange(editText);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`task-row ${completed ? 'completed' : ''}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div
        onClick={onToggle}
        className={`task-checkbox ${completed ? 'checked' : ''}`}
      >
        {completed && <span className="task-checkbox-icon">✓</span>}
      </div>
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="task-input"
        />
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className={`task-text ${completed ? 'completed' : ''}`}
        >
          {customText || task.text}
        </div>
      )}
      
      {task.daily && (
        <span className="daily-badge">
          Daily
        </span>
      )}

      {isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="delete-button"
          title="Delete task"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ProgressChecklist;
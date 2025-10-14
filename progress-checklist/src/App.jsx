import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    localStorage.setItem('reactProgressChecklist', JSON.stringify(tasks));
  }, [tasks]);

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

  const completedCount = Object.values(tasks.completed).filter(Boolean).length;
  const totalCount = initialTasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      background: '#f5f5f5',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: '#ffffff',
          color: '#1f2937',
          padding: '30px',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Progress Checklist</h1>
          <p style={{ opacity: 0.9, fontSize: '16px', margin: 0 }}>Node.js → Projects → Interviews → Job</p>
          <div style={{
            background: '#e5e7eb',
            height: '8px',
            borderRadius: '4px',
            marginTop: '20px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#6366f1',
              height: '100%',
              width: `${percentage}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {/* Controls */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            padding: '15px',
            background: '#fef3c7',
            borderRadius: '8px',
            borderLeft: '4px solid #fbbf24'
          }}>
            <div style={{ flex: 1, fontSize: '14px', color: '#78350f' }}>
              💡 <strong>Daily tasks</strong> reset each day. <strong>Regular tasks</strong> stay checked. Click text to edit any task!
            </div>
            <button 
              onClick={resetDailyTasks}
              style={{
                background: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseOver={(e) => e.target.style.background = '#4b5563'}
              onMouseOut={(e) => e.target.style.background = '#6b7280'}
            >
              Reset Daily Tasks
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '30px',
            padding: '20px',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6366f1' }}>{completedCount}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Completed</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6366f1' }}>{totalCount}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Total Tasks</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6366f1' }}>{percentage}%</div>
              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Progress</div>
            </div>
          </div>

          {/* Phases */}
          {phases.map(phase => (
            <div key={phase.id} style={{
              marginBottom: '30px',
              borderLeft: '4px solid #d1d5db',
              paddingLeft: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{
                  background: '#9ca3af',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '12px',
                  fontSize: '14px'
                }}>
                  {phase.id}
                </div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>{phase.title}</div>
              </div>
              <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>{phase.subtitle}</div>
              
              {/* Tasks for this phase */}
              {initialTasks.filter(task => task.phase === phase.id).map(task => (
                <Task 
                  key={task.id}
                  task={task}
                  completed={tasks.completed[task.id]}
                  customText={tasks.texts[task.id]}
                  onToggle={() => toggleTask(task.id)}
                  onTextChange={(newText) => updateTaskText(task.id, newText)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Task = ({ task, completed, customText, onToggle, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(customText || task.text);

  const handleBlur = () => {
    setIsEditing(false);
    if (editText !== task.text) {
      onTextChange(editText);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '8px',
      transition: 'background 0.2s',
      opacity: completed ? 0.6 : 1,
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div 
        onClick={onToggle}
        style={{
          width: '20px',
          height: '20px',
          border: '2px solid #d1d5db',
          borderRadius: '4px',
          marginRight: '12px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          cursor: 'pointer',
          background: completed ? '#9ca3af' : 'transparent',
          borderColor: completed ? '#9ca3af' : '#d1d5db'
        }}
      >
        {completed && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
      </div>
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{
            flex: 1,
            color: '#374151',
            lineHeight: '1.5',
            padding: '2px 4px',
            borderRadius: '4px',
            border: '2px solid #d1d5db',
            background: '#f9fafb',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      ) : (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          style={{
            flex: 1,
            color: '#374151',
            lineHeight: '1.5',
            padding: '2px 4px',
            borderRadius: '4px',
            cursor: 'text',
            minHeight: '24px',
            textDecoration: completed ? 'line-through' : 'none'
          }}
        >
          {customText || task.text}
        </div>
      )}
      
      {task.daily && (
        <span style={{
          background: '#fbbf24',
          color: '#78350f',
          fontSize: '10px',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: '600',
          marginLeft: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Daily
        </span>
      )}
    </div>
  );
};

export default ProgressChecklist;
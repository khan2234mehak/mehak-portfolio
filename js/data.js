/* ============================================================
   EDIT YOUR CONTENT HERE - the UI reads everything from this file.
   Set a URL to null to show a disabled "coming soon" button.
   ============================================================ */
window.PORTFOLIO = {
  config: {
    name: "Mehak Khan",
    headline: "Full Stack Developer | Data Science & Machine Learning Enthusiast",
    tagline: "Building scalable web applications, AI-powered solutions, data-driven systems and machine learning applications.",
    location: "New Delhi, India",
    email: "mehakkhan020503@gmail.com",
    github: "https://github.com/khan2234mehak",
    linkedin: "https://www.linkedin.com/in/mehak-khan-a08965354", // verify this URL once
    resume: "assets/Mehak_Khan_Resume.pdf",
    profileImage: "assets/profile.jpg", // put your photo here (falls back to initials)
    // Optional: paste a Formspree/Getform endpoint to receive messages directly.
    // Leave "" to open the visitor's mail app instead.
    formEndpoint: ""
  },

  filters: ["All", "Full Stack", "AI", "Machine Learning", "Data Science", "Python", "Computer Vision"],

  projects: [
    {
      id: "pulseboard", number: "01",
      title: "Pulseboard", subtitle: "Enterprise Project Management System",
      category: "Full Stack Development",
      filters: ["Full Stack"],
      short: "A Jira / Trello / Asana-style platform for projects, teams, tasks and real-time collaboration.",
      description: "A full-stack project management platform inspired by Jira, Trello and Asana for managing projects, teams, tasks and real-time collaboration.",
      problem: "Teams that track projects, tasks and conversations in separate tools lose context and visibility.",
      solution: "One workspace with role-based access, a drag-and-drop Kanban board, live updates over WebSockets, and exportable reports.",
      tech: {
        "Frontend": ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Axios", "React DnD", "Recharts", "Socket.IO"],
        "Backend": ["Node.js", "Express.js", "JWT", "bcrypt", "Socket.IO", "Multer", "Nodemailer"],
        "Database": ["SQLite"],
        "Reports": ["ExcelJS", "PDFKit"]
      },
      features: ["JWT authentication & role-based authorization", "Email verification & password reset", "Project CRUD and team management", "Kanban board with drag and drop", "Priorities, due dates, assignments, subtasks", "Comments, mentions and file attachments", "Real-time notifications and updates", "Search, filtering and sorting", "Analytics: project progress and team metrics", "Excel and PDF report export", "User management and avatar uploads"],
      workflow: ["User", "React UI", "REST API + Socket.IO", "SQLite", "Live updates & reports"],
      architecture: [
        { layer: "Client", items: ["React", "Redux Toolkit", "React DnD", "Recharts"] },
        { layer: "API", items: ["Express.js", "JWT auth", "Socket.IO", "Multer uploads"] },
        { layer: "Data & reports", items: ["SQLite", "Nodemailer", "ExcelJS", "PDFKit"] }
      ],
      results: [],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: "https://pulseboard-ten-khaki.vercel.app"
    },
    {
      id: "resumatic", number: "02",
      title: "Resumatic", subtitle: "AI Resume Analyzer & Job Match Engine",
      category: "AI / NLP / Full Stack",
      filters: ["AI", "Full Stack", "Python"],
      short: "Scores resumes for ATS readiness and matches them against job descriptions with explainable NLP.",
      description: "An AI-powered resume analysis platform that evaluates resumes, calculates ATS readiness and compares resumes against job descriptions.",
      problem: "Candidates rarely know why a resume is filtered out or which skills a job description expects them to show.",
      solution: "Upload a PDF or DOCX, get parsed details, an ATS score with feedback, and a match report with matching and missing skills.",
      note: "Resumatic uses explainable, classical NLP - TF-IDF vectors with cosine similarity plus regex and keyword matching. It is not a black-box language model, so every score can be traced back to the words that produced it.",
      tech: {
        "Frontend": ["React", "Vite", "Tailwind CSS", "React Router", "Zustand", "Recharts", "Framer Motion", "React Dropzone"],
        "Backend": ["Flask", "SQLAlchemy", "Flask-JWT-Extended", "Flask-Bcrypt", "Flask-CORS"],
        "AI / NLP": ["Python", "Scikit-learn", "TF-IDF", "Cosine Similarity", "Regex extraction", "Keyword matching"]
      },
      features: ["Registration, login and JWT authentication", "Drag-and-drop PDF / DOCX upload", "Parsing: name, email, phone, skills, education, experience", "ATS score with breakdown and feedback", "Job description analysis and match percentage", "Matching skills, missing skills and skill-gap analysis", "Dashboard with ATS score trends, match history and resume history"],
      workflow: ["Upload resume", "Parse & extract", "TF-IDF + cosine similarity", "ATS score & match", "Skill-gap report"],
      architecture: [
        { layer: "Client", items: ["React + Vite", "Zustand", "Recharts", "Framer Motion"] },
        { layer: "API", items: ["Flask", "JWT auth", "SQLAlchemy"] },
        { layer: "NLP engine", items: ["Regex extraction", "TF-IDF", "Cosine similarity", "Keyword matching"] }
      ],
      results: [],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: null
    },
    {
      id: "propwise", number: "03",
      title: "PropWise", subtitle: "AI House Price Prediction",
      category: "Machine Learning / AI",
      filters: ["Machine Learning", "AI", "Python"],
      short: "Predicts property prices from property characteristics and generates downloadable PDF reports.",
      description: "An AI-powered house price prediction application that predicts property prices based on property characteristics and generates downloadable prediction reports.",
      problem: "Estimating a fair property price by hand is slow and inconsistent.",
      solution: "A Gradient Boosting regression model behind a JWT-secured Flask API, with prediction history, a confidence score and a PDF report per prediction.",
      tech: {
        "Backend": ["Python", "Flask", "Flask-CORS", "Flask-JWT-Extended", "Flask-Bcrypt"],
        "ML": ["Scikit-learn", "NumPy", "Pandas", "Joblib"],
        "Data & reports": ["SQLite", "ReportLab"]
      },
      features: ["Location-based house price prediction", "Feature engineering and StandardScaler normalization", "Confidence score for each prediction", "Prediction history per user", "PDF report generation", "User authentication", "Admin panel with user management and login logs"],
      workflow: ["Property input", "Data processing", "ML model", "Predicted price", "Confidence", "PDF report"],
      architecture: [
        { layer: "Client", items: ["Web interface", "Prediction form", "History view"] },
        { layer: "API", items: ["Flask", "JWT auth", "Flask-CORS"] },
        { layer: "ML & storage", items: ["Gradient Boosting", "StandardScaler", "Joblib", "SQLite", "ReportLab"] }
      ],
      results: ["Gradient Boosting regression model with feature engineering", "Deployed as a JWT-secured Flask API with PDF reports"],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: "https://propwise-ai-house-price-prediction.onrender.com"
    },
    {
      id: "storytime", number: "04",
      title: "Storytime", subtitle: "Interactive Storytelling App",
      category: "Full Stack Development",
      filters: ["Full Stack"],
      short: "Branching stories where the reader's choices decide the next scene and the ending.",
      description: "An interactive storytelling platform where users can create an account and experience branching stories based on their choices.",
      problem: "Most online stories are linear and give the reader no say in what happens.",
      solution: "Account-based reading across five genres where each choice leads to a different branch, with reading history saved per user.",
      tech: {
        "Frontend": ["HTML", "CSS", "JavaScript"],
        "Backend": ["Node.js", "Express.js", "bcryptjs", "Express Session"],
        "Database": ["SQLite"]
      },
      features: ["Animated login and registration", "Session-based authentication and logout", "Branching story paths and story choices", "Genres: Horror, Sci-Fi, Fantasy, Mystery, Thriller", "User-specific reading history", "Avatar selection"],
      workflow: ["Story", "User choice", "Branch", "Next scene", "Ending"],
      architecture: [
        { layer: "Client", items: ["HTML", "CSS", "JavaScript"] },
        { layer: "Server", items: ["Express.js", "Express Session", "bcryptjs"] },
        { layer: "Data", items: ["SQLite", "Reading history"] }
      ],
      results: [],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: null
    },
    {
      id: "employee-attrition", number: "05",
      title: "Employee Attrition Prediction", subtitle: "IBM HR Analytics dataset",
      category: "Data Science / Machine Learning",
      filters: ["Data Science", "Machine Learning", "Python"],
      short: "Random Forest classifier that predicts employee attrition and surfaces the factors behind turnover.",
      description: "A machine learning project that analyzes employee data and predicts employee attrition while identifying factors related to employee turnover.",
      problem: "Losing employees is costly, and HR teams need to know which factors are linked to people leaving.",
      solution: "Exploratory analysis and a Random Forest classifier trained on the IBM HR Analytics dataset, evaluated with ROC-AUC and a confusion matrix.",
      stats: [{ label: "Records", value: "1,470" }, { label: "Features", value: "35" }, { label: "Accuracy", value: "≈ 82.65%" }, { label: "ROC-AUC", value: "≈ 0.7989" }],
      tech: { "Data & ML": ["Python", "Pandas", "NumPy", "Scikit-learn"], "Visualization": ["Matplotlib", "Seaborn"] },
      features: ["Dataset overview and preprocessing", "Exploratory data analysis", "Feature analysis", "Random Forest classifier (200 estimators, max_depth=10)", "Evaluation with accuracy, ROC-AUC and confusion matrix"],
      workflow: ["Dataset", "Preprocessing", "EDA", "Random Forest", "Evaluation", "Insights"],
      architecture: [
        { layer: "Data", items: ["IBM HR Analytics", "Pandas", "NumPy"] },
        { layer: "Modelling", items: ["Feature analysis", "Random Forest", "Scikit-learn"] },
        { layer: "Evaluation", items: ["Accuracy", "ROC-AUC", "Confusion matrix", "Matplotlib / Seaborn"] }
      ],
      results: ["Accuracy ≈ 82.65% and ROC-AUC ≈ 0.7989", "Overtime has an important relationship with attrition", "Lower salary levels are associated with higher attrition", "Younger employees show higher turnover"],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: null
    },
    {
      id: "aqi-forecaster", number: "06",
      title: "AQI Forecaster", subtitle: "Real-time air quality prediction system",
      category: "Data Science / Machine Learning",
      filters: ["Data Science", "Machine Learning", "Python", "Full Stack"],
      short: "7-day AQI forecasts with 95% confidence intervals for 20 Indian cities, on a live map dashboard.",
      description: "A data-driven air quality forecasting platform that analyzes AQI and pollutant/weather information and generates 7-day city-level forecasts.",
      problem: "A single AQI reading says little about the next few days, and city-level planning needs a forecast with a stated uncertainty.",
      solution: "A weighted Random Forest + Gradient Boosting ensemble (55/45) trained on engineered time-series features, validated with TimeSeriesSplit and served through a Flask REST API.",
      stats: [{ label: "Cities", value: "20" }, { label: "Forecast", value: "7 days" }, { label: "Features", value: "35+" }, { label: "REST endpoints", value: "9+" }],
      tech: {
        "Backend": ["Python", "Flask", "SQLAlchemy", "MySQL"],
        "ML": ["Pandas", "NumPy", "Scikit-learn", "Random Forest", "Gradient Boosting", "Joblib"],
        "Frontend": ["Chart.js", "Leaflet.js", "HTML", "CSS", "JavaScript"]
      },
      features: ["Interactive map of 20 Indian cities", "Current AQI, city rankings and city comparison", "Pollutant breakdown and weather information", "30-day history and 7-day forecast", "95% confidence intervals and AQI categories", "AQI distribution and feature importance", "Model training status and auto-refresh"],
      workflow: ["Historical AQI + weather", "Daily aggregation", "Feature engineering", "Time-series split", "RF + GB ensemble", "7-day forecast", "Confidence interval"],
      architecture: [
        { layer: "Dashboard", items: ["Leaflet.js map", "Chart.js", "Auto-refresh"] },
        { layer: "API", items: ["Flask", "9+ REST endpoints", "SQLAlchemy"] },
        { layer: "ML & data", items: ["Random Forest", "Gradient Boosting (55/45)", "TimeSeriesSplit", "MySQL"] }
      ],
      results: ["Weighted ensemble (55/45) forecasting 7 days ahead", "95% confidence intervals for 20 Indian cities", "35+ engineered features: lags, rolling means, seasonal indices"],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: "https://aqi-forecaster-vy0t.onrender.com"
    },
    {
      id: "sleepsense-ai", number: "07",
      title: "SleepSense AI", subtitle: "Sleep Disorder Prediction System",
      category: "Machine Learning / Flask",
      filters: ["Machine Learning", "AI", "Python", "Full Stack"],
      short: "Predicts potential sleep disorders from clinical data, with Admin, Doctor and Patient dashboards.",
      description: "A machine learning web application that predicts potential sleep disorders using user-provided information and a trained Random Forest model.",
      problem: "Spotting possible sleep disorders early needs more than one metric, and clinicians want results in one place.",
      solution: "A Random Forest pipeline behind session-authenticated Flask endpoints, with role-based dashboards and CSV export.",
      tech: { "Backend": ["Python", "Flask", "SQLite"], "ML": ["Scikit-learn", "Random Forest", "Label encoding", "Feature scaling"], "Frontend": ["HTML", "CSS", "JavaScript"] },
      features: ["User input form and sleep disorder prediction", "Label encoding, feature scaling and .pkl model serialization", "5+ session-authenticated Flask endpoints", "Role-based dashboards: Admin, Doctor, Patient", "CSV export", "Responsive web interface"],
      workflow: ["User data", "Preprocessing", "Random Forest", "Prediction", "Result"],
      architecture: [
        { layer: "Client", items: ["HTML / CSS / JS", "Input form", "Role dashboards"] },
        { layer: "API", items: ["Flask", "Session auth", "5+ endpoints"] },
        { layer: "ML & data", items: ["Random Forest", ".pkl model", "SQLite", "CSV export"] }
      ],
      results: ["Random Forest pipeline with encoding and scaling", "Role-based Admin / Doctor / Patient dashboards"],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: "https://sleep-disorder-prediction-ubfv.onrender.com"
    },
    {
      id: "face-attendance", number: "08",
      title: "Face Attendance System", subtitle: "Smart face recognition attendance",
      category: "Computer Vision / Python",
      filters: ["Computer Vision", "AI", "Python"],
      short: "Real-time face detection and recognition that logs attendance automatically.",
      description: "A face recognition based attendance management system that uses computer vision to identify users and record attendance.",
      problem: "Manual attendance is slow and easy to get wrong.",
      solution: "A real-time pipeline that detects and recognizes faces, scores its confidence, and writes attendance to the database through JWT-secured routes.",
      tech: { "Computer vision": ["Python", "OpenCV", "Haar Cascade", "LBPH", "CNN / EfficientNet-B0 (optional)"], "Backend": ["Flask", "SQLite"] },
      features: ["Face detection and recognition", "User registration and face dataset creation", "Confidence scoring", "Automatic attendance logging", "Attendance management", "JWT-secured routes"],
      workflow: ["Camera", "Face detection", "Face recognition", "User identification", "Attendance recorded"],
      architecture: [
        { layer: "Capture", items: ["Camera feed", "OpenCV", "Haar Cascade"] },
        { layer: "Recognition", items: ["LBPH", "Optional CNN / EfficientNet-B0", "Confidence score"] },
        { layer: "Backend", items: ["Flask", "JWT routes", "SQLite"] }
      ],
      results: ["Haar Cascade + LBPH pipeline with optional CNN / EfficientNet-B0 mode", "Attendance logging automated through JWT-secured routes"],
      githubUrl: "https://github.com/khan2234mehak",
      liveUrl: "https://face-attendance-k1fx.onrender.com"
    }
  ],

  skills: [
    { group: "Programming", items: [["Python", "python"], ["JavaScript", "javascript"], ["Java", "java"], ["C++", "cplusplus"], ["SQL", null]] },
    { group: "Frontend", items: [["HTML", "html5"], ["CSS", "css3"], ["React", "react"], ["Bootstrap", "bootstrap"], ["Tailwind CSS", "tailwindcss"]] },
    { group: "Backend", items: [["Node.js", "nodejs"], ["Express.js", "express"], ["Flask", "flask"], ["REST APIs", null]] },
    { group: "Data Science", items: [["Pandas", "pandas"], ["NumPy", "numpy"], ["Matplotlib", "matplotlib"], ["Seaborn", null], ["Power BI", null], ["Excel", null], ["Data Analysis", null]] },
    { group: "Machine Learning", items: [["Scikit-learn", "scikitlearn"], ["Random Forest", null], ["Gradient Boosting", null], ["Classification", null], ["Regression", null], ["Feature Engineering", null], ["ROC-AUC", null], ["Time Series Forecasting", null]] },
    { group: "AI / NLP", items: [["NLP", null], ["TF-IDF", null], ["Cosine Similarity", null], ["Resume Parsing", null], ["Keyword Matching", null]] },
    { group: "Computer Vision", items: [["OpenCV", "opencv"], ["Face Recognition", null], ["Image Processing", null]] },
    { group: "Databases", items: [["MySQL", "mysql"], ["SQLite", "sqlite"], ["MongoDB", "mongodb"]] },
    { group: "Tools", items: [["Git", "git"], ["GitHub", "github"], ["VS Code", "vscode"], ["Postman", "postman"]] }
  ],

  timeline: [
    { type: "Education", title: "Bachelor of Computer Applications (BCA) - Data Science", org: "Jagannath University, Bahadurgarh", when: "Expected graduation: 2026", text: "" },
    { type: "Internship", title: "Data Science Intern", org: "Unified Mentor Pvt. Ltd.", when: "", text: "Applied data analysis, statistical analysis and preprocessing on real-world datasets; performed EDA and feature transformation." },
    { type: "Internship", title: "Web Development Intern", org: "Ulektz Learning Solutions Pvt. Ltd.", when: "", text: "Built responsive UI components with exposure to full-stack workflows, database integration and version control." }
  ],

  certs: [
    { name: "Machine Learning Crash Course", org: "Google Developers", url: null },
    { name: "IBM SkillsBuild Certificates", org: "IBM SkillsBuild", url: null },
    { name: "Introduction to Artificial Intelligence", org: "", url: null },
    { name: "Web Development Basics", org: "", url: null },
    { name: "Introduction to HTML & CSS", org: "", url: null }
  ]
};

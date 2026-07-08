/* ============================================
   PLACEMENT READINESS PORTAL - SCRIPT
   ============================================ */

/* ---------- QUESTION DATA ---------- */

const codingQuestionsData = [
  {
    question: "Which of these correctly declares an array in JavaScript?",
    options: ["let arr = []", "array arr = ()", "let arr = {}", "arr = <>"],
    answer: 0
  },
  {
    question: "Which method adds an element to the end of an array in JavaScript?",
    options: ["array.add()", "array.push()", "array.append()", "array.insert()"],
    answer: 1
  },
  {
    question: "Which HTML tag is used to link an external CSS file?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    answer: 2
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: 2
  },
  {
    question: "What does the JavaScript method String.length return?",
    options: ["The last character", "The number of characters in the string", "The first character", "A boolean value"],
    answer: 1
  }
];

const aptitudeQuestionsData = [
  {
    question: "What is 25% of 200?",
    options: ["25", "50", "75", "100"],
    answer: 1
  },
  {
    question: "A shopkeeper buys an item for ₹400 and sells it for ₹500. What is the profit percentage?",
    options: ["20%", "25%", "15%", "30%"],
    answer: 1
  },
  {
    question: "Find the next number in the series: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "20"],
    answer: 2
  },
  {
    question: "If 6 workers can finish a job in 12 days, how many days will 12 workers take?",
    options: ["3 days", "6 days", "12 days", "24 days"],
    answer: 1
  },
  {
    question: "Choose the odd one out: Square, Circle, Triangle, Apple",
    options: ["Square", "Circle", "Triangle", "Apple"],
    answer: 3
  }
];

const communicationQuestionsData = [
  {
    question: "Choose the grammatically correct sentence.",
    options: [
      "He don't like coffee.",
      "He doesn't likes coffee.",
      "He doesn't like coffee.",
      "He not like coffee."
    ],
    answer: 2
  },
  {
    question: "What is the synonym of the word 'Diligent'?",
    options: ["Lazy", "Hardworking", "Careless", "Slow"],
    answer: 1
  },
  {
    question: "Choose the correctly punctuated sentence.",
    options: [
      "I have a meeting at 5 pm, can you join.",
      "I have a meeting at 5 pm; can you join?",
      "i have a meeting at 5 pm can you join",
      "I have a meeting, at 5 pm can you join?"
    ],
    answer: 1
  },
  {
    question: "Which sentence is most appropriate for professional email communication?",
    options: [
      "Hey, send me the file asap!!",
      "give me file now",
      "Could you please share the file at your earliest convenience?",
      "send file pls"
    ],
    answer: 2
  },
  {
    question: "What is the antonym of the word 'Confident'?",
    options: ["Assured", "Bold", "Hesitant", "Certain"],
    answer: 2
  }
];

const hrQuestionsData = [
  "Have you prepared an answer for 'Tell me about yourself'?",
  "Have you identified your key strengths?",
  "Have you identified your weaknesses and how to address them?",
  "Have you defined your short-term and long-term career goals?",
  "Have you prepared an answer for 'Why should we hire you'?"
];

/* ---------- APPLICATION STATE ---------- */

const appState = {
  currentStepIndex: 0,
  steps: ["profile", "academic", "coding", "aptitude", "communication", "hr"],
  student: {},
  academic: {},
  codingAnswers: new Array(codingQuestionsData.length).fill(null),
  aptitudeAnswers: new Array(aptitudeQuestionsData.length).fill(null),
  communicationAnswers: new Array(communicationQuestionsData.length).fill(null),
  hrAnswers: new Array(hrQuestionsData.length).fill(null)
};

/* ---------- DOM ELEMENT REFERENCES ---------- */

const landingSection = document.getElementById("landing");
const wizardWrapper = document.getElementById("wizard");
const reportSection = document.getElementById("report");

const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");

const progressBar = document.getElementById("progressBar");
const stepLabel = document.getElementById("stepLabel");

/* ---------- INITIALIZATION ---------- */

function init() {
  renderQuiz("codingQuestions", codingQuestionsData, "coding");
  renderQuiz("aptitudeQuestions", aptitudeQuestionsData, "aptitude");
  renderQuiz("communicationQuestions", communicationQuestionsData, "communication");
  renderHrQuestions();
  attachEventListeners();
  showStep(0);
}

/* ---------- RENDER QUIZ QUESTIONS ---------- */

function renderQuiz(containerId, questionList, prefix) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  questionList.forEach((q, qIndex) => {
    const questionBox = document.createElement("div");
    questionBox.className = "quiz-question";

    const questionText = document.createElement("p");
    questionText.className = "q-text";
    questionText.textContent = (qIndex + 1) + ". " + q.question;
    questionBox.appendChild(questionText);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.className = "quiz-options";

    q.options.forEach((optionText, optIndex) => {
      const optionLabel = document.createElement("label");
      optionLabel.className = "quiz-option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = prefix + "_q" + qIndex;
      radio.value = optIndex;
      radio.addEventListener("change", function () {
        saveQuizAnswer(prefix, qIndex, optIndex);
      });

      const span = document.createElement("span");
      span.textContent = optionText;

      optionLabel.appendChild(radio);
      optionLabel.appendChild(span);
      optionsWrapper.appendChild(optionLabel);
    });

    questionBox.appendChild(optionsWrapper);
    container.appendChild(questionBox);
  });
}

function renderHrQuestions() {
  const container = document.getElementById("hrQuestions");
  container.innerHTML = "";

  hrQuestionsData.forEach((questionText, qIndex) => {
    const questionBox = document.createElement("div");
    questionBox.className = "quiz-question";

    const text = document.createElement("p");
    text.className = "q-text";
    text.textContent = (qIndex + 1) + ". " + questionText;
    questionBox.appendChild(text);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.className = "quiz-options";

    ["Yes", "No"].forEach((label, optIndex) => {
      const optionLabel = document.createElement("label");
      optionLabel.className = "quiz-option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "hr_q" + qIndex;
      radio.value = optIndex;
      radio.addEventListener("change", function () {
        saveQuizAnswer("hr", qIndex, optIndex);
      });

      const span = document.createElement("span");
      span.textContent = label;

      optionLabel.appendChild(radio);
      optionLabel.appendChild(span);
      optionsWrapper.appendChild(optionLabel);
    });

    questionBox.appendChild(optionsWrapper);
    container.appendChild(questionBox);
  });
}

function saveQuizAnswer(prefix, questionIndex, optionIndex) {
  if (prefix === "coding") appState.codingAnswers[questionIndex] = optionIndex;
  if (prefix === "aptitude") appState.aptitudeAnswers[questionIndex] = optionIndex;
  if (prefix === "communication") appState.communicationAnswers[questionIndex] = optionIndex;
  if (prefix === "hr") appState.hrAnswers[questionIndex] = optionIndex;
}

/* ---------- EVENT LISTENERS ---------- */

function attachEventListeners() {
  startBtn.addEventListener("click", function () {
    landingSection.classList.remove("active");
    wizardWrapper.style.display = "block";
    showStep(0);
  });

  nextBtn.addEventListener("click", goToNextStep);
  prevBtn.addEventListener("click", goToPreviousStep);
  generateBtn.addEventListener("click", handleGenerateReport);
  resetBtn.addEventListener("click", resetAssessment);
}

/* ---------- WIZARD NAVIGATION ---------- */

function showStep(index) {
  // hide all step sections inside the wizard
  appState.steps.forEach(function (stepId) {
    document.getElementById(stepId).classList.remove("active");
  });

  const currentStepId = appState.steps[index];
  document.getElementById(currentStepId).classList.add("active");

  appState.currentStepIndex = index;
  updateProgressBar();
  updateNavButtons();
}

function updateProgressBar() {
  const total = appState.steps.length;
  const percent = ((appState.currentStepIndex + 1) / total) * 100;
  progressBar.style.width = percent + "%";

  const stepNames = {
    profile: "Student Profile",
    academic: "Academic Profile",
    coding: "Coding Assessment",
    aptitude: "Aptitude Assessment",
    communication: "Communication Assessment",
    hr: "HR Readiness"
  };
  const currentStepId = appState.steps[appState.currentStepIndex];
  stepLabel.textContent = "Step " + (appState.currentStepIndex + 1) + " of " + total + ": " + stepNames[currentStepId];
}

function updateNavButtons() {
  prevBtn.style.display = appState.currentStepIndex === 0 ? "none" : "inline-flex";

  const isLastStep = appState.currentStepIndex === appState.steps.length - 1;
  nextBtn.style.display = isLastStep ? "none" : "inline-flex";
  generateBtn.style.display = isLastStep ? "inline-flex" : "none";
}

function goToNextStep() {
  if (!validateCurrentStep()) return;

  if (appState.currentStepIndex < appState.steps.length - 1) {
    showStep(appState.currentStepIndex + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function goToPreviousStep() {
  if (appState.currentStepIndex > 0) {
    showStep(appState.currentStepIndex - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* ---------- VALIDATION ---------- */

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
}

function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function validateCurrentStep() {
  const currentStepId = appState.steps[appState.currentStepIndex];

  if (currentStepId === "profile") return validateProfileStep();
  if (currentStepId === "academic") return validateAcademicStep();
  if (currentStepId === "coding") return validateQuizStep(appState.codingAnswers, "codingError", codingQuestionsData.length);
  if (currentStepId === "aptitude") return validateQuizStep(appState.aptitudeAnswers, "aptitudeError", aptitudeQuestionsData.length);
  if (currentStepId === "communication") return validateQuizStep(appState.communicationAnswers, "communicationError", communicationQuestionsData.length);
  if (currentStepId === "hr") return validateQuizStep(appState.hrAnswers, "hrError", hrQuestionsData.length);

  return true;
}

function validateProfileStep() {
  let isValid = true;

  const name = document.getElementById("name").value.trim();
  const regNo = document.getElementById("regNo").value.trim();
  const dept = document.getElementById("dept").value;
  const year = document.getElementById("year").value;
  const semester = document.getElementById("semester").value;
  const cgpa = document.getElementById("cgpa").value;

  clearError("nameError");
  clearError("regNoError");
  clearError("deptError");
  clearError("yearError");
  clearError("semesterError");
  clearError("cgpaError");

  if (name === "") {
    setError("nameError", "Please enter your name.");
    isValid = false;
  }
  if (regNo === "") {
    setError("regNoError", "Please enter your register number.");
    isValid = false;
  }
  if (dept === "") {
    setError("deptError", "Please select your department.");
    isValid = false;
  }
  if (year === "") {
    setError("yearError", "Please select your year.");
    isValid = false;
  }
  if (semester === "") {
    setError("semesterError", "Please select your semester.");
    isValid = false;
  }
  if (cgpa === "" || isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    setError("cgpaError", "Please enter a valid CGPA between 0 and 10.");
    isValid = false;
  }

  if (isValid) {
    appState.student = { name, regNo, dept, year, semester, cgpa: parseFloat(cgpa) };
  }

  return isValid;
}

function validateAcademicStep() {
  let isValid = true;

  const projects = document.getElementById("projects").value;
  const internships = document.getElementById("internships").value;
  const certifications = document.getElementById("certifications").value;
  const hackathons = document.getElementById("hackathons").value;
  const github = document.getElementById("github").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  const resumeRadio = document.querySelector('input[name="resume"]:checked');

  clearError("projectsError");
  clearError("internshipsError");
  clearError("certificationsError");
  clearError("hackathonsError");
  clearError("resumeError");

  if (projects === "" || isNaN(projects) || projects < 0) {
    setError("projectsError", "Please enter a valid number of projects.");
    isValid = false;
  }
  if (internships === "" || isNaN(internships) || internships < 0) {
    setError("internshipsError", "Please enter a valid number of internships.");
    isValid = false;
  }
  if (certifications === "" || isNaN(certifications) || certifications < 0) {
    setError("certificationsError", "Please enter a valid number of certifications.");
    isValid = false;
  }
  if (hackathons === "" || isNaN(hackathons) || hackathons < 0) {
    setError("hackathonsError", "Please enter a valid number of hackathons.");
    isValid = false;
  }
  if (!resumeRadio) {
    setError("resumeError", "Please select whether you have uploaded a resume.");
    isValid = false;
  }

  if (isValid) {
    appState.academic = {
      projects: parseInt(projects),
      internships: parseInt(internships),
      certifications: parseInt(certifications),
      hackathons: parseInt(hackathons),
      github,
      linkedin,
      resume: resumeRadio.value
    };
  }

  return isValid;
}

function validateQuizStep(answersArray, errorElementId, totalQuestions) {
  clearError(errorElementId);

  const unanswered = answersArray.some(function (answer) {
    return answer === null;
  });

  if (unanswered) {
    setError(errorElementId, "Please answer all " + totalQuestions + " questions before continuing.");
    return false;
  }

  return true;
}

/* ---------- SCORE CALCULATION ---------- */

function calculateQuizScorePercent(answersArray, questionList) {
  let correctCount = 0;
  answersArray.forEach(function (answer, index) {
    if (answer === questionList[index].answer) correctCount++;
  });
  return (correctCount / questionList.length) * 100;
}

function calculateHrScorePercent(answersArray) {
  // option index 0 = "Yes", 1 = "No"
  let yesCount = 0;
  answersArray.forEach(function (answer) {
    if (answer === 0) yesCount++;
  });
  return (yesCount / answersArray.length) * 100;
}

function calculateAcademicScorePercent() {
  const a = appState.academic;
  let score = 0;

  // Projects: up to 30 points (10 points each, max 3 counted)
  score += Math.min(a.projects, 3) * 10;
  // Internships: up to 25 points (12.5 each, max 2 counted)
  score += Math.min(a.internships, 2) * 12.5;
  // Certifications: up to 20 points (10 each, max 2 counted)
  score += Math.min(a.certifications, 2) * 10;
  // Hackathons: up to 15 points (7.5 each, max 2 counted)
  score += Math.min(a.hackathons, 2) * 7.5;
  // Resume uploaded: 10 points
  score += a.resume === "yes" ? 10 : 0;

  return Math.min(score, 100);
}

function calculateAllScores() {
  const cgpaScore = (appState.student.cgpa / 10) * 100;
  const academicScore = calculateAcademicScorePercent();
  const codingScore = calculateQuizScorePercent(appState.codingAnswers, codingQuestionsData);
  const aptitudeScore = calculateQuizScorePercent(appState.aptitudeAnswers, aptitudeQuestionsData);
  const communicationScore = calculateQuizScorePercent(appState.communicationAnswers, communicationQuestionsData);
  const hrScore = calculateHrScorePercent(appState.hrAnswers);

  // Weighted overall readiness score
  const overallScore =
    cgpaScore * 0.20 +
    academicScore * 0.15 +
    codingScore * 0.20 +
    aptitudeScore * 0.20 +
    communicationScore * 0.15 +
    hrScore * 0.10;

  return {
    cgpaScore: Math.round(cgpaScore),
    academicScore: Math.round(academicScore),
    codingScore: Math.round(codingScore),
    aptitudeScore: Math.round(aptitudeScore),
    communicationScore: Math.round(communicationScore),
    hrScore: Math.round(hrScore),
    overallScore: Math.round(overallScore)
  };
}

/* ---------- READINESS STATUS ---------- */

function getReadinessStatus(score) {
  if (score >= 90) return { label: "Placement Ready", badgeClass: "badge-ready" };
  if (score >= 75) return { label: "Almost Ready", badgeClass: "badge-almost" };
  if (score >= 60) return { label: "Moderately Ready", badgeClass: "badge-moderate" };
  return { label: "Needs Improvement", badgeClass: "badge-needs-improvement" };
}

/* ---------- STRENGTHS & WEAKNESSES DETECTION ---------- */

function detectStrengthsAndWeaknesses(scores) {
  const sections = [
    { name: "CGPA / Academics", score: scores.cgpaScore, strengthText: "Strong academic performance (CGPA)", weaknessText: "Improve your CGPA / academic performance" },
    { name: "Academic Profile", score: scores.academicScore, strengthText: "Good academic profile with projects/internships", weaknessText: "Build a stronger academic profile (projects, internships, certifications)" },
    { name: "Coding", score: scores.codingScore, strengthText: "Strong coding fundamentals", weaknessText: "Improve coding and programming fundamentals" },
    { name: "Aptitude", score: scores.aptitudeScore, strengthText: "Excellent aptitude and problem-solving skills", weaknessText: "Improve quantitative aptitude and logical reasoning" },
    { name: "Communication", score: scores.communicationScore, strengthText: "Excellent communication skills", weaknessText: "Improve English communication and grammar skills" },
    { name: "HR Readiness", score: scores.hrScore, strengthText: "Well prepared for HR interview rounds", weaknessText: "Prepare better for common HR interview questions" }
  ];

  const strengths = sections.filter(function (s) { return s.score >= 70; }).map(function (s) { return s.strengthText; });
  const weaknesses = sections.filter(function (s) { return s.score < 70; }).map(function (s) { return s.weaknessText; });

  // Fallback messages if a list ends up empty
  if (strengths.length === 0) strengths.push("Keep practicing — your strengths will show as your scores improve.");
  if (weaknesses.length === 0) weaknesses.push("Great job! No major weak areas detected. Keep maintaining consistency.");

  return { strengths, weaknesses };
}

/* ---------- ROADMAP GENERATION ---------- */

function generateRoadmap(scores, academic) {
  const roadmap = [];

  if (scores.codingScore < 70) roadmap.push("Solve at least 100 coding problems on platforms like LeetCode or HackerRank");
  if (scores.aptitudeScore < 70) roadmap.push("Practice quantitative aptitude for 30 minutes daily");
  if (scores.communicationScore < 70) roadmap.push("Practice spoken and written English communication daily");
  if (scores.hrScore < 70) roadmap.push("Prepare and rehearse answers for common HR interview questions");
  if (academic.internships === 0) roadmap.push("Complete at least one internship to gain industry experience");
  if (academic.certifications < 2) roadmap.push("Complete 2 relevant certifications in your domain");
  if (academic.projects < 3) roadmap.push("Build at least one more full-stack or domain-relevant project");
  if (academic.resume !== "yes") roadmap.push("Create and upload a professional resume");
  if (scores.cgpaScore < 70) roadmap.push("Focus on improving your CGPA in upcoming semesters");

  if (roadmap.length === 0) {
    roadmap.push("Maintain your current performance and keep practicing regularly");
  }

  return roadmap;
}

/* ---------- REPORT GENERATION ---------- */

function handleGenerateReport() {
  if (!validateCurrentStep()) return;

  const scores = calculateAllScores();
  renderReport(scores);

  wizardWrapper.style.display = "none";
  reportSection.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderReport(scores) {
  // student name
  document.getElementById("reportStudentName").textContent =
    appState.student.name + " | " + appState.student.dept + " | Year " + appState.student.year;

  // circular progress + percentage text
  const circumference = 2 * Math.PI * 85; // r = 85
  const offset = circumference - (scores.overallScore / 100) * circumference;
  const circleProgress = document.getElementById("circleProgress");
  circleProgress.style.strokeDasharray = circumference;
  circleProgress.style.strokeDashoffset = offset;

  document.getElementById("readinessPercentText").textContent = scores.overallScore + "%";

  // badge
  const status = getReadinessStatus(scores.overallScore);
  const badge = document.getElementById("readinessBadge");
  badge.textContent = status.label;
  badge.className = "badge " + status.badgeClass;

  // overall progress bar
  document.getElementById("overallProgressBar").style.width = scores.overallScore + "%";

  // section wise performance cards
  const sectionWiseContainer = document.getElementById("sectionWiseCards");
  sectionWiseContainer.innerHTML = "";
  const sectionData = [
    { label: "CGPA", value: scores.cgpaScore },
    { label: "Coding", value: scores.codingScore },
    { label: "Aptitude", value: scores.aptitudeScore },
    { label: "Communication", value: scores.communicationScore },
    { label: "HR Readiness", value: scores.hrScore },
    { label: "Projects", value: appState.academic.projects }
  ];
  sectionData.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "perf-card";
    const valueText = item.label === "Projects" ? item.value : item.value + "%";
    card.innerHTML = '<div class="perf-label">' + item.label + '</div><div class="perf-value">' + valueText + '</div>';
    sectionWiseContainer.appendChild(card);
  });

  // strengths & weaknesses
  const result = detectStrengthsAndWeaknesses(scores);

  const strengthsList = document.getElementById("strengthsList");
  strengthsList.innerHTML = "";
  result.strengths.forEach(function (text) {
    const li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + text;
    strengthsList.appendChild(li);
  });

  const weaknessesList = document.getElementById("weaknessesList");
  weaknessesList.innerHTML = "";
  result.weaknesses.forEach(function (text) {
    const li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> ' + text;
    weaknessesList.appendChild(li);
  });

  // roadmap
  const roadmap = generateRoadmap(scores, appState.academic);
  const roadmapContainer = document.getElementById("roadmapCards");
  roadmapContainer.innerHTML = "";
  roadmap.forEach(function (text) {
    const card = document.createElement("div");
    card.className = "roadmap-card";
    card.innerHTML = '<i class="fa-solid fa-arrow-right"></i><span>' + text + '</span>';
    roadmapContainer.appendChild(card);
  });

  // estimated improvement
  const estimatedScore = Math.min(scores.overallScore + (roadmap.length * 4), 98);
  document.getElementById("currentReadinessText").textContent = scores.overallScore + "%";
  document.getElementById("estimatedReadinessText").textContent = estimatedScore + "%";
}

/* ---------- RESET ---------- */

function resetAssessment() {
  // reset state
  appState.currentStepIndex = 0;
  appState.student = {};
  appState.academic = {};
  appState.codingAnswers = new Array(codingQuestionsData.length).fill(null);
  appState.aptitudeAnswers = new Array(aptitudeQuestionsData.length).fill(null);
  appState.communicationAnswers = new Array(communicationQuestionsData.length).fill(null);
  appState.hrAnswers = new Array(hrQuestionsData.length).fill(null);

  // reset all form fields
  document.getElementById("name").value = "";
  document.getElementById("regNo").value = "";
  document.getElementById("dept").value = "";
  document.getElementById("year").value = "";
  document.getElementById("semester").value = "";
  document.getElementById("cgpa").value = "";
  document.getElementById("projects").value = "";
  document.getElementById("internships").value = "";
  document.getElementById("certifications").value = "";
  document.getElementById("hackathons").value = "";
  document.getElementById("github").value = "";
  document.getElementById("linkedin").value = "";

  document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
    radio.checked = false;
  });

  // clear all error messages
  document.querySelectorAll(".error-msg").forEach(function (el) {
    el.textContent = "";
  });

  // re-render quizzes to clear selections cleanly
  renderQuiz("codingQuestions", codingQuestionsData, "coding");
  renderQuiz("aptitudeQuestions", aptitudeQuestionsData, "aptitude");
  renderQuiz("communicationQuestions", communicationQuestionsData, "communication");
  renderHrQuestions();

  // show landing page again
  reportSection.classList.remove("active");
  wizardWrapper.style.display = "none";
  landingSection.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- START APPLICATION ---------- */

document.addEventListener("DOMContentLoaded", init);
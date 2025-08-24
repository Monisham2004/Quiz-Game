const quizData = [
      {
        type: "single",
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: ["Mars"]
      },
      {
        type: "multi",
        question: "Which of the following are programming languages?",
        options: ["Python", "HTML", "Java", "CSS"],
        correct: ["Python", "Java"]
      },
      {
        type: "fill",
        question: "Fill in the blank: The capital of France is ______.",
        correct: ["Paris"]
      },
      {
        type: "single",
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Leo Tolstoy"],
        correct: ["William Shakespeare"]
      },
      {
        type: "multi",
        question: "Which of the following are web browsers?",
        options: ["Chrome", "Firefox", "Python", "Edge"],
        correct: ["Chrome", "Firefox", "Edge"]
      }
    ];

    let currentQuestion = 0;
    let userAnswers = [];

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const submitBtn = document.getElementById("submit");
    const resultEl = document.getElementById("result");

    function loadQuestion() {
      const current = quizData[currentQuestion];
      // Add question number here
      questionEl.textContent = `Q${currentQuestion + 1}. ${current.question}`;
      optionsEl.innerHTML = "";

      if (current.type === "single") {
        current.options.forEach(option => {
          const div = document.createElement("div");
          div.classList.add("option");
          div.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
          optionsEl.appendChild(div);
        });
      } else if (current.type === "multi") {
        current.options.forEach(option => {
          const div = document.createElement("div");
          div.classList.add("option");
          div.innerHTML = `<input type="checkbox" name="answer" value="${option}"> ${option}`;
          optionsEl.appendChild(div);
        });
      } else if (current.type === "fill") {
        optionsEl.innerHTML = `<input type="text" id="fillAnswer" placeholder="Type your answer here">`;
      }
    }

    function saveAnswer() {
      const current = quizData[currentQuestion];
      let userAnswer = [];

      if (current.type === "single") {
        const selected = document.querySelector("input[name='answer']:checked");
        if (selected) userAnswer.push(selected.value);
      } else if (current.type === "multi") {
        const selected = document.querySelectorAll("input[name='answer']:checked");
        selected.forEach(el => userAnswer.push(el.value));
      } else if (current.type === "fill") {
        const input = document.getElementById("fillAnswer").value.trim();
        if (input) userAnswer.push(input);
      }

      userAnswers[currentQuestion] = userAnswer;
    }

    function showFinalScore() {
      let score = 0;
      quizData.forEach((q, index) => {
        if (arraysEqual(userAnswers[index] || [], q.correct)) score++;
      });

      resultEl.innerHTML = `<h3>Your Final Score: ${score} / ${quizData.length}</h3>
                            <button id="viewAnswers">View Answers</button>`;
      
      document.getElementById("viewAnswers").addEventListener("click", showResults);
    }

    function showResults() {
      resultEl.innerHTML = "<h3>Quiz Results:</h3>";
      let score = 0;

      quizData.forEach((q, index) => {
        const correct = arraysEqual(userAnswers[index] || [], q.correct);
        if (correct) score++;

        resultEl.innerHTML += `
          <p>
            Q${index + 1}. ${q.question}<br>
            Your Answer: ${userAnswers[index] ? userAnswers[index].join(", ") : "No Answer"}<br>
            Correct Answer: ${q.correct.join(", ")}<br>
            ${correct ? '<span class="correct">Correct</span>' : '<span class="wrong">Wrong</span>'}
          </p>
        `;
      });

      resultEl.innerHTML += `<h3>Your Final Score: ${score} / ${quizData.length}</h3>`;
    }

    function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      arr1 = arr1.map(a => a.toLowerCase());
      arr2 = arr2.map(a => a.toLowerCase());
      arr1.sort();
      arr2.sort();
      return arr1.every((val, index) => val === arr2[index]);
    }

    submitBtn.addEventListener("click", () => {
      saveAnswer();
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        questionEl.textContent = "Quiz Completed!";
        optionsEl.innerHTML = "";
        submitBtn.style.display = "none";
        showFinalScore();
      }
    });

    loadQuestion();
// Quiz Kiến Thức Về Tết - Sắp Tết 2026
class TetQuiz {
    constructor(rootElement) {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = this.getQuestions();
        this.userAnswers = [];
        this.rootElement = rootElement; // Store the root element
        this.init();
    }

    getQuestions() {
        return [
            {
                question: "Tết Nguyên Đán 2026 rơi vào ngày nào?",
                options: [
                    "15 tháng 2 năm 2026",
                    "17 tháng 2 năm 2026", 
                    "19 tháng 2 năm 2026",
                    "21 tháng 2 năm 2026"
                ],
                correct: 1,
                explanation: "Tết Nguyên Đán 2026 rơi vào ngày 17 tháng 2 năm 2026 (âm lịch mùng 1 tháng Giêng năm Bính Ngọ)."
            },
            {
                question: "Năm 2026 là năm con gì theo âm lịch?",
                options: [
                    "Năm con Rắn (Tỵ)",
                    "Năm con Ngựa (Ngọ)",
                    "Năm con Dê (Mùi)",
                    "Năm con Khỉ (Thân)"
                ],
                correct: 1,
                explanation: "Năm 2026 là năm Bính Ngọ (năm con Ngựa) theo âm lịch Việt Nam."
            },
            {
                question: "Món ăn nào được coi là 'linh hồn' của mâm cơm Tết?",
                options: [
                    "Bánh chưng",
                    "Thịt kho tàu",
                    "Nem rán",
                    "Xôi gấc"
                ],
                correct: 0,
                explanation: "Bánh chưng được coi là 'linh hồn' của mâm cơm Tết, tượng trưng cho sự sum vầy và may mắn."
            },
            {
                question: "Tại sao người Việt thường dọn dẹp nhà cửa trước Tết?",
                options: [
                    "Để nhà sạch sẽ",
                    "Xua đuổi vận xui, đón may mắn",
                    "Để khách đến chơi",
                    "Theo phong tục"
                ],
                correct: 1,
                explanation: "Theo quan niệm dân gian, dọn dẹp nhà cửa giúp xua đuổi vận xui và đón may mắn, tài lộc vào nhà trong năm mới."
            },
            {
                question: "Hoa nào tượng trưng cho Tết miền Bắc?",
                options: [
                    "Hoa mai",
                    "Hoa đào",
                    "Hoa quất",
                    "Hoa cúc"
                ],
                correct: 1,
                explanation: "Hoa đào là biểu tượng không thể thiếu của Tết miền Bắc, tượng trưng cho sự may mắn và thịnh vượng."
            },
            {
                question: "Ngày 23 tháng Chạp âm lịch có ý nghĩa gì?",
                options: [
                    "Ngày gói bánh chưng",
                    "Ngày ông Táo về trời",
                    "Ngày cúng giao thừa",
                    "Ngày mua sắm Tết"
                ],
                correct: 1,
                explanation: "Ngày 23 tháng Chạp là ngày ông Táo về trời báo cáo với Ngọc Hoàng về việc làm ăn của gia đình trong năm."
            },
            {
                question: "Lì xì có ý nghĩa gì trong văn hóa Tết?",
                options: [
                    "Chỉ là tiền thưởng",
                    "Lời chúc may mắn, thịnh vượng",
                    "Để trẻ em mua đồ chơi",
                    "Theo phong tục"
                ],
                correct: 1,
                explanation: "Lì xì không chỉ là tiền mà còn là lời chúc may mắn, thịnh vượng và sức khỏe cho người nhận trong năm mới."
            },
            {
                question: "Trò chơi dân gian nào phổ biến nhất trong dịp Tết?",
                options: [
                    "Bầu cua tôm cá",
                    "Đánh bài",
                    "Cờ tướng",
                    "Ô ăn quan"
                ],
                correct: 0,
                explanation: "Bầu cua tôm cá là trò chơi dân gian phổ biến nhất trong dịp Tết, mang lại không khí vui tươi và may mắn."
            },
            {
                question: "Màu đỏ trong Tết có ý nghĩa gì?",
                options: [
                    "Màu đẹp",
                    "Tượng trưng cho may mắn, thịnh vượng",
                    "Màu truyền thống",
                    "Dễ nhìn"
                ],
                correct: 1,
                explanation: "Màu đỏ trong Tết tượng trưng cho may mắn, thịnh vượng và xua đuổi tà ma, vận xui."
            },
            {
                question: "Tết Nguyên Đán có nguồn gốc từ đâu?",
                options: [
                    "Từ Trung Quốc",
                    "Từ Việt Nam cổ đại",
                    "Từ văn hóa Đông Nam Á",
                    "Từ văn hóa chung châu Á"
                ],
                correct: 3,
                explanation: "Tết Nguyên Đán có nguồn gốc từ văn hóa chung của các nước châu Á, mỗi nước có cách đón Tết riêng."
            }
        ];
    }

    init() {
        this.renderQuiz();
        this.bindEvents();
    }

    renderQuiz() {
        const quizHTML = `
            <div class="tet-quiz-container">
                <h3>🎯 Quiz Kiến Thức Về Tết</h3>
                <p class="quiz-subtitle">Kiểm tra hiểu biết của bạn về văn hóa Tết Việt Nam</p>
                
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="quiz-progress-fill"></div>
                    </div>
                    <span class="progress-text" id="quiz-progress-text">Câu 1/10</span>
                </div>
                
                <div class="quiz-content" id="quiz-content">
                    <!-- Quiz content will be rendered here -->
                </div>
                
                <div class="quiz-actions">
                    <button class="quiz-btn prev-btn" id="prev-btn" style="display: none;">← Câu trước</button>
                    <button class="quiz-btn next-btn" id="next-btn">Câu tiếp →</button>
                    <button class="quiz-btn submit-btn" id="submit-btn" style="display: none;">🏆 Xem kết quả</button>
                </div>
                
                <div class="quiz-results" id="quiz-results" style="display: none;">
                    <!-- Results will be shown here -->
                </div>
            </div>
        `;

        // Tìm vị trí để chèn quiz
        if (this.rootElement) {
            const quizContainer = document.createElement('div');
            quizContainer.className = 'quiz-container';
            quizContainer.innerHTML = quizHTML;
            this.rootElement.appendChild(quizContainer);
        }

        this.showQuestion(0);
    }

    showQuestion(questionIndex) {
        const question = this.questions[questionIndex];
        const contentElement = document.getElementById('quiz-content');
        
        if (!contentElement) return;

        const questionHTML = `
            <div class="question-container">
                <h4 class="question-text">${question.question}</h4>
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <label class="option-item ${this.userAnswers[questionIndex] === index ? 'selected' : ''}">
                            <input type="radio" name="question-${questionIndex}" value="${index}" 
                                   ${this.userAnswers[questionIndex] === index ? 'checked' : ''}>
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        contentElement.innerHTML = questionHTML;
        this.updateProgress();
        this.updateButtons();
        this.bindQuestionEvents();
    }

    updateProgress() {
        const progressFill = document.getElementById('quiz-progress-fill');
        const progressText = document.getElementById('quiz-progress-text');
        
        if (progressFill && progressText) {
            const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Câu ${this.currentQuestion + 1}/${this.questions.length}`;
        }
    }

    updateButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (prevBtn) {
            prevBtn.style.display = this.currentQuestion > 0 ? 'inline-block' : 'none';
        }

        if (nextBtn && submitBtn) {
            if (this.currentQuestion === this.questions.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
            } else {
                nextBtn.style.display = 'inline-block';
                submitBtn.style.display = 'none';
            }
        }
    }

    bindEvents() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitQuiz());
        }
    }

    bindQuestionEvents() {
        const options = document.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
            option.addEventListener('change', (e) => {
                this.userAnswers[this.currentQuestion] = parseInt(e.target.value);
                this.updateOptionStyles();
            });
        });
    }

    updateOptionStyles() {
        const options = document.querySelectorAll('.option-item');
        options.forEach((option, index) => {
            if (this.userAnswers[this.currentQuestion] === index) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
        }
    }

    submitQuiz() {
        this.calculateScore();
        this.showResults();
    }

    calculateScore() {
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });
    }

    showResults() {
        const resultsElement = document.getElementById('quiz-results');
        const contentElement = document.getElementById('quiz-content');
        const actionsElement = document.querySelector('.quiz-actions');

        if (!resultsElement || !contentElement || !actionsElement) return;

        const percentage = (this.score / this.questions.length) * 100;
        const grade = this.getGrade(percentage);
        const message = this.getResultMessage(percentage);

        const resultsHTML = `
            <div class="results-container">
                <h4>🏆 Kết Quả Quiz</h4>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${this.score}/${this.questions.length}</span>
                        <span class="score-percentage">${percentage}%</span>
                    </div>
                    <div class="grade-badge ${grade.toLowerCase()}">${grade}</div>
                </div>
                <p class="result-message">${message}</p>
                
                <div class="answers-review">
                    <h5>📝 Xem lại đáp án:</h5>
                    ${this.questions.map((question, index) => `
                        <div class="answer-item ${this.userAnswers[index] === question.correct ? 'correct' : 'incorrect'}">
                            <h6>Câu ${index + 1}: ${question.question}</h6>
                            <p><strong>Đáp án của bạn:</strong> ${this.userAnswers[index] !== undefined ? question.options[this.userAnswers[index]] : 'Chưa trả lời'}</p>
                            <p><strong>Đáp án đúng:</strong> ${question.options[question.correct]}</p>
                            <p class="explanation"><strong>Giải thích:</strong> ${question.explanation}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="share-results">
                    <h5>📤 Chia sẻ kết quả:</h5>
                    <button class="share-btn" onclick="tetQuiz.shareResults()">
                        📱 Chia sẻ trên Facebook
                    </button>
                    <button class="retry-btn" onclick="tetQuiz.retryQuiz()">
                        🔄 Làm lại
                    </button>
                </div>
            </div>
        `;

        contentElement.style.display = 'none';
        actionsElement.style.display = 'none';
        resultsElement.innerHTML = resultsHTML;
        resultsElement.style.display = 'block';
    }

    getGrade(percentage) {
        if (percentage >= 90) return 'Xuất Sắc';
        if (percentage >= 80) return 'Giỏi';
        if (percentage >= 70) return 'Khá';
        if (percentage >= 60) return 'Trung Bình';
        return 'Cần Cải Thiện';
    }

    getResultMessage(percentage) {
        if (percentage >= 90) {
            return '🎉 Chúc mừng! Bạn là chuyên gia về văn hóa Tết Việt Nam!';
        } else if (percentage >= 80) {
            return '👏 Rất tốt! Bạn có hiểu biết sâu sắc về Tết truyền thống!';
        } else if (percentage >= 70) {
            return '👍 Tốt! Bạn nắm khá vững kiến thức về Tết!';
        } else if (percentage >= 60) {
            return '📚 Khá ổn! Hãy tìm hiểu thêm về văn hóa Tết nhé!';
        } else {
            return '📖 Cần học hỏi thêm! Hãy đọc thêm về văn hóa Tết Việt Nam!';
        }
    }

    shareResults() {
        const percentage = (this.score / this.questions.length) * 100;
        const grade = this.getGrade(percentage);
        
        const shareText = `🎯 Tôi vừa đạt ${percentage}% trong Quiz Kiến Thức Về Tết trên Sắp Tết 2026! Xếp loại: ${grade} 🏮`;
        const shareUrl = encodeURIComponent(window.location.href);
        const shareTitle = encodeURIComponent('Quiz Kiến Thức Về Tết - Sắp Tết 2026');
        
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, '_blank');
    }

    retryQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        const resultsElement = document.getElementById('quiz-results');
        const contentElement = document.getElementById('quiz-content');
        const actionsElement = document.querySelector('.quiz-actions');

        if (resultsElement) resultsElement.style.display = 'none';
        if (contentElement) contentElement.style.display = 'block';
        if (actionsElement) actionsElement.style.display = 'flex';

        this.showQuestion(0);
    }
}

// Ensure the quiz renders in the correct root element
let tetQuiz;
document.addEventListener('DOMContentLoaded', () => {
    tetQuiz = new TetQuiz();
    // Render into #tet-quiz-root if not already set
    if (document.getElementById('tet-quiz-root')) {
        tetQuiz.renderQuiz(document.getElementById('tet-quiz-root'));
    }
}); 
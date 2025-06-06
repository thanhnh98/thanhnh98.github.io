class WordChainGame {
    constructor() {
        this.words = [];
        this.usedWords = new Set();
        this.wordChain = [];
        this.currentWord = '';
        this.playerScore = 0;
        this.computerScore = 0;
        this.isPlayerTurn = true;
        this.gameStarted = false;
        this.gameEnded = false;
        this.timer = null;
        this.timeLeft = 60; // 60 giây mỗi lượt
        this.playerMistakes = 0; // Số lần sai của người chơi
        this.maxMistakes = 3; // Tối đa 3 lần sai
        this.startWord = ''; // Từ mở đầu
        this.gameReallyStarted = false; // Game thực sự bắt đầu khi người chơi nhập từ đầu tiên
        this.hintsUsed = 0; // Số lượt gợi ý đã sử dụng
        this.maxHints = 3; // Tối đa 3 lượt gợi ý miễn phí
        this.gameHistory = this.loadGameHistory(); // Lịch sử game
        this.highestScore = this.loadHighestScore(); // Điểm cao nhất
        
        // Sound system
        this.sounds = {
            background: new Audio('assets/sounds/noichu_background.mp3'),
            correct: new Audio('assets/sounds/noichu_correct.mp3'),
            incorrect: new Audio('assets/sounds/noichu_incorrect.mp3'),
            gameWon: new Audio('assets/sounds/noichu_game_won.mp3'),
            gameFailed: new Audio('assets/sounds/noichu_game_failed.mp3')
        };
        
        // Configure background music
        this.sounds.background.loop = true;
        this.sounds.background.volume = 0.3;
        
        this.loadWords();
        this.initializeElements();
        this.setupEventListeners();
        this.setupBeforeUnloadWarning();
        
        // Play background music when entering the game page
        this.playBackgroundMusic();
    }
    
    async loadWords() {
        try {
            const response = await fetch('assets/files/words_json.txt');
            const data = await response.json();
            this.words = data.data.filter(word => 
                word.length >= 2 && 
                word.length <= 10 && 
                /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/.test(word)
            );
            console.log(`Đã tải ${this.words.length} từ`);
        } catch (error) {
            console.error('Lỗi khi tải từ điển:', error);
            this.showMessage('Không thể tải từ điển. Vui lòng thử lại!', 'error');
        }
    }
    
    initializeElements() {
        this.elements = {
            playerScore: document.getElementById('player-score'),
            computerScore: document.getElementById('computer-score'),
            currentTurn: document.getElementById('current-turn'),
            wordChainDisplay: document.getElementById('word-chain-display'),
            currentWordDisplay: document.getElementById('current-word'),
            nextWord: document.getElementById('next-word'),
            wordInput: document.getElementById('word-input'),
            submitBtn: document.getElementById('submit-word'),
            startBtn: document.getElementById('start-game'),
            resetBtn: document.getElementById('reset-game'),
            hintBtn: document.getElementById('hint-btn'),
            historyBtn: document.getElementById('history-btn'),
            gameMessages: document.getElementById('game-messages'),
            computerThinking: document.getElementById('computer-thinking'),
            timerDisplay: document.getElementById('timer-display'),
            mistakesDisplay: document.getElementById('mistakes-display'),
            hintsDisplay: document.getElementById('hints-display'),
            highestScoreDisplay: document.getElementById('highest-score'),
            gameHistoryDisplay: document.getElementById('game-history'),
            historyPopup: document.getElementById('history-popup'),
            historyList: document.getElementById('history-list'),
            closeHistoryBtn: document.getElementById('close-history')
        };
    }
    
    setupEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.resetBtn.addEventListener('click', () => this.confirmReset());
        this.elements.submitBtn.addEventListener('click', () => this.submitWord());
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.historyBtn.addEventListener('click', () => this.showHistoryPopup());
        this.elements.closeHistoryBtn.addEventListener('click', () => this.hideHistoryPopup());
        
        this.elements.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitWord();
            }
        });
        
        this.elements.wordInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toLowerCase();
        });
        
        // Close popup when clicking outside
        this.elements.historyPopup.addEventListener('click', (e) => {
            if (e.target === this.elements.historyPopup) {
                this.hideHistoryPopup();
            }
        });
    }
    
    setupBeforeUnloadWarning() {
        window.addEventListener('beforeunload', (e) => {
            if (this.gameReallyStarted && !this.gameEnded) {
                e.preventDefault();
                e.returnValue = 'Trò chơi đang diễn ra. Bạn có chắc muốn thoát không?';
                return e.returnValue;
            }
        });
    }
    
    confirmReset() {
        if (this.gameReallyStarted && !this.gameEnded) {
            if (confirm('Trò chơi đang diễn ra. Bạn có chắc muốn chơi lại không?')) {
                this.resetGame();
            }
        } else {
            this.resetGame();
        }
    }
    
    playSound(soundName) {
        try {
            if (this.sounds[soundName]) {
                this.sounds[soundName].currentTime = 0;
                this.sounds[soundName].play().catch(e => {
                    console.log('Could not play sound:', e);
                });
            }
        } catch (error) {
            console.log('Sound error:', error);
        }
    }
    
    stopBackgroundMusic() {
        try {
            this.sounds.background.pause();
            this.sounds.background.currentTime = 0;
        } catch (error) {
            console.log('Background music error:', error);
        }
    }
    
    playBackgroundMusic() {
        try {
            this.sounds.background.play();
        } catch (error) {
            console.log('Background music error:', error);
        }
    }
    
    startGame() {
        if (this.words.length === 0) {
            this.showMessage('Đang tải từ điển, vui lòng đợi...', 'info');
            return;
        }
        
        this.gameStarted = true;
        this.gameEnded = false;
        this.gameReallyStarted = false;
        this.resetGameState();
        
        // Chọn từ đầu tiên ngẫu nhiên
        this.startWord = this.getRandomWord();
        this.currentWord = this.startWord;
        this.updateDisplay();
        
        this.elements.startBtn.disabled = true;
        this.elements.wordInput.disabled = false;
        this.elements.submitBtn.disabled = false;
        this.elements.hintBtn.disabled = false;
        this.elements.hintBtn.classList.remove('disabled');
        
        // Điền sẵn từ đầu tiên vào ô input
        const lastWord = this.getLastWord(this.startWord);
        this.elements.wordInput.value = lastWord + ' ';
        this.elements.wordInput.focus();
        // Đặt con trỏ ở cuối
        this.elements.wordInput.setSelectionRange(this.elements.wordInput.value.length, this.elements.wordInput.value.length);
        
        this.showMessage(`🎮 Từ mở đầu là: "${this.startWord}". Hãy nhập từ tiếp theo bắt đầu bằng "${lastWord}"!`, 'success');
    }
    
    resetGame() {
        this.gameStarted = false;
        this.gameEnded = false;
        this.resetGameState();
        this.updateDisplay();
        
        // Stop background music
        this.stopBackgroundMusic();
        
        this.elements.startBtn.disabled = false;
        this.elements.wordInput.disabled = true;
        this.elements.submitBtn.disabled = true;
        this.elements.hintBtn.disabled = false;
        this.elements.hintBtn.classList.remove('disabled');
        this.elements.wordInput.value = '';
        
        this.clearMessages();
        this.elements.wordChainDisplay.innerHTML = '<span class="start-word">Bắt đầu game để chơi!</span>';
        this.elements.currentWordDisplay.textContent = '---';
        this.elements.nextWord.textContent = '---';
    }
    
    resetGameState() {
        this.usedWords.clear();
        this.wordChain = [];
        this.currentWord = '';
        this.playerScore = 0;
        this.computerScore = 0;
        this.isPlayerTurn = true;
        this.playerMistakes = 0;
        this.timeLeft = 60;
        this.gameReallyStarted = false;
        this.startWord = '';
        this.hintsUsed = 0;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    submitWord() {
        if (!this.gameStarted || this.gameEnded || !this.isPlayerTurn) return;
        
        const word = this.elements.wordInput.value.trim().toLowerCase();
        if (!word) {
            this.showMessage('Vui lòng nhập một từ!', 'error');
            return;
        }
        
        // Verify that user has entered at least 2 words
        const wordCount = word.split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount < 2) {
            this.showMessage('Vui lòng nhập ít nhất 2 từ!', 'error');
            return;
        }
        
        // Nếu game chưa thực sự bắt đầu, đây là từ đầu tiên của người chơi
        if (!this.gameReallyStarted) {
            if (this.validateFirstWord(word)) {
                this.gameReallyStarted = true;
                this.addWordToChain(this.startWord, 'start');
                this.addWordToChain(word, 'player');
                this.currentWord = word;
                this.playerScore += 10;
                this.elements.wordInput.value = '';
                
                this.playSound('correct');
                this.showMessage(`✅ Game bắt đầu! "${word}" là từ hợp lệ. (+10 điểm)`, 'success');
                this.updateDisplay();
                this.startTimer();
                
                // Chuyển lượt cho máy
                this.isPlayerTurn = false;
                this.elements.wordInput.disabled = true;
                this.elements.submitBtn.disabled = true;
                
                setTimeout(() => this.computerTurn(), 1500);
            } else {
                this.handleMistake(this.getValidationError(word));
            }
            return;
        }
        
        if (this.validateWord(word)) {
            this.addWordToChain(word, 'player');
            this.currentWord = word;
            this.playerScore += 10;
            this.elements.wordInput.value = '';
            
            this.playSound('correct');
            this.showMessage(`✅ Tuyệt vời! "${word}" là từ hợp lệ. (+10 điểm)`, 'success');
            this.updateDisplay();
            this.resetTimer();
            
            // Chuyển lượt cho máy
            this.isPlayerTurn = false;
            this.elements.wordInput.disabled = true;
            this.elements.submitBtn.disabled = true;
            
            setTimeout(() => this.computerTurn(), 1500);
        } else {
            this.handleMistake(this.getValidationError(word));
        }
    }
    
    validateFirstWord(word) {
        // Kiểm tra từ có trong từ điển
        if (!this.words.includes(word)) {
            return false;
        }
        
        // Kiểm tra từ đã được sử dụng chưa
        if (this.usedWords.has(word)) {
            return false;
        }
        
        // Kiểm tra từ đầu có khớp với từ cuối của từ mở đầu
        const lastWord = this.getLastWord(this.startWord);
        const firstWord = this.getFirstWord(word);
        if (lastWord.toLowerCase() !== firstWord.toLowerCase()) {
            return false;
        }
        
        return true;
    }
    
    validateWord(word) {
        // Kiểm tra từ có trong từ điển
        if (!this.words.includes(word)) {
            return false;
        }
        
        // Kiểm tra từ đã được sử dụng chưa
        if (this.usedWords.has(word)) {
            return false;
        }
        
        // Kiểm tra từ đầu có khớp với từ cuối của từ trước
        if (this.currentWord) {
            const lastWord = this.getLastWord(this.currentWord);
            const firstWord = this.getFirstWord(word);
            if (lastWord.toLowerCase() !== firstWord.toLowerCase()) {
                return false;
            }
        }
        
        return true;
    }
    
    getValidationError(word) {
        if (!this.words.includes(word)) {
            return `❌ "${word}" không có trong từ điển!`;
        }
        
        if (this.usedWords.has(word)) {
            return `❌ "${word}" đã được sử dụng rồi!`;
        }
        
        if (this.currentWord) {
            const lastWord = this.getLastWord(this.currentWord);
            const firstWord = this.getFirstWord(word);
            if (lastWord.toLowerCase() !== firstWord.toLowerCase()) {
                return `❌ "${word}" phải bắt đầu bằng từ "${lastWord}"!`;
            }
        }
        
        return `❌ "${word}" không hợp lệ!`;
    }
    
    async computerTurn() {
        this.elements.computerThinking.style.display = 'block';
        
        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
        
        const computerWord = this.findComputerWord();
        this.elements.computerThinking.style.display = 'none';
        
        if (computerWord) {
            this.addWordToChain(computerWord, 'computer');
            this.currentWord = computerWord;
            this.computerScore += 10;
            
            this.showMessage(`🤖 Máy chọn: "${computerWord}" (+10 điểm)`, 'info');
            this.updateDisplay();
            
            // Điền sẵn từ đầu tiên cho người chơi
            const lastWord = this.getLastWord(computerWord);
            this.elements.wordInput.value = lastWord + ' ';
            
            this.resetTimer();
            
            // Chuyển lượt cho người chơi
            this.isPlayerTurn = true;
            this.elements.wordInput.disabled = false;
            this.elements.submitBtn.disabled = false;
            this.elements.wordInput.focus();
            this.elements.wordInput.setSelectionRange(this.elements.wordInput.value.length, this.elements.wordInput.value.length);
            this.startTimer();
        } else {
            this.showMessage('🎉 Máy không tìm được từ nào! Bạn thắng!', 'success');
            this.endGame('player', 'no_words');
        }
    }
    
    findComputerWord() {
        if (!this.currentWord) return null;
        
        const lastWord = this.getLastWord(this.currentWord);
        const availableWords = this.words.filter(word => 
            !this.usedWords.has(word) && 
            this.getFirstWord(word).toLowerCase() === lastWord.toLowerCase()
        );
        
        if (availableWords.length === 0) {
            return null;
        }
        
        // Chọn từ ngẫu nhiên từ danh sách có sẵn
        return availableWords[Math.floor(Math.random() * availableWords.length)];
    }
    
    addWordToChain(word, type) {
        this.usedWords.add(word);
        this.wordChain.push({ word, type });
        
        const wordElement = document.createElement('span');
        wordElement.className = `word-item ${type}`;
        wordElement.textContent = word;
        
        if (this.elements.wordChainDisplay.querySelector('.start-word')) {
            this.elements.wordChainDisplay.innerHTML = '';
        }
        
        this.elements.wordChainDisplay.appendChild(wordElement);
        
        // Scroll to show latest word
        wordElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    updateDisplay() {
        this.elements.playerScore.textContent = this.playerScore;
        this.elements.computerScore.textContent = this.computerScore;
        this.elements.currentTurn.textContent = this.isPlayerTurn ? 'Bạn' : 'Máy';
        
        if (this.currentWord) {
            this.elements.currentWordDisplay.textContent = this.currentWord;
            this.elements.nextWord.textContent = this.getLastWord(this.currentWord);
        }
        
        if (this.elements.timerDisplay) {
            this.elements.timerDisplay.textContent = `${this.timeLeft}s`;
        }
        
        if (this.elements.mistakesDisplay) {
            this.elements.mistakesDisplay.textContent = `${this.playerMistakes}/${this.maxMistakes}`;
        }
        
        // Cập nhật hiển thị hints
        if (this.elements.hintsDisplay) {
            this.elements.hintsDisplay.textContent = `${this.maxHints - this.hintsUsed}/${this.maxHints}`;
            if (this.hintsUsed >= this.maxHints) {
                this.elements.hintsDisplay.classList.add('danger');
            } else {
                this.elements.hintsDisplay.classList.remove('danger');
            }
        }
        
        // Cập nhật hiển thị điểm cao nhất
        this.updateHighestScoreDisplay();
        
        // Cập nhật hiển thị lịch sử nếu cần
        if (this.gameHistory.length > 0) {
            this.updateHistoryDisplay();
        }
    }
    
    showHint() {
        if (!this.gameStarted || this.gameEnded || !this.isPlayerTurn) {
            this.showMessage('❌ Không thể sử dụng gợi ý lúc này!', 'error');
            return;
        }
        
        if (this.hintsUsed >= this.maxHints) {
            this.showMessage('❌ Bạn đã hết lượt gợi ý miễn phí! (3/3)', 'error');
            return;
        }
        
        const lastWord = this.getLastWord(this.currentWord);
        const availableWords = this.words.filter(word => 
            !this.usedWords.has(word) && 
            this.getFirstWord(word).toLowerCase() === lastWord.toLowerCase()
        );
        
        if (availableWords.length === 0) {
            this.showMessage('💡 Không có từ nào phù hợp. Bạn có thể đã thắng!', 'success');
            return;
        }
        
        this.hintsUsed++;
        
        // Disable hint button if no more hints
        if (this.hintsUsed >= this.maxHints) {
            this.elements.hintBtn.disabled = true;
            this.elements.hintBtn.classList.add('disabled');
        }
        
        const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        this.showMessage(`💡 Gợi ý: Thử từ "${randomWord}" (${this.hintsUsed}/${this.maxHints} lượt)`, 'info');
        this.updateDisplay();
    }
    
    endGame(winner, reason = 'normal') {
        this.gameEnded = true;
        this.gameStarted = false;
        this.gameReallyStarted = false;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Stop background music and play end game sound
        this.stopBackgroundMusic();
        if (winner === 'player') {
            this.playSound('gameWon');
        } else {
            this.playSound('gameFailed');
        }
        
        this.elements.wordInput.disabled = true;
        this.elements.submitBtn.disabled = true;
        this.elements.startBtn.disabled = false;
        
        // Lưu lịch sử game
        this.saveGameResult(winner, reason);
        
        // Hiển thị popup thắng/thua
        this.showGameEndPopup(winner, reason);
    }
    
    showGameEndPopup(winner, reason = 'normal') {
        const popup = document.createElement('div');
        popup.className = 'game-end-popup';
        
        let title, message, emoji, reasonText = '';
        if (winner === 'player') {
            title = 'Chúc Mừng!';
            message = 'Bạn đã thắng!';
            emoji = '🎉';
            popup.classList.add('win');
            if (reason === 'no_words') {
                reasonText = 'Máy không tìm được từ nào!';
            }
        } else {
            title = 'Game Over!';
            message = 'Bạn đã thua!';
            emoji = '😔';
            popup.classList.add('lose');
            if (reason === 'timeout') {
                reasonText = 'Hết thời gian!';
            } else if (reason === 'mistakes') {
                reasonText = 'Quá nhiều lỗi!';
            }
        }
        
        const isNewHighScore = this.playerScore > this.highestScore;
        if (isNewHighScore && winner === 'player') {
            this.highestScore = this.playerScore;
            this.saveHighestScore();
        }
        
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-emoji">${emoji}</div>
                <h2>${title}</h2>
                <p>${message}</p>
                ${reasonText ? `<p class="reason">${reasonText}</p>` : ''}
                <div class="final-score">
                    <p>Tỷ số cuối: Bạn ${this.playerScore} - ${this.computerScore} Máy</p>
                    <p>Số từ đã chơi: ${this.wordChain.length}</p>
                    ${isNewHighScore ? '<p class="new-record">🏆 Kỷ lục mới!</p>' : ''}
                    <p>Điểm cao nhất: ${this.highestScore}</p>
                </div>
                <button class="popup-btn" onclick="this.parentElement.parentElement.remove()">Đóng</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Auto remove after 15 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 15000);
    }
    
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timeLeft = 60;
        this.updateDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                if (this.isPlayerTurn && this.gameReallyStarted) {
                    this.showTimeUpPopup();
                    this.endGame('computer', 'timeout');
                } else if (this.isPlayerTurn && !this.gameReallyStarted) {
                    this.showMessage('⏰ Hết thời gian! Bạn chưa bắt đầu game.', 'error');
                    this.resetGame();
                }
            }
        }, 1000);
    }
    
    resetTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.timeLeft = 60;
        this.updateDisplay();
    }
    
    handleMistake(errorMessage) {
        this.playerMistakes++;
        this.updateDisplay();
        
        this.playSound('incorrect');
        
        if (this.playerMistakes >= this.maxMistakes) {
            this.showMessage(`${errorMessage} Bạn đã sai ${this.maxMistakes} lần và thua cuộc!`, 'error');
            this.endGame('computer', 'mistakes');
        } else {
            this.showMessage(`${errorMessage} (Sai ${this.playerMistakes}/${this.maxMistakes} lần)`, 'error');
            
            // Keep the first word when wrong, clear the rest
            const currentInput = this.elements.wordInput.value.trim();
            const words = currentInput.split(/\s+/);
            if (words.length > 0) {
                this.elements.wordInput.value = words[0] + ' ';
                this.elements.wordInput.focus();
                this.elements.wordInput.setSelectionRange(this.elements.wordInput.value.length, this.elements.wordInput.value.length);
            }
        }
    }
    
    getFirstWord(phrase) {
        return phrase.trim().split(/\s+/)[0];
    }
    
    getLastWord(phrase) {
        const words = phrase.trim().split(/\s+/);
        return words[words.length - 1];
    }
    
    getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
    
    showMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        this.elements.gameMessages.appendChild(messageElement);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
        
        // Scroll to show message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    clearMessages() {
        this.elements.gameMessages.innerHTML = '';
    }
    
    // Phương thức xử lý lịch sử game và điểm cao nhất
    loadGameHistory() {
        const history = localStorage.getItem('wordChainGameHistory');
        return history ? JSON.parse(history) : [];
    }
    
    loadHighestScore() {
        const score = localStorage.getItem('wordChainHighestScore');
        return score ? parseInt(score) : 0;
    }
    
    saveGameResult(winner, reason) {
        const gameResult = {
            date: new Date().toLocaleDateString('vi-VN'),
            time: new Date().toLocaleTimeString('vi-VN'),
            winner: winner,
            reason: reason,
            playerScore: this.playerScore,
            computerScore: this.computerScore,
            wordsPlayed: this.wordChain.length,
            duration: 60 - this.timeLeft
        };
        
        this.gameHistory.unshift(gameResult);
        // Chỉ lưu 10 game gần nhất
        if (this.gameHistory.length > 10) {
            this.gameHistory = this.gameHistory.slice(0, 10);
        }
        
        localStorage.setItem('wordChainGameHistory', JSON.stringify(this.gameHistory));
        this.updateHistoryDisplay();
    }
    
    saveHighestScore() {
        localStorage.setItem('wordChainHighestScore', this.highestScore.toString());
        this.updateHighestScoreDisplay();
    }
    
    updateHistoryDisplay() {
        if (!this.elements.gameHistoryDisplay) return;
        
        if (this.gameHistory.length === 0) {
            this.elements.gameHistoryDisplay.innerHTML = '<p>Chưa có lịch sử game nào.</p>';
            return;
        }
        
        let historyHTML = '<h4>🕒 Lịch sử 10 game gần nhất:</h4><div class="history-list">';
        
        this.gameHistory.forEach((game, index) => {
            const resultIcon = game.winner === 'player' ? '🏆' : '😔';
            const resultText = game.winner === 'player' ? 'Thắng' : 'Thua';
            let reasonText = '';
            
            if (game.reason === 'timeout') reasonText = ' (Hết thời gian)';
            else if (game.reason === 'mistakes') reasonText = ' (Quá nhiều lỗi)';
            else if (game.reason === 'no_words') reasonText = ' (Máy hết từ)';
            
            historyHTML += `
                <div class="history-item ${game.winner}">
                    <div class="history-header">
                        <span class="history-result">${resultIcon} ${resultText}${reasonText}</span>
                        <span class="history-date">${game.date} ${game.time}</span>
                    </div>
                    <div class="history-details">
                        <span>Điểm: ${game.playerScore} - ${game.computerScore}</span>
                        <span>Từ: ${game.wordsPlayed}</span>
                        <span>Thời gian: ${game.duration}s</span>
                    </div>
                </div>
            `;
        });
        
        historyHTML += '</div>';
        this.elements.gameHistoryDisplay.innerHTML = historyHTML;
    }
    
    showHistoryPopup() {
        this.updateHistoryDisplay();
        this.elements.historyPopup.style.display = 'flex';
    }
    
    hideHistoryPopup() {
        this.elements.historyPopup.style.display = 'none';
    }
    
    updateHighestScoreDisplay() {
        if (this.elements.highestScoreDisplay) {
            // Only show highest score when game is not started
            if (!this.gameStarted) {
                this.elements.highestScoreDisplay.textContent = this.highestScore;
            } else {
                this.elements.highestScoreDisplay.textContent = '---';
            }
        }
    }
    
    showTimeUpPopup() {
        const popup = document.createElement('div');
        popup.className = 'timeout-popup';
        
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-emoji">⏰</div>
                <h2>Hết Thời Gian!</h2>
                <p>Bạn đã hết 60 giây để suy nghĩ.</p>
                <p class="timeout-message">Game kết thúc - Bạn đã thua!</p>
                <button class="popup-btn" onclick="this.parentElement.parentElement.remove()">Đóng</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 5000);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordChainGame();
});
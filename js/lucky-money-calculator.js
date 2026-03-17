// Máy Tính Lì Xì Thông Minh - Sắp Tết 2027
class LuckyMoneyCalculator {
    constructor() {
        this.recipients = [];
        this.totalAmount = 0;
        this.init();
    }

    init() {
        console.log('Initializing Lucky Money Calculator...');
        this.loadFromStorage();
        this.renderCalculator();
        this.bindEvents();
        console.log('Lucky Money Calculator initialized successfully');
    }

    // Gợi ý số tiền lì xì theo độ tuổi
    getSuggestedAmount(age, relationship) {
        const baseAmounts = {
            'ong_ba': {
                '0-5': 100000,
                '6-10': 200000,
                '11-15': 500000,
                '16-18': 1000000,
                '19-22': 2000000,
                '23-25': 3000000,
                '26-30': 1000000,
                '31-40': 800000,
                '41-50': 600000,
                '51+': 500000
            },
            'cha_me': {
                '0-5': 200000,
                '6-10': 500000,
                '11-15': 1000000,
                '16-18': 2000000,
                '19-22': 3000000,
                '23-25': 5000000,
                '26-30': 2000000,
                '31-40': 1500000,
                '41-50': 1000000,
                '51+': 800000
            },
            'co_chu': {
                '0-5': 100000,
                '6-10': 200000,
                '11-15': 500000,
                '16-18': 1000000,
                '19-22': 2000000,
                '23-25': 3000000,
                '26-30': 800000,
                '31-40': 600000,
                '41-50': 400000,
                '51+': 300000
            },
            'bac_di': {
                '0-5': 100000,
                '6-10': 200000,
                '11-15': 500000,
                '16-18': 1000000,
                '19-22': 2000000,
                '23-25': 3000000,
                '26-30': 800000,
                '31-40': 600000,
                '41-50': 400000,
                '51+': 300000
            },
            'anh_chi': {
                '0-5': 50000,
                '6-10': 100000,
                '11-15': 200000,
                '16-18': 500000,
                '19-22': 1000000,
                '23-25': 2000000,
                '26-30': 500000,
                '31-40': 300000,
                '41-50': 200000,
                '51+': 100000
            },
            'em': {
                '0-5': 50000,
                '6-10': 100000,
                '11-15': 200000,
                '16-18': 500000,
                '19-22': 1000000,
                '23-25': 2000000,
                '26-30': 500000,
                '31-40': 300000,
                '41-50': 200000,
                '51+': 100000
            },
            'con': {
                '0-5': 200000,
                '6-10': 500000,
                '11-15': 1000000,
                '16-18': 2000000,
                '19-22': 3000000,
                '23-25': 5000000,
                '26-30': 2000000,
                '31-40': 1500000,
                '41-50': 1000000,
                '51+': 800000
            },
            'chau': {
                '0-5': 100000,
                '6-10': 200000,
                '11-15': 500000,
                '16-18': 1000000,
                '19-22': 2000000,
                '23-25': 3000000,
                '26-30': 800000,
                '31-40': 600000,
                '41-50': 400000,
                '51+': 300000
            },
            'chat': {
                '0-5': 50000,
                '6-10': 100000,
                '11-15': 200000,
                '16-18': 500000,
                '19-22': 1000000,
                '23-25': 2000000,
                '26-30': 500000,
                '31-40': 300000,
                '41-50': 200000,
                '51+': 100000
            },
            'ban': {
                '0-5': 50000,
                '6-10': 100000,
                '11-15': 200000,
                '16-18': 500000,
                '19-22': 1000000,
                '23-25': 2000000,
                '26-30': 500000,
                '31-40': 300000,
                '41-50': 200000,
                '51+': 100000
            },
            'dong_nghiep': {
                '0-5': 30000,
                '6-10': 50000,
                '11-15': 100000,
                '16-18': 200000,
                '19-22': 500000,
                '23-25': 1000000,
                '26-30': 300000,
                '31-40': 200000,
                '41-50': 100000,
                '51+': 50000
            },
            'nguoi_quen': {
                '0-5': 20000,
                '6-10': 30000,
                '11-15': 50000,
                '16-18': 100000,
                '19-22': 200000,
                '23-25': 500000,
                '26-30': 100000,
                '31-40': 50000,
                '41-50': 30000,
                '51+': 20000
            },
            'hang_xom': {
                '0-5': 20000,
                '6-10': 30000,
                '11-15': 50000,
                '16-18': 100000,
                '19-22': 200000,
                '23-25': 500000,
                '26-30': 100000,
                '31-40': 50000,
                '41-50': 30000,
                '51+': 20000
            },
            'khac': {
                '0-5': 20000,
                '6-10': 30000,
                '11-15': 50000,
                '16-18': 100000,
                '19-22': 200000,
                '23-25': 500000,
                '26-30': 100000,
                '31-40': 50000,
                '41-50': 30000,
                '51+': 20000
            }
        };

        let ageGroup = '51+';
        if (age <= 5) ageGroup = '0-5';
        else if (age <= 10) ageGroup = '6-10';
        else if (age <= 15) ageGroup = '11-15';
        else if (age <= 18) ageGroup = '16-18';
        else if (age <= 22) ageGroup = '19-22';
        else if (age <= 25) ageGroup = '23-25';
        else if (age <= 30) ageGroup = '26-30';
        else if (age <= 40) ageGroup = '31-40';
        else if (age <= 50) ageGroup = '41-50';

        let amount = baseAmounts[relationship] ? baseAmounts[relationship][ageGroup] : baseAmounts['khac'][ageGroup];

        // Làm tròn đến 50,000
        return Math.round(amount / 50000) * 50000;
    }

    addRecipient(name, age, relationship, amount, quantity = 1) {
        const recipient = {
            id: Date.now(),
            name: name || `Người nhận ${this.recipients.length + 1}`,
            age: parseInt(age),
            relationship,
            amount: parseInt(amount),
            quantity: parseInt(quantity),
            totalAmount: parseInt(amount) * parseInt(quantity),
            suggestedAmount: this.getSuggestedAmount(parseInt(age), relationship)
        };

        this.recipients.push(recipient);
        this.updateTotal();
        this.saveToStorage();
        this.renderRecipientsList();
    }

    removeRecipient(id) {
        this.recipients = this.recipients.filter(r => r.id !== id);
        this.updateTotal();
        this.saveToStorage();
        this.renderRecipientsList();
    }

    updateTotal() {
        this.totalAmount = this.recipients.reduce((sum, r) => sum + r.totalAmount, 0);
        this.updateTotalDisplay();
    }

    updateTotalDisplay() {
        const totalElement = document.getElementById('lucky-money-total');
        if (totalElement) {
            totalElement.textContent = this.formatCurrency(this.totalAmount);
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }

    renderCalculator() {
        console.log('Rendering calculator...');
        const calculatorHTML = `
            <div class="lucky-money-calculator">
                <h3>🧧 Máy Tính Lì Xì Thông Minh</h3>
                <p class="calculator-subtitle">Tính toán lì xì phù hợp cho từng độ tuổi và mối quan hệ</p>
                
                <div class="calculator-form">
                    <div class="form-group">
                        <label for="recipient-name">Tên người nhận (tùy chọn):</label>
                        <input type="text" id="recipient-name" placeholder="Nhập tên hoặc để trống...">
                    </div>
                    
                    <div class="form-group">
                        <label for="recipient-quantity">Số lượng:</label>
                        <input type="number" id="recipient-quantity" min="1" value="1" placeholder="Số lượng">
                    </div>
                    
                    <div class="form-group">
                        <label for="recipient-age">Tuổi:</label>
                        <input type="number" id="recipient-age" min="0" max="120" placeholder="Tuổi">
                    </div>
                    
                    <div class="form-group">
                        <label for="recipient-relationship">Mối quan hệ:</label>
                        <select id="recipient-relationship">
                            <option value="ong_ba">Ông bà</option>
                            <option value="cha_me">Cha mẹ</option>
                            <option value="co_chu">Cô chú</option>
                            <option value="bac_di">Bác dì</option>
                            <option value="anh_chi">Anh chị</option>
                            <option value="em">Em</option>
                            <option value="con">Con</option>
                            <option value="chau">Cháu</option>
                            <option value="chat">Chắt</option>
                            <option value="ban">Bạn</option>
                            <option value="dong_nghiep">Đồng nghiệp</option>
                            <option value="nguoi_quen">Người quen</option>
                            <option value="hang_xom">Hàng xóm</option>
                            <option value="khac">Khác</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="recipient-amount">Số tiền (VND):</label>
                        <input type="number" id="recipient-amount" placeholder="Nhập số tiền...">
                        <small class="suggested-amount" id="suggested-amount"></small>
                    </div>
                    
                    <button class="add-recipient-btn" onclick="luckyMoneyCalculator.addRecipientFromForm()">
                        ➕ Thêm vào danh sách
                    </button>
                </div>
                
                <div class="recipients-section">
                    <h4>📋 Danh sách lì xì</h4>
                    <div class="recipients-list" id="recipients-list">
                        <p class="empty-list">Chưa có ai trong danh sách</p>
                    </div>
                    
                    <div class="total-section">
                        <h4>💰 Tổng cộng: <span id="lucky-money-total">0 VND</span></h4>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="export-btn" onclick="luckyMoneyCalculator.exportList()">
                            📤 Xuất danh sách
                        </button>
                        <button class="clear-btn" onclick="luckyMoneyCalculator.clearList()">
                            🗑️ Xóa tất cả
                        </button>
                    </div>
                </div>
                
                <div class="tips-section">
                    <h4>💡 Gợi ý lì xì theo độ tuổi và mối quan hệ:</h4>
                    <div class="tips-grid">
                        <div class="tip-card">
                            <h5>👴👵 Ông bà</h5>
                            <p>500,000 - 2,000,000 VND</p>
                        </div>
                        <div class="tip-card">
                            <h5>👨👩 Cha mẹ</h5>
                            <p>1,000,000 - 5,000,000 VND</p>
                        </div>
                        <div class="tip-card">
                            <h5>👨‍👩‍👧‍👦 Cô chú, bác dì</h5>
                            <p>200,000 - 1,000,000 VND</p>
                        </div>
                        <div class="tip-card">
                            <h5>👶 Trẻ em (0-5 tuổi)</h5>
                            <p>50,000 - 100,000 VND</p>
                        </div>
                        <div class="tip-card">
                            <h5>🧒 Trẻ em (6-10 tuổi)</h5>
                            <p>100,000 - 200,000 VND</p>
                        </div>
                        <div class="tip-card">
                            <h5>👦 Thanh thiếu niên (11-18 tuổi)</h5>
                            <p>200,000 - 500,000 VND</p>
                        </div>
                        <div class="tip-card">
                            <h5>👨‍🎓 Sinh viên (19-25 tuổi)</h5>
                            <p>500,000 - 2,000,000 VND</p>
                        </div>
                        <div class="tip-card">
                            <h5>👨‍💼 Người lớn (26+ tuổi)</h5>
                            <p>100,000 - 500,000 VND</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Create a dedicated section for the calculator
        const calculatorSection = document.createElement('section');
        calculatorSection.className = 'lucky-money-calculator-section';
        calculatorSection.innerHTML = `
            <div class="container">
                <h2>🧧 Máy Tính Lì Xì Thông Minh</h2>
                <p class="section-subtitle">Tính toán lì xì phù hợp cho từng độ tuổi và mối quan hệ trong dịp Tết</p>
                ${calculatorHTML}
            </div>
        `;

        // Insert the calculator section before the features section
        const featuresSection = document.querySelector('.features-section');
        if (featuresSection) {
            console.log('Found features section, inserting calculator before it');
            featuresSection.parentNode.insertBefore(calculatorSection, featuresSection);
        } else {
            console.log('Features section not found, trying app section');
            // Fallback: insert before the app section
            const appSection = document.querySelector('.app-section');
            if (appSection) {
                console.log('Found app section, inserting calculator before it');
                appSection.parentNode.insertBefore(calculatorSection, appSection);
            } else {
                console.log('App section not found, appending to body');
                // Last resort: append to body
                document.body.appendChild(calculatorSection);
            }
        }
        
        // Update total display after rendering
        this.updateTotalDisplay();
        console.log('Calculator rendered successfully');
    }

    renderRecipientsList() {
        const listElement = document.getElementById('recipients-list');
        if (!listElement) return;

        if (this.recipients.length === 0) {
            listElement.innerHTML = '<p class="empty-list">Chưa có ai trong danh sách</p>';
            return;
        }

        const recipientsHTML = this.recipients.map(recipient => `
            <div class="recipient-item" data-id="${recipient.id}">
                <div class="recipient-info">
                    <h5>${recipient.name}</h5>
                    <p>${recipient.age} tuổi - ${this.getRelationshipText(recipient.relationship)}</p>
                    <p class="amount">${this.formatCurrency(recipient.amount)} × ${recipient.quantity} = ${this.formatCurrency(recipient.totalAmount)}</p>
                </div>
                <div class="recipient-actions">
                    <button class="remove-btn" onclick="luckyMoneyCalculator.removeRecipient(${recipient.id})">
                        ❌
                    </button>
                </div>
            </div>
        `).join('');

        listElement.innerHTML = recipientsHTML;
    }

    getRelationshipText(relationship) {
        const relationships = {
            'ong_ba': 'Ông bà',
            'cha_me': 'Cha mẹ',
            'co_chu': 'Cô chú',
            'bac_di': 'Bác đi',
            'anh_chi': 'Anh chị',
            'em': 'Em',
            'con': 'Con',
            'chau': 'Cháu',
            'chat': 'Chát',
            'ban': 'Bạn',
            'dong_nghiep': 'Đồng nghiệp',
            'nguoi_quen': 'Người quen',
            'hang_xom': 'Hàng xóm',
            'khac': 'Khác'
        };
        return relationships[relationship] || 'Khác';
    }

    addRecipientFromForm() {
        const name = document.getElementById('recipient-name').value.trim();
        const age = document.getElementById('recipient-age').value;
        const relationship = document.getElementById('recipient-relationship').value;
        const amount = document.getElementById('recipient-amount').value;
        const quantity = document.getElementById('recipient-quantity').value;

        if (!age || !amount || !quantity) {
            alert('Vui lòng điền đầy đủ thông tin tuổi, số tiền và số lượng!');
            return;
        }

        // Tạo tên hiển thị dựa trên mối quan hệ và số lượng
        let displayName = name;
        if (!displayName) {
            const relationshipText = this.getRelationshipText(relationship);
            if (parseInt(quantity) > 1) {
                displayName = `${relationshipText}: ${quantity} người`;
            } else {
                displayName = `${relationshipText}`;
            }
        }

        this.addRecipient(displayName, age, relationship, amount, quantity);
        
        // Reset form
        document.getElementById('recipient-name').value = '';
        document.getElementById('recipient-age').value = '';
        document.getElementById('recipient-amount').value = '';
        document.getElementById('recipient-quantity').value = '1';
        document.getElementById('suggested-amount').textContent = '';
    }

    exportList() {
        if (this.recipients.length === 0) {
            alert('Danh sách trống!');
            return;
        }

        const data = {
            title: 'Danh sách lì xì Tết 2027',
            date: new Date().toLocaleDateString('vi-VN'),
            recipients: this.recipients,
            total: this.totalAmount
        };

        const csv = this.generateCSV(data);
        this.downloadCSV(csv, 'danh-sach-li-xi-tet-2027.csv');
    }

    generateCSV(data) {
        let csv = 'Tên,Tuổi,Mối quan hệ,Số tiền,Số lượng,Tổng tiền\n';
        data.recipients.forEach(recipient => {
            csv += `${recipient.name},${recipient.age},${this.getRelationshipText(recipient.relationship)},${this.formatCurrency(recipient.amount)},${recipient.quantity},${this.formatCurrency(recipient.totalAmount)}\n`;
        });
        csv += `\nTổng cộng,,,${this.formatCurrency(data.total)}`;
        return csv;
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    clearList() {
        if (confirm('Bạn có chắc muốn xóa tất cả danh sách?')) {
            this.recipients = [];
            this.totalAmount = 0;
            this.saveToStorage();
            this.renderRecipientsList();
            this.updateTotalDisplay();
        }
    }

    bindEvents() {
        // Auto-suggest amount when age or relationship changes
        const ageInput = document.getElementById('recipient-age');
        const relationshipSelect = document.getElementById('recipient-relationship');
        const suggestedElement = document.getElementById('suggested-amount');

        if (ageInput && relationshipSelect && suggestedElement) {
            const updateSuggestion = () => {
                const age = parseInt(ageInput.value);
                const relationship = relationshipSelect.value;
                
                if (age && relationship) {
                    const suggested = this.getSuggestedAmount(age, relationship);
                    suggestedElement.textContent = `Gợi ý: ${this.formatCurrency(suggested)}`;
                    document.getElementById('recipient-amount').value = suggested;
                } else {
                    suggestedElement.textContent = '';
                }
            };

            ageInput.addEventListener('input', updateSuggestion);
            relationshipSelect.addEventListener('change', updateSuggestion);
        }
    }

    saveToStorage() {
        localStorage.setItem('luckyMoneyData', JSON.stringify({
            recipients: this.recipients,
            totalAmount: this.totalAmount
        }));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('luckyMoneyData');
        if (saved) {
            const data = JSON.parse(saved);
            this.recipients = data.recipients || [];
            this.totalAmount = data.totalAmount || 0;
        }
    }
}

// Initialize calculator when DOM is ready
let luckyMoneyCalculator;
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all other scripts have loaded
    setTimeout(() => {
        console.log('Initializing Lucky Money Calculator with delay...');
        luckyMoneyCalculator = new LuckyMoneyCalculator();
    }, 100);
}); 
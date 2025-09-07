function showCategories() {
    // ซ่อนคำถามทั้งหมด
    document.querySelectorAll('.questions-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // แสดงหมวดหมู่
    document.getElementById('categoriesSection').style.display = 'flex';
    
    // ซ่อนคำตอบ
    document.getElementById('answerSection').style.display = 'none';
}

function showQuestions(category) {
    // ซ่อนหมวดหมู่
    document.getElementById('categoriesSection').style.display = 'none';
    
    // ซ่อนคำถามทั้งหมด
    document.querySelectorAll('.questions-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // แสดงคำถามของหมวดหมู่ที่เลือก
    document.getElementById(category).classList.add('active');
    
    // ซ่อนคำตอบ
    document.getElementById('answerSection').style.display = 'none';
}

function showAnswer(question, answer) {
    const answerSection = document.getElementById('answerSection');
    const answerTitle = document.getElementById('answerTitle');
    const answerText = document.getElementById('answerText');
    
    answerTitle.textContent = question;
    answerText.textContent = answer;
    answerSection.style.display = 'block';
    
    // เลื่อนลงไปยังคำตอบ
    answerSection.scrollIntoView({ behavior: 'smooth' });
}

// เริ่มต้นแสดงหมวดหมู่
showCategories();

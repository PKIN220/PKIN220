const questionEl = document.getElementById('question');
const choiceEls = [
  document.getElementById('choice1'),
  document.getElementById('choice2'),
  document.getElementById('choice3')
];
const btnEls = [
  document.getElementById('btn1'),
  document.getElementById('btn2'),
  document.getElementById('btn3')
];
const pickedBox = document.getElementById('pickedBox');
const historyEl = document.getElementById('history');
const statsEl = document.getElementById('stats');

let history = [];
let autoPick = false;

function renderChoices() {
  btnEls.forEach((btn, i) => {
    btn.textContent = choiceEls[i].value;
  });
  renderStats();
}

function pick(choice) {
  if (!choice) return;
  const q = questionEl.value || "(ไม่มีคำถาม)";
  history.unshift({ q, a: choice, ts: new Date().toLocaleString() });
  pickedBox.style.display = 'block';
  pickedBox.textContent = 'คำตอบที่เลือก: ' + choice;
  renderStats();
  renderHistory();
}

function renderHistory() {
  historyEl.innerHTML = history.map(h =>
    `<div><small>${h.ts}</small><br>คำถาม: ${h.q}<br><b>คำตอบ: ${h.a}</b></div>`
  ).join('<hr>');
}

function renderStats() {
  const counts = {};
  choiceEls.forEach(c => counts[c.value] = 0);
  history.forEach(h => counts[h.a] = (counts[h.a]||0)+1);
  statsEl.innerHTML = Object.entries(counts)
    .map(([k,v]) => `<li>${k}: ${v} ครั้ง</li>`).join('');
}

document.getElementById('sendBtn').onclick = () => {
  if (autoPick) {
    const available = choiceEls.map(c=>c.value).filter(Boolean);
    if (available.length) {
      pick(available[Math.floor(Math.random()*available.length)]);
    }
  }
};

document.getElementById('clearBtn').onclick = () => {
  history = [];
  pickedBox.style.display = 'none';
  renderStats();
  renderHistory();
};

document.getElementById('randomBtn').onclick = () => {
  const available = choiceEls.map(c=>c.value).filter(Boolean);
  if (available.length) pick(available[Math.floor(Math.random()*available.length)]);
};

document.getElementById('autoBtn').onclick = (e) => {
  autoPick = !autoPick;
  e.target.classList.toggle('picked', autoPick);
};

btnEls.forEach((btn, i) => btn.onclick = () => pick(choiceEls[i].value));
choiceEls.forEach(c => c.oninput = renderChoices);

renderChoices();

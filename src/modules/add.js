// modules/add.js
export const newScore = () => {
  const nameInput = document.querySelector('#input-name');
  const scoreInput = document.querySelector('#input-score');
  
  const name = nameInput.value;
  const score = scoreInput.value;

  if (name === '' || score === '') {
    alert('Please provide both name and score.');
    return;
  }

  const li = document.createElement('li');
  li.textContent = `${name}: ${score}`;

  const scoreUl = document.querySelector('#score-ul');
  scoreUl.appendChild(li);

  // Clear input fields
  nameInput.value = '';
  scoreInput.value = '';
};

export const populateScores = () => {
  const scoreUl = document.querySelector('#score-ul');
  // Clear the existing list
  scoreUl.innerHTML = '';

  // Here, you should iterate through your score data and create list items
  // For simplicity, let's use some sample data
  const scores = [
    { name: '', score:  0 },
    { name: '', score:  0},

  ];

  scores.forEach(score => {
    const li = document.createElement('li');
    li.textContent = `${score.name}: ${score.score}`;
    scoreUl.appendChild(li);
  });
};

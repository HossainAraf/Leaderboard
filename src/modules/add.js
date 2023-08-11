// modules/add.js
export const newScore = () => {
  const nameInput = document.querySelector('#input-name');
  const scoreInput = document.querySelector('#input-score');
  const name = nameInput.value;
  const score = scoreInput.value;

  if (name === '' || score === '') {
    // eslint-disable-next-line no-alert
    alert('Please provide both name and score.');
    return;
  }

  const li = document.createElement('li');
  li.textContent = `${name}: ${score}`;

  const scoreUl = document.querySelector('#score-ul');
  scoreUl.appendChild(li);

  li.classList.add(scoreUl.children.length % 2 === 0 ? 'even' : 'odd');

  // Clear input fields
  nameInput.value = '';
  scoreInput.value = '';
};

export const populateScores = () => {
  const scoreUl = document.querySelector('#score-ul');
  // Clear the existing list
  scoreUl.innerHTML = '';

  // iterate through score data and create list items
  const scores = [
    { name: 'Name-1', score: 10 },

  ];

  scores.forEach((score) => {
    const li = document.createElement('li');
    li.textContent = `${score.name}: ${score.score}`;
    scoreUl.appendChild(li);
  });
};

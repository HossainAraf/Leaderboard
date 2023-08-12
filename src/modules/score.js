const form = document.querySelector('#add-new');
const gameId = localStorage.getItem('gameId');

const submitForm = async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');

  const data = {
    score: scoreInput.value,
    user: nameInput.value,
  };

  try {
    if (!gameId) {
      const createResponse = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Soccer LeadorBoard',
        }),
      });

      const createData = await createResponse.json();
      const [, gameId] = createData.result.match(/ID: (\w+)/);
      localStorage.setItem('gameId', gameId);
    }

    const scoresResponse = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    await scoresResponse.json();
  } catch (error) {
    const container = document.querySelector('#container');
    container.innerHTML = 'Error';
  }
};

// Display data

const dynamicDisplay = document.querySelector('#score-ul');
const refreshButton = document.querySelector('#refresh');

const refreshScores = async () => {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
    const data = await response.json();
    displayScores(data.result);
  } catch (error) {
    const container = document.querySelector('#container');
    container.innerHTML = 'Error';
  }
};

const displayScores = (scores) => {
  dynamicDisplay.innerHTML = '';

  scores.forEach((score) => {
    const scoreElement = document.createElement('div');
    scoreElement.innerHTML = `${score.user}: ${score.score}`;
    dynamicDisplay.appendChild(scoreElement);
  });
};

refreshButton.addEventListener('click', refreshScores);
form.addEventListener('submit', submitForm);
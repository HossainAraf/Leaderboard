const form = document.querySelector('#add-new');
const gameId = localStorage.getItem('gameId');

const dynamicDisplay = document.querySelector('#score-ul');
const refreshButton = document.querySelector('#refresh');

const displayScores = (scores) => {
  dynamicDisplay.innerHTML = '';

  scores.forEach((score) => {
    const scoreElement = document.createElement('div');
    scoreElement.innerHTML = `${score.user}: ${score.score}`;
    dynamicDisplay.appendChild(scoreElement);
  });
};

const refreshScores = async () => {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
    const data = await response.json();
    displayScores(data.result);
  } catch (error) {
    // Handle errors here if needed
  }
};

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
          name: 'Soccer Leaderboard',
        }),
      });

      const createData = await createResponse.json();
      const [, newGameId] = createData.result.match(/ID: (\w+)/);
      localStorage.setItem('gameId', newGameId);
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
    // Handle errors here if needed

  }
};

refreshButton.addEventListener('click', refreshScores);
form.addEventListener('submit', submitForm);

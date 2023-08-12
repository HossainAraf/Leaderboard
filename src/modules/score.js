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

    // alert('score posted successfully');
  } catch (error) {
    // alert('Something went wrong');
  }
};

// Display data

const dynamicDisplay = document.querySelector('#score-ul');
const refreshButton = document.querySelector('#refresh');

const refreshScores = async () => {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
    const data = await response.json();
    // eslint-disable-next-line no-alert
    alert('Score received:', data);
    // eslint-disable-next-line no-use-before-define
    displayScores(data.result);
  } catch (error) {
    alert('Error fetching scores:', error);
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
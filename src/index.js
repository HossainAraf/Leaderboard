// index.js
import './styles/style.css'
import { newScore, populateScores } from './modules/add.js';

// Add an event listener to the 'submit' button to trigger the newScore function
document.querySelector('#submit').addEventListener('click', newScore);

// Add an event listener to the 'Refresh' button to populate scores
document.querySelector('#btn-refresh').addEventListener('click', populateScores);

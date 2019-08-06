const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const keyboardButtons = document.querySelectorAll('#qwerty button');
const hearts = document.querySelectorAll('.tries img');

console.log(hearts);

let missed = 0;
const phrases = [
  'A barking dog never bites',
  'A bird in the hand is worth two in the bush',
  'A fish always rots from the head down',
  'A friend in need is a friend indeed',
  'A leopard cannot change its spots'
];

function getRandomPhraseAsArray(arr) {
  let randonNumber = Math.floor((Math.random() * arr.length));
  let splitPhrase = arr[randonNumber].split('');
  return splitPhrase;
}

const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
  let li;
  const list = document.querySelector('#phrase ul');
  for(let i = 0; i < arr.length; i++) {
    li = document.createElement('li');
    if(arr[i] !== ' ') {
      li.classList.add('letter');
      li.textContent = arr[i];
      list.appendChild(li);
    } else {
      li.classList.add('space');
      li.textContent = arr[i];
      list.appendChild(li);
    }
  }
  return list;
}

startButton.addEventListener('click', function(e) {
  const phraseArray = getRandomPhraseAsArray(phrases);
  let buttonTextContent = e.target.textContent;
  if(buttonTextContent === 'Start Game') {
    overlay.style.visibility = 'hidden';
    addPhraseToDisplay(phraseArray);
  } else if (buttonTextContent === 'Try Again') {
    reset();
    overlay.style.visibility = 'hidden';
    addPhraseToDisplay(phraseArray);
    }
});

qwerty.addEventListener('click', function checkLetter(e) {
  const lettersInPhrase = document.querySelectorAll('.letter');
  let letterFound = null;
  if(event.target.tagName === 'BUTTON') {
    event.target.classList.add('chosen');
    event.target.setAttribute('disabled', true);
    for(let i = 0; i<lettersInPhrase.length; i++) {
      let letter = lettersInPhrase[i].innerText.toLowerCase();
      if(letter.indexOf(event.target.innerText) >= 0) {
        lettersInPhrase[i].classList.add('show');
        letterFound = lettersInPhrase[i].innerText;
      }
    }
    if(!letterFound) {
      hearts[missed].setAttribute('src', 'images/lostHeart.png');
      missed++;
    }
    checkWin(missed);

  }
  return letterFound;
});

function checkWin(score) {
  let numberOfLetters = document.querySelectorAll('.letter').length;
  let numberOfShow = document.querySelectorAll('.show').length;
  let msg = document.createElement('p');

  if (score >= 5) {
    overlay.classList.add("lose");
    startButton.textContent = 'Try Again';
    msg.textContent = 'You lose';
    overlay.appendChild(msg);
    overlay.style.visibility = 'visible';
    missed = 0;
  } else if (numberOfLetters === numberOfShow) {
    overlay.classList.add("win");
    startButton.textContent = 'Try Again';
    msg.textContent = 'You won';
    overlay.appendChild(msg);
    overlay.style.visibility = 'visible';
    missed = 0;
  }
}

function reset() {
  document.querySelector('#phrase ul').innerHTML = '';

  if(overlay.classList.contains('win')) {
    overlay.classList.remove('win');
  } else if(overlay.classList.contains('lose')) {
    overlay.classList.remove('lose');
  }
  let msg = document.querySelector('#overlay p');
  overlay.removeChild(msg);

  for(let i = 0; i < keyboardButtons.length; i++) {
    if(keyboardButtons[i].classList.contains('chosen')) {
      keyboardButtons[i].classList.remove('chosen');
      keyboardButtons[i].removeAttribute('disabled');
    }
  }

  for(let i = 0; i < hearts.length; i++) {
    hearts[i].setAttribute('src', 'images/liveHeart.png');
  }
}

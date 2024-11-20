function repeat(string, repetation) {
  if (repetation === 0) {
    return "";
  }

  return string + repeat(string, repetation - 1);
}

function spacialMessage() {
  const nextIndex = previousIndex + dice;
  const position = currentPlayer === player1 ? player1Index : player2Index;
  const spMessage1 = "🪜🪜 " + currentPlayer + " got a ladder from " + nextIndex;
  const spMessage2 = "🐍🐍 snake bit " + currentPlayer + " from " + nextIndex;
  const spMessage3_1 = "✋ " + currentPlayer + " you need a number '<=' ";
  const spMessage3_2 = (gameMax - position) + " to be in " + gameMax + ".";

  if (previousIndex === position) {
    return spMessage3_1 + spMessage3_2;
  }

  if (nextIndex !== position) {
    return nextIndex > position ? spMessage2 : spMessage1;
  }

  return "";
}

function statusMessage(status) {
  const p1Length = ("" + player1Index).length;
  const p2Length = ("" + player2Index).length;

  const boxLine1 = " " + repeat("-", 37);
  const boxLine2_1 = "|  " + player1 + "" + repeat(" ", 15 - player1.length);
  const boxLine2_2 = " |  " + player2 + repeat(" ", 15 - player2.length) + " |";
  const boxLine2 = boxLine2_1 + boxLine2_2;
  const boxLine4_1 = "|" + repeat(" ", 9) + player1Index;
  const boxLine4_2 = repeat(" ", 9 - p1Length) + "|" + repeat(" ", 8);
  const boxLine4_3 = player2Index + repeat(" ", 10 - p2Length) + "|";
  const boxLine4 = boxLine4_1 + boxLine4_2 + boxLine4_3;

  const instLine1 = "turn of : " + currentPlayer;
  const instLine2 = "dice : " + dice;
  const instLine3 = "press enter to next.";
  const instLine4 = "";

  const line0 = repeat(" ", 65) + "position"
  let line1 = "\n" + instLine1 + repeat(" ", 50 - instLine1.length) + boxLine1;
  let line2 = "\n" + instLine2 + repeat(" ", 50 - instLine2.length) + boxLine2;
  let line3 = "\n" + instLine3 + repeat(" ", 50 - instLine3.length) + boxLine1;
  let line4 = "\n" + instLine4 + repeat(" ", 50 - instLine4.length) + boxLine4;
  let line5 = "\n" + repeat(" ", 50) + boxLine1;
  let line6 = "\n" + spacialMessage();

  if (status === "default") {
    const defLine2 = "press enter to roll the dice.";
    line2 = "\n" + defLine2 + repeat(" ", 50 - defLine2.length) + boxLine2;
    line3 = "\n" + repeat(" ", 50) + boxLine1;
    line4 = "\n" + repeat(" ", 50) + boxLine4;
    line6 = "\n" + "";

  }

  const message = line0 + line1 + line2 + line3 + line4 + line5 + line6;

  return message;
}

function gameOver() {
  const winner = player1Index === gameMax ? player1 : player2;
  const over = repeat(" ", 40) + "🎉🎉🎉 Finished 🎉🎉🎉";
  const correction = Math.floor(winner.length / 2);
  const victory = repeat(" ", 40 - correction) + "🏆🏆🏆 winner 🤝 " + winner + " 🏆🏆🏆";

  return over + "\n" + "\n" + victory + "\n" + "\n";
}

function ladder(position) {
  switch (position) {
    case 4:
      return 56;
    case 12:
      return 50;
    case 14:
      return 55;
    case 22:
      return 58;
    case 41:
      return 79;
    case 54:
      return 88;
    default:
      return position;
  }
}

function snake(position) {
  switch (position) {
    case 28:
      return 10;
    case 37:
      return 3;
    case 48:
      return 16;
    case 75:
      return 32;
    case 94:
      return 71;
    case 96:
      return 42;
    default:
      return position;
  }
}

function nextPosition(position) {
  previousIndex = position;
  let newPosition = position + dice;
  const positionInLadder = ladder(newPosition);
  const positionInSnake = snake(newPosition);

  if (newPosition > gameMax) {
    return position;
  }

  return positionInLadder !== newPosition ? positionInLadder : positionInSnake;
}

function rollDice() {
  dice = Math.ceil(Math.random() * 6);

  return;
}

function snakeAndLadder(turn) {
  if (player1Index >= gameMax || player2Index >= gameMax) {
    console.log(gameOver());

    return;
  }

  console.clear();

  currentPlayer = turn > 0 ? player1 : player2;

  console.log(statusMessage("default"));

  prompt("");
  console.clear();

  rollDice();

  if (currentPlayer === player1) {
    player1Index = nextPosition(player1Index);
  } else {
    player2Index = nextPosition(player2Index);
  }

  console.log(statusMessage());

  prompt("");

  return snakeAndLadder(turn * -1);
}

console.clear();

const start = 1;
const gameMin = 4;
const gameMax = 10;
const player1 = prompt("player1 Name : ", "p1");
const player2 = prompt("player2 Name : ", "p2");
let dice = 0;
let currentPlayer = "";
let player1Index = gameMin;
let player2Index = gameMin;
let previousIndex = 0;

snakeAndLadder(start);

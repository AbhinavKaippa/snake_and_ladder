function repeat(string, repetation) {
  if (repetation === 0) {
    return "";
  }

  return string + repeat(string, repetation - 1);
}

function correction(element, size) {
  
}

function line(rowNumber) {
  let lineString = "|";
  let element = rowNumber * column;
  let difference = -1;
  let verticalLine = "";

  if (rowNumber <= 0) {
    return repeat("-", prevLine.length);
  }

  if (rowNumber % 2 !== 0) {
    element = element - (column - 1);
    difference = 1;
  }

  for (let index = 0; index < column; index++) {
    // lineString = lineString + element + repeat(" ", 5 - ("" + element).length) + "|";
    lineString = lineString + correction(element, size) + "|";
    element = element + difference;
  }

  verticalLine = repeat("-", lineString.length);

  prevLine = verticalLine;

  return verticalLine + "\n" + lineString;;
}

function grid(rowNumber) {
  // console.log(repeat("-", column * size));

  // if (rowNumber > row * size) {
  if (rowNumber < 0) {
    return;
  }

  console.log(line(rowNumber));

  return grid(rowNumber - 1)
}

const size = 1;
const column = 10;
const row = 10;
let prevLine = "";
grid(row);

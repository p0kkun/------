const board = document.querySelector('.row');
const message = document.querySelector("#msg");
const randomButton = document.querySelector("#random");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const numberElement = document.querySelector("#number");
const historyElement = document.querySelector("#history");
const cells = [];
// ビンゴマス目の生成
for (let i = 0; i < 25; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  const number = document.createElement('p');
  number.classList.add('number');
  const mark = document.createElement('p');
  mark.classList.add('mark');
  cell.appendChild(number);
  cell.appendChild(mark);
  cells.push({ number, mark });
  board.appendChild(cell);
}
// ランダムボタンのクリックイベントハンドラ
randomButton.addEventListener("click", () => {
  randomButton.disabled = true; // ボタンを無効化
  // 0 から 100 のランダムな数字を生成してセルに表示
  cells.forEach((cell) => {
    const randomNumber = Math.floor(Math.random() * 51);
    cell.number.textContent = randomNumber;
    cell.mark.textContent = "";
  });
});
// スタートボタンのクリックイベントハンドラ
startButton.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * 51);
  numberElement.textContent = randomNumber;
  // ヒストリーに数字を追加
  const historyItem = document.createElement('span');
  historyItem.textContent = `${randomNumber}, `;
  historyElement.appendChild(historyItem);
  // 該当するセルに○を表示
  cells.forEach((cell) => {
    if (parseInt(cell.number.textContent) === randomNumber) {
      cell.mark.textContent = "〇";
      cell.mark.classList.add('mark');
    }
  });
  checkBingo(); // ビンゴのチェック
});
// リセットボタンのクリックイベントハンドラ
resetButton.addEventListener("click", () => {
  randomButton.disabled = false; // ランダムボタンを有効化
  // セルの中身とマークをリセット
  cells.forEach((cell) => {
    cell.number.textContent = "";
    cell.mark.textContent = "";
  });
  numberElement.textContent = "★☆★☆"; // h2要素を初期値にリセット
  historyElement.textContent = "ヒストリー: "; // ヒストリーをリセット
  message.textContent = ""; // ビンゴメッセージをリセット
  startButton.disabled = false; // スタートボタンを有効化
});
const checkBingo = () => {
  const patterns = [
    [0, 1, 2, 3, 4], // 横のライン
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20], // 縦のライン
[1, 6, 11, 16, 21],
[2, 7, 12, 17, 22],
[3, 8, 13, 18, 23],
[4, 9, 14, 19, 24],
[0, 6, 12, 18, 24], // 斜めのライン
[4, 8, 12, 16, 20]
];
for (const pattern of patterns) {
const cellsInPattern = pattern.map((index) => cells[index]);
const markedCells = cellsInPattern.filter((cell) => cell.mark.textContent === '〇');
if (markedCells.length === 5) {
displayBingo();
startButton.disabled = true; // スタートボタンを無効化
return;
}
}
};
const displayBingo = () => {
message.textContent = "ビンゴ！";
numberElement.textContent = "ビンゴ！"
}
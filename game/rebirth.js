//ゲームボードのサイズ
const boardSize = 8

//ゲームボードの初期状態
const initialBoardState = [
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
]

//ゲームボードの状態
let boardState = [...initialBoardState]

//現在のプレーヤー（１：黒、２：白）
let currentPlayer = 1

//ドラッグ中の駒の情報
let draggedPiece = null
let draggedPieceOriginalCell = null

//ゲームボードを描画
function drawBoard() {
    const boardBody = document.getElementById('boardBody')

    //すでに存在するセルを削除
    while (boardBody.firstChild) {
        boardBody.firstChild.remove()
    }
    for (let row = 0; row < boardSize; row++) {
        const newRow = document.createElement('tr')
        for (let col = 0; col < boardSize; col++) {
            const newCell = document.createElement('td')
            newCell.classList.add('cell', boardState[row][col])
            newCell.addEventListener('dragover', allowDrop)
            newCell.addEventListener('drop', dropPiece)
            newRow.appendChild(newCell)
        }
        boardBody.appendChild(newRow)
    }
    //駒を作成してセルに追加
    const cells = document.querySelectorAll('.cell.empty')
    cells.forEach(cell => {
        const piece = document.createElement('div')
        piece.classList.add('piece')
        piece.addEventListener('dragstart', dragPiece)
        cell.appendChild(piece)
    })
}
//ドラッグの開始の処理
function dragPiece(event) {
    draggedPiece = event.target
    draggedPieceOriginalCell = event.target.parentNode
    event.dateTransfer.setDate('text/plain', '')//firefoxのバグ回避のためのデータ設定
}
//ドラッグを許可
function allowDrop(event) {
    event.preventDefault()
}
function dropPiece(event) {
    event.preventDefault()
    const targetCell = event.target
    const pieceColor = (cerrentPlayer === 1) ? 'black' : 'white'

    if (targetCell.classList.contains('empty')) {
        targetCell.appendChild(draggedPiece)
        draggedPieceOriginalCell.classList.add('empty')
        draggedPiece = null
        draggedPieceOriginalCell = null

        //駒を配置
        const row = parseInt(targetCell.parentNode.getAttritude('dateRow'))
        const col = parseInt(targetCell.getAttritude('dateCol'))
        boardState[row][col] = pieceColor

        //反転処理
        flipPiece(row, col, pieceColor)

        //ゲームボードを再描写
        drawBoard()

        //ターンを切り替え
        currentPlayer = (currentPlayer === 1) ? 2 : 1

        //勝利条件をチェック
        checkWinCondition()
    }
}

//駒の反転処理
function flipPiece(row, col, color) {
    const directions = [
        { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
        { row: 0, col: -1 }, { row: 0, col: 1 },
        { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 },
    ]

    directions.forEach(dir => {
        const flippedPieces = []
        let cerrentRow = row + dir.row
        let currentCol = col + dir.col
        while (isValidPosition(currentRow, currentCol) && boardState[currentRow][currentCol] !== 'empty') {
            if (boardState[currentRow][currentCol] !== color) {
                flippedPieces.push({ row: currentRow, col: currentCol })
                currentRow += dir.row
                currentCol += dir.col
            } else {
                //反転処理
                flippedPieces.forEach(piece => {
                    boardState[piece.row][piece.col] = color
                })
                break
            }
        }
    })
}
function checkWinCondition() {
    const blackCount = countPieces('black')
    const whiteCount = countPieces('white')

    if (blackCount === 0 || whiteCount === 0 || blackCount + whiteCount === boardSize * boardSize) {
        if (blackCount > whiteCount) {
            alert('黒の勝利')
        } else if (whiteCount > blackCount) {
            alert('白の勝利')
        } else {
            alert('引き分け')
        }
        //ゲームリセット
        resetBoard()
    }
}
//ゲームボードを回転するアニメーション
        const board = document.querySelector('.board');
        board.addEventListener('animationend', () => {
            board.style.animation = 'none';
        });
        function rotateBoard() {
            board.style.animation = 'rotateBoard 5s infinite linear';
        }
        // 駒を回転するアニメーション
        function rotatePiece(piece) {
            piece.style.animation = 'rotatePiece 1s infinite linear';
        }
        // ゲームボードを描画する関数...
        // ドラッグ&ドロップの処理...
        // 反転処理と勝利条件の判定...
       

//駒の数を数える
function countPieces(color) {
    let count = 0
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (boardState[row][col] === color) {
                count++
            }
        }
    }
    return count
}
//ゲームボードを初期化
function resetBoard() {
    boardState = [...initialBoardState]
    currentPlayer = 1
    drawBoard
}
 // ゲームボードを回転するアニメーションを開始
 
//  rotateBoard();
 // ゲームボードを描画
 drawBoard();
 //コマを置く処理
        function placePiece(row, col, color) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.classList.add(color);
            cell.appendChild(piece);
            rotatePiece(piece);
        }
        // テスト用：黒いコマを(3, 3)の位置に置く
        placePiece(3, 3, 'black');
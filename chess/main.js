var questionPieces = Array.from(document.querySelectorAll("#question div"));
var answerPieces = Array.from(document.querySelectorAll("#chess div"));
// 用栈来记录步骤，可以撤回或生成答案
var historyNum = [];
// 矩阵用来记录棋盘的棋子状态
var answerMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
// 深拷贝
var questionMarix = JSON.parse(JSON.stringify(answerMatrix));

// 最强大脑题目，8道题
var question = [
  [17, 22, 26, 29, 42, 45, 58, 61],
  [0, 7, 2, 5, 27, 28, 42, 45],
  [10, 13, 27, 28, 32, 39, 48, 55],
  [0, 7, 9, 14, 27, 28, 50, 53],
  [9, 14, 18, 21, 42, 45, 51, 52],
  [0, 7, 18, 21, 27, 28, 42, 45],
  [2, 5, 18, 21, 42, 45, 58, 61],
  [56, 63, 42, 45, 58, 61, 24, 31, 35, 36, 26, 29, 8, 15, 18, 21, 9, 14, 1, 6],
];
// 初始化题目
function initQuestion(question) {
  questionMarix.map((a, i, self) => {
    a.map((b, j) => {
      self[i][j] = 0;
    });
  });
  for (index of question) {
    let adjPiece = getMatrixAdj(index);
    adjPiece.map((num) => {
      if (num != null) {
        let [i, j] = getPosition(num);
        questionMarix[i][j] = questionMarix[i][j] ? 0 : 1;
      }
    });
  }
}

// matrix 和 class绑定
function start(Pieces, matrix) {
  Pieces.map((piece, index) => {
    let [i, j] = getPosition(index);
    if (matrix[i][j]) {
      piece.className = "black";
    } else {
      piece.className = "white";
    }
  });
}

initQuestion(question[0]);
start(questionPieces, questionMarix);

// 获得矩阵相邻块的序号
function getMatrixAdj(num) {
  let left = num % 8 == 0 ? null : num - 1;
  let right = num % 8 == 7 ? null : num + 1;
  let up = num / 8 < 1 ? null : num - 8;
  let down = num / 8 >= 7 ? null : num + 8;
  return [num, left, right, up, down];
}
//将序号转为坐标
function getPosition(num) {
  let i = parseInt(num / 8); // 行号
  let j = num % 8; //列号
  return [i, j];
}

// 每个块添加点击事件
answerPieces.map((piece, index) => {
  piece.addEventListener("click", function (e) {
    //记录点击步骤，方便撤销
    historyNum.push(index);
    // 1. 变换矩阵，2. 初始化样式
    let adjPiece = getMatrixAdj(index);
    adjPiece.map((num) => {
      if (num != null) {
        let [i, j] = getPosition(num);
        answerMatrix[i][j] = answerMatrix[i][j] ? 0 : 1;
      }
    });
    start(answerPieces, answerMatrix);
    setTimeout(function () {
      if (answerMatrix.toString() === questionMarix.toString()) {
        alert("恭喜你！作答成功,可以挑战隐藏题目再做哦");
      }
    }, 100);
  });
});
// 题目区
var hideanswerButton = document.querySelector(".hideanswer");
hideanswerButton.addEventListener("click", (e) => {
  e.target.innerHTML = e.target.innerHTML == "显示" ? "隐藏" : "显示";
  if (e.target.innerHTML == "显示") {
    let node = Array.from(document.querySelectorAll("#question div"));
    node.map((item) => {
      item.className = "white";
    });
  } else {
    start(questionPieces, questionMarix);
  }
});

var answerButtoon = document.querySelector(".answer");
answerButtoon.addEventListener("click", (e) => {
  questionMarix.map((a, i, self) => {
    a.map((b, j) => {
      self[i][j] = 0;
    });
  });
  stepStart(question[0]);
});

function stepStart(question) {
  let nodes = new Array(...question);
  let id = setInterval(() => {
    let node = nodes.shift();
    if (node || node == 0) {
      questionPieces[node].style.cssText = "border:1px solid red";
      let adjPiece = getMatrixAdj(node);
      adjPiece.map((num) => {
        if (num != null) {
          let [i, j] = getPosition(num);
          questionMarix[i][j] = questionMarix[i][j] ? 0 : 1;
        }
      });
      start(questionPieces, questionMarix);
    } else {
      for (node of question) {
        questionPieces[node].style.cssText = "";
      }
      clearInterval(id);
    }
  }, 500);
}
var leftButton = document.querySelector(".left");
leftButton.addEventListener("click", (e) => {
  let left = question.shift();
  question.push(left);
  initQuestion(question[0]);
  start(questionPieces, questionMarix);
});

var rightButton = document.querySelector(".right");
rightButton.addEventListener("click", (e) => {
  let right = question.pop();
  question.unshift(right);
  initQuestion(question[0]);
  start(questionPieces, questionMarix);
});

// 作答区，撤销 重置

var undoButton = document.querySelector(".undo");
undoButton.addEventListener("click", () => {
  let lastnum = historyNum.pop();
  if (lastnum) {
    let adjPiece = getMatrixAdj(lastnum);
    adjPiece.map((num) => {
      if (num != null) {
        let [i, j] = getPosition(num);
        answerMatrix[i][j] = answerMatrix[i][j] ? 0 : 1;
      }
    });
  }
  start(answerPieces, answerMatrix);
});

var resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  answerMatrix.map((a, i, self) => {
    a.map((b, j) => {
      self[i][j] = 0;
    });
  });
  historyNum = [];
  start(answerPieces, answerMatrix);
});

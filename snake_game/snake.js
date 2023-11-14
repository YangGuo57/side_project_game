
// Get snake
const snake = document.getElementById("snake")

// Get snake body
const snakes = snake.getElementsByTagName("div")

// Get food
const food = document.getElementById("food")

// Get level and score
const scoreSpan = document.getElementById("score")
const levelSpan = document.getElementById("level")

let score = 0
let level = 0

// get random food
function changeFood() {
  const x = Math.floor(Math.random() * 30) * 10
  const y = Math.floor(Math.random() * 30) * 10
  // 设置食物的坐标
  food.style.left = x + "px"
  food.style.top = y + "px"
}
changeFood()

// snake direction
let dir
let keyActive = true

const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

// stop turnaround: when body greater than 2

// reverse direction
const reObj = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
}

document.addEventListener("keydown", (event) => {
  if (keyActive && keyArr.includes(event.key)) {
    // Check turnaround
    if (snakes.length < 2 || reObj[dir] !== event.key) {
      // Set direction
      dir = event.key
      keyActive = false
    }
  }
})

// Set snake move. Change tail location and make it to head

setTimeout(function move() {
  // Get snake head
  const head = snakes[0]

  // Get head coordinates
  let x = head.offsetLeft
  let y = head.offsetTop

  switch (dir) {
    case "ArrowUp":
      y = y - 10
      break
    case "ArrowDown":
      y = y + 10
      break
    case "ArrowLeft":
      x = x - 10
      break
    case "ArrowRight":
      x = x + 10
      break
  }

  // Check if eaten
  if (
    head.offsetTop === food.offsetTop &&
    head.offsetLeft === food.offsetLeft
  ) {
    // Change food location
    changeFood()
    // Increase body length
    snake.insertAdjacentHTML("beforeend", "<div></div>")
    // Score++
    score++
    scoreSpan.textContent = score
    // Level up when hit 10 scores
    if (score % 10 === 0 && level < 10) {
      level++
      levelSpan.textContent = level + 1
    }
  }


  // Check if hit wall
  if (x > 290 || x < 0 || y > 290 || y < 0) {
    alert("Game Over!")
    return
  }

  // Check if hit itself
  for (let i = 0; i < snakes.length - 1; i++) {
    if (snakes[i].offsetLeft === x &&
      snakes[i].offsetTop === y
    ) {
      alert("Game Over!")
      return
    }
  }
  // Get snake tail
  const tail = snakes[snakes.length - 1]
  tail.style.left = x + "px"
  tail.style.top = y + "px"

  // Move tail to head
  snake.insertAdjacentElement("afterbegin", tail)

  keyActive = true

  setTimeout(move, 100 - level * 10)
}, 100)
// 贪吃蛇游戏 - 主逻辑文件
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        this.gameStatusElement = document.getElementById('gameStatus');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        // 游戏配置
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // 游戏状态
        this.snake = [];
        this.food = { x: 0, y: 0 };
        this.direction = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.gameSpeed = 150; // 初始速度（毫秒）
        this.minSpeed = 50;   // 最小速度
        this.speedDecrease = 5; // 每吃一个食物减少的毫秒数
        this.isPlaying = false;
        this.isPaused = false;
        this.gameLoop = null;
        
        // 初始化
        this.init();
        this.setupEventListeners();
        this.updateHighScoreDisplay();
    }
    
    init() {
        // 初始化蛇 - 长度为3，在中间位置
        this.snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        
        // 初始方向向右
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        
        // 生成第一个食物
        this.generateFood();
        
        // 重置分数和速度
        this.score = 0;
        this.gameSpeed = 150;
        this.updateScoreDisplay();
        
        // 绘制初始状态
        this.draw();
        
        // 更新状态显示
        this.updateGameStatus('准备开始', 'status-ready');
    }
    
    setupEventListeners() {
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
        
        // 按钮控制
        this.startBtn.addEventListener('click', () => {
            if (!this.isPlaying) {
                this.startGame();
            }
        });
        
        this.pauseBtn.addEventListener('click', () => {
            if (this.isPlaying) {
                this.togglePause();
            }
        });
        
        this.resetBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        // 触摸控制（移动设备）
        this.setupTouchControls();
    }
    
    setupTouchControls() {
        // 简单的触摸控制 - 滑动方向
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!this.isPlaying || this.isPaused) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            
            // 确定滑动方向
            if (Math.abs(dx) > Math.abs(dy)) {
                // 水平滑动
                if (dx > 0 && this.direction.x !== -1) {
                    this.nextDirection = { x: 1, y: 0 }; // 右
                } else if (dx < 0 && this.direction.x !== 1) {
                    this.nextDirection = { x: -1, y: 0 }; // 左
                }
            } else {
                // 垂直滑动
                if (dy > 0 && this.direction.y !== -1) {
                    this.nextDirection = { x: 0, y: 1 }; // 下
                } else if (dy < 0 && this.direction.y !== 1) {
                    this.nextDirection = { x: 0, y: -1 }; // 上
                }
            }
        });
    }
    
    handleKeyPress(e) {
        if (!this.isPlaying || this.isPaused) return;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (this.direction.y !== 1) this.nextDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (this.direction.y !== -1) this.nextDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (this.direction.x !== 1) this.nextDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (this.direction.x !== -1) this.nextDirection = { x: 1, y: 0 };
                break;
            case ' ': // 空格键暂停
                this.togglePause();
                break;
        }
    }
    
    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.isPaused = false;
        this.updateGameStatus('游戏中...', 'status-playing');
        this.startBtn.textContent = '游戏中';
        this.startBtn.disabled = true;
        
        // 开始游戏循环
        this.gameLoop = setInterval(() => {
            this.update();
            this.draw();
        }, this.gameSpeed);
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            clearInterval(this.gameLoop);
            this.updateGameStatus('已暂停', 'status-ready');
            this.pauseBtn.textContent = '继续';
        } else {
            this.gameLoop = setInterval(() => {
                this.update();
                this.draw();
            }, this.gameSpeed);
            this.updateGameStatus('游戏中...', 'status-playing');
            this.pauseBtn.textContent = '暂停';
        }
    }
    
    resetGame() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        this.isPaused = false;
        this.startBtn.textContent = '开始游戏';
        this.startBtn.disabled = false;
        this.pauseBtn.textContent = '暂停';
        this.init();
    }
    
    update() {
        // 更新方向
        this.direction = { ...this.nextDirection };
        
        // 计算新的蛇头位置
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // 检查撞墙
        if (head.x < 0 || head.x >= this.tileCount || 
            head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // 检查撞到自己
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        // 移动蛇
        this.snake.unshift(head);
        
        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            // 增加分数
            this.score += 10;
            this.updateScoreDisplay();
            
            // 生成新食物（确保不在蛇身上）
            this.generateFood();
            
            // 增加速度（但不超过最小速度）
            if (this.gameSpeed > this.minSpeed) {
                this.gameSpeed -= this.speedDecrease;
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(() => {
                    this.update();
                    this.draw();
                }, this.gameSpeed);
            }
        } else {
            // 没吃到食物，移除尾部
            this.snake.pop();
        }
    }
    
    draw() {
        // 清空画布
        this.ctx.fillStyle = '#0f3460';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格
        this.drawGrid();
        
        // 绘制蛇
        this.drawSnake();
        
        // 绘制食物
        this.drawFood();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        // 绘制垂直线
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // 绘制水平线
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    drawSnake() {
        // 绘制蛇身
        for (let i = 0; i < this.snake.length; i++) {
            const segment = this.snake[i];
            
            // 蛇头用不同颜色
            if (i === 0) {
                this.ctx.fillStyle = '#00dbde'; // 头部颜色
                this.ctx.shadowColor = '#00dbde';
                this.ctx.shadowBlur = 10;
            } else {
                // 身体渐变颜色
                const colorValue = Math.max(100, 255 - i * 5);
                this.ctx.fillStyle = `rgb(0, ${colorValue}, ${colorValue})`;
                this.ctx.shadowBlur = 0;
            }
            
            // 绘制圆角矩形
            this.roundRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2,
                5
            );
            
            // 绘制眼睛（只在头部）
            if (i === 0) {
                this.ctx.fillStyle = '#ffffff';
                const eyeSize = 3;
                
                // 根据方向确定眼睛位置
                let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
                
                if (this.direction.x === 1) { // 向右
                    leftEyeX = segment.x * this.gridSize + this.gridSize - 6;
                    leftEyeY = segment.y * this.gridSize + 6;
                    rightEyeX = segment.x * this.gridSize + this.gridSize - 6;
                    rightEyeY = segment.y * this.gridSize + this.gridSize - 6;
                } else if (this.direction.x === -1) { // 向左
                    leftEyeX = segment.x * this.gridSize + 6;
                    leftEyeY = segment.y * this.gridSize + 6;
                    rightEyeX = segment.x * this.gridSize + 6;
                    rightEyeY = segment.y * this.gridSize + this.gridSize - 6;
                } else if (this.direction.y === 1) { // 向下
                    leftEyeX = segment.x * this.gridSize + 6;
                    leftEyeY = segment.y * this.gridSize + this.gridSize - 6;
                    rightEyeX = segment.x * this.gridSize + this.gridSize - 6;
                    rightEyeY = segment.y * this.gridSize + this.gridSize - 6;
                } else { // 向上
                    leftEyeX = segment.x * this.gridSize + 6;
                    leftEyeY = segment.y * this.gridSize + 6;
                    rightEyeX = segment.x * this.gridSize + this.gridSize - 6;
                    rightEyeY = segment.y * this.gridSize + 6;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.beginPath();
                this.ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        this.ctx.shadowBlur = 0;
    }
    
    drawFood() {
        // 绘制食物（红色苹果）
        this.ctx.fillStyle = '#ff3366';
        this.ctx.shadowColor = '#ff3366';
        this.ctx.shadowBlur = 15;
        
        this.roundRect(
            this.food.x * this.gridSize + 3,
            this.food.y * this.gridSize + 3,
            this.gridSize - 6,
            this.gridSize - 6,
            8
        );
        
        // 绘制苹果梗
        this.ctx.fillStyle = '#8b4513';
        this.ctx.fillRect(
            this.food.x * this.gridSize + this.gridSize / 2 - 1,
            this.food.y * this.gridSize + 1,
            2,
            5
        );
        
        this.ctx.shadowBlur = 0;
    }
    
    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    generateFood() {
        let foodOnSnake;
        
        do {
            foodOnSnake = false;
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            
            // 检查食物是否在蛇身上
            for (let segment of this.snake) {
                if (this.food.x === segment.x && this.food.y === segment.y) {
                    foodOnSnake = true;
                    break;
                }
            }
        } while (foodOnSnake);
    }
    
    gameOver() {
        clearInterval(this.gameLoop);
        this.isPlaying = false;
        this.updateGameStatus('游戏结束！', 'status-gameover');
        this.startBtn.textContent = '重新开始';
        this.startBtn.disabled = false;
        
        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateHighScoreDisplay();
            
            // 显示新纪录消息
            this.gameStatusElement.textContent = '新纪录！游戏结束';
        }
    }
    
    updateScoreDisplay() {
        this.scoreElement.textContent = this.score;
    }
    
    updateHighScoreDisplay() {
        this.highScoreElement.textContent = this.highScore;
    }
    
    updateGameStatus(text, className) {
        this.gameStatusElement.textContent = text;
        this.gameStatusElement.className = 'game-status ' + className;
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new SnakeGame();
    
    // 全局访问（用于调试）
    window.snakeGame = game;
    
    console.log('贪吃蛇游戏已加载！');
    console.log('控制方式：方向键或WASD，空格键暂停');
    console.log('游戏已准备好，点击"开始游戏"按钮开始');
});
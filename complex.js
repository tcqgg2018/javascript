<!doctype html>
<html>
    <head>
        <!--meta标签-->
        <meta charset="utf-8"/>
        <meta name="description" content="这是小谭的学习笔记"/>
        <meta name = "author" content="小谭"/>
        <meta name= "keywords" content="小谭,html,学习"/>
        <meta name="viewport" content="width=device-width, initial-scale= 1.0"/>
        <title>小谭的网站</title>
        <style type="text/css">
        /* CSS styles here... */
            body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #e0f7fa; /* 淡蓝色背景 */
    color: #0d47a1; /* 深蓝色字体 */
    font-size: 18px; /* 增大字体大小 */
}

container {
    width: 80%;
    margin: auto;
    overflow: hidden;
}

h1, h2 {
    color: #ff6f00; /* 橙色标题 */
    font-size: 2em; /* 小标题 */
    margin-bottom: 20px;
    margin: 0 auto; /* 居中 */
}

form {
    margin-top: 20px;
    background: #ffffff; /* 白色背景 */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    width: 90%; /* 根据需要调整 */
    margin: 20px auto; /* 居中显示 */
    
}

label {
    display: block;
    margin-bottom: 10px;
    color: #00796b; /* 深绿色字体 */
    font-size: 1.2em; /* 标签字体大小 */
}

input[type="text"], select {
    
    width: 80%; /* 输入框宽度 */
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #26a69a; /* 边框颜色 */
    background-color: #b2dfdb; /* 背景颜色 */
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.1); /* 内外阴影 */
    transition: all 0.3s;
     
    padding: 15px; /* 增大内边距 */
    margin-bottom: 20px;
    
    
    background-color: #b2dfdb; /* 背景颜色 */
    font-size: 1.1em; /* 输入框字体大小 */
}

input[type="text"]:focus, select:focus {
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.3); /* 焦点时的阴影 */
}

button {
    display: block;
    width: 50%; /* 按钮宽度 */
    margin: 0 auto; /* 按钮居中 */
    padding: 10px;
    background-color: #ff6f00; /* 按钮基本颜色 */
    background-image: linear-gradient(#ff6f00, #e65100); /* 渐变背景 */
    color: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px #cc5200; /* 外阴影 */
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.2em; /* 按钮字体大小 */
}

button:active {
    box-shadow: 0 1px #cc5200; /* 点击时的阴影 */
    transform: translateY(3px); /* 点击时向下移动 */
}

button:hover {
    background: #e65100; /* 深橙色 */
}

#complexPlane {
    margin-top: 20px;
    border: 3px solid #26a69a; /* 海蓝色边框 */
}

#result {
    background: #fff3e0; /* 浅橙色背景 */
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    font-size: 1.1em; /* 结果字体大小 */
}
        </style>
    
    </head>
    <body>
    
    <h1>复数运算器</h1>
    
    <!-- 输入区域 -->
    <div>
        <form id="complexForm">
           


<!-- 复数 1 的输入和转换结果显示 -->
<label>复数 1 (代数形式 a+bi 或极坐标形式 r∠θ):</label>
<input type="text" id="complex1" required>
<span id="complex1Conversion"></span>
<br>

<!-- 复数 2 的输入和转换结果显示 -->
<label>复数 2 (代数形式 a+bi 或极坐标形式 r∠θ):</label>
<input type="text" id="complex2" required>
<span id="complex2Conversion"></span>
<br>
            <!-- 操作选择 -->
            <label>选择运算:</label>
            <select id="operation">
                <option value="add">加法</option>
                <option value="subtract">减法</option>
                <option value="multiply">乘法</option>
                <option value="divide">除法</option>
            </select>
            <br>

            <button type="submit">计算</button>
        </form>
    </div>

    <!-- 结果显示区域 -->
    <div id="result">
        <h2>结果</h2>
        <p id="algebraic">代数形式: </p>
        <p id="polar">极坐标形式: </p>
        <p id="exponential">指数形式: </p>
    </div>
    <!-- Canvas 绘图区域 -->
<div>
    <canvas id="complexPlane" width="400" height="400" style="border:1px solid #000;"></canvas>
</div>
   <script>
  


    document.getElementById('complexForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // 获取输入值
        var complex1 = document.getElementById('complex1').value;
        var complex2 = document.getElementById('complex2').value;
        var operation = document.getElementById('operation').value;

        // 解析复数
        var c1 = parseComplex(complex1);
        var c2 = parseComplex(complex2);

        // 执行运算
        var result;
        switch (operation) {
            case 'add':
                result = addComplex(c1, c2);
                break;
            case 'subtract':
                result = subtractComplex(c1, c2);
                break;
            case 'multiply':
                result = multiplyComplex(c1, c2);
                break;
            case 'divide':
                result = divideComplex(c1, c2);
                break;
        }

        // 显示结果
        displayResult(result);
    });

    // 解析复数的函数（从代数形式或极坐标形式）
    function parseComplex(complexStr) {
        // 这里需要添加解析逻辑
    }

    // 复数运算函数（加法、减法、乘法、除法）
    function addComplex(c1, c2) {
        // 这里需要添加加法逻辑
    }

    // 其他运算函数...

    // 显示结果的函数
    function displayResult(result) {
        // 这里需要添加结果显示逻辑
    }// 解析复数的函数
function parseComplex(complexStr) {
    let complex = {};
    if (complexStr.includes('∠')) {
        // 极坐标形式 r∠θ
        let [r, theta] = complexStr.split('∠').map(Number);
        complex = { r: r, theta: theta };
    } else {
        // 代数形式 a+bi
        let [a, b] = complexStr.split('+').map(function(num) {
            return num.includes('i') ? parseFloat(num) || 0 : parseFloat(num) || 0;
        });
        complex = { a: a, b: b };
    }
    return complex;
}

// 复数运算函数
// 加法
function addComplex(c1, c2) {
    return { a: c1.a + c2.a, b: c1.b + c2.b };
}

// 减法
function subtractComplex(c1, c2) {
    return { a: c1.a - c2.a, b: c1.b - c2.b };
}

// 乘法
function multiplyComplex(c1, c2) {
    return {
        a: c1.a * c2.a - c1.b * c2.b,
        b: c1.a * c2.b + c1.b * c2.a
    };
}

// 除法
function divideComplex(c1, c2) {
    let denominator = c2.a * c2.a + c2.b * c2.b;
    return {
        a: (c1.a * c2.a + c1.b * c2.b) / denominator,
        b: (c1.b * c2.a - c1.a * c2.b) / denominator
    };
}

// 显示结果的函数
function displayResult(result) {
    // 转换为代数形式
    let algebraic = `${result.a.toFixed(2)} + ${result.b.toFixed(2)}i`;

    // 转换为极坐标形式
    let r = Math.sqrt(result.a * result.a + result.b * result.b);
    let theta = Math.atan2(result.b, result.a) * (180 / Math.PI);
    let polar = `${r.toFixed(2)} ∠ ${theta.toFixed(2)}°`;

    // 转换为指数形式
    let exponential = `${r.toFixed(2)}e^(i${theta.toFixed(2)}°)`;

    document.getElementById('algebraic').textContent = '代数形式: ' + algebraic;
    document.getElementById('polar').textContent = '极坐标形式: ' + polar;
    document.getElementById('exponential').textContent = '指数形式: ' + exponential;
}

// 输入变化时进行转换并显示结果
document.getElementById('complex1').addEventListener('input', function() {
    displayConversion(this.value, 'complex1Conversion');
});
document.getElementById('complex2').addEventListener('input', function() {
    displayConversion(this.value, 'complex2Conversion');
});

// 显示转换结果的函数
function displayConversion(input, outputElementId) {
    if (input.trim() === '') {
        document.getElementById(outputElementId).textContent = '';
        return;
    }

    let complex = parseComplex(input);
    let conversionText = '';

    if (input.includes('∠')) {
        // 如果输入是极坐标形式，则转换为代数形式
        let a = complex.r * Math.cos(complex.theta * Math.PI / 180);
        let b = complex.r * Math.sin(complex.theta * Math.PI / 180);
        conversionText = a.toFixed(2) + ' + ' + b.toFixed(2) + 'i';
    } else {
        // 如果输入是代数形式，则转换为极坐标形式
        let r = Math.sqrt(complex.a * complex.a + complex.b * complex.b);
        let theta = Math.atan2(complex.b, complex.a) * (180 / Math.PI);
        conversionText = r.toFixed(2) + ' ∠ ' + theta.toFixed(2) + '°';
    }

    document.getElementById(outputElementId).textContent = '转换为: ' + conversionText;
}

// 初始化 canvas
const canvas = document.getElementById('complexPlane');
const ctx = canvas.getContext('2d');
const originX = canvas.width / 2;
const originY = canvas.height / 2;
const scale = 50; // 将缩放因子增加到 50

// 绘制复平面坐标轴
function drawComplexPlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除之前的绘制
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(canvas.width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function plotComplexNumber(complex, label) {
    let x = originX + complex.a * scale;
    let y = originY - complex.b * scale;

    // 绘制复数点
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // 添加标签
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(label, x + 10, y);
}

document.getElementById('complexForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 获取并解析复数输入，执行运算，显示结果...
    // 之前的代码逻辑

    // 绘制复平面和复数点
    drawComplexPlane();
    plotComplexNumber(parseComplex(document.getElementById('complex1').value));
    plotComplexNumber(parseComplex(document.getElementById('complex2').value));
    plotComplexNumber(result);
});

document.getElementById('complex1').addEventListener('input', function() {
    drawComplexPlane();
    plotComplexNumber(parseComplex(this.value));
});
document.getElementById('complex2').addEventListener('input', function() {
    drawComplexPlane();
    plotComplexNumber(parseComplex(this.value));
});
</script>
    </body>
</html> 
    
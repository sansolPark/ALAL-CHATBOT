const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API 엔드포인트
app.post('/api/alan', (req, res) => {
    const { message } = req.body;
    
    // 간단한 응답 로직 (실제로는 AI 모델과 연동)
    const responses = [
        "혼저옵서! 그거 궁금하수과?",
        "아, 그거 말이야...",
        "제주도에서는 그렇게 말하수다.",
        "정말 재미있는 질문이구나!",
        "더 자세히 설명해드릴까?"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    res.json({ reply: randomResponse });
});

// 루트 경로
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT}에서 확인하세요.`);
});

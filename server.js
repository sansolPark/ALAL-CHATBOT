// 환경변수 로드
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini API 설정
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-gemini-api-key-here';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Gemini API를 사용한 챗봇 응답 생성
async function generateResponse(userMessage) {
    try {
        // API 키 상태 확인
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
            console.error('❌ Gemini API 키가 설정되지 않았습니다.');
            throw new Error('API 키가 설정되지 않았습니다.');
        }
        
        console.log('🔑 Gemini API 키 상태:', GEMINI_API_KEY.substring(0, 10) + '...');
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `당신은 제주도 방언을 사용하는 AI 어시스턴트 '소리'입니다. 
        사용자의 질문에 제주도 방언으로 친근하고 자연스럽게 답변해주세요.
        제주도 방언의 특징을 살려서 대화하되, 이해하기 쉽게 해주세요.
        
        사용자 메시지: ${userMessage}
        
        제주도 방언으로 답변해주세요:`;
        
        console.log('📤 Gemini API 요청 전송 중...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log('✅ Gemini API 응답 성공');
        return response.text();
    } catch (error) {
        console.error('❌ Gemini API 오류 상세:', error.message);
        console.error('❌ 에러 스택:', error.stack);
        
        if (error.message.includes('API 키가 설정되지 않았습니다')) {
            return 'API 키가 설정되지 않았습니다. 관리자에게 문의해주세요.';
        } else if (error.message.includes('quota')) {
            return 'API 사용량이 초과되었습니다. 나중에 다시 시도해주세요.';
        } else {
            return '미안, 지금은 대답하기 어렵수다. 나중에 다시 시도해줘서.';
        }
    }
}

// API 엔드포인트
app.post('/api/alan', async (req, res) => {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
        return res.status(400).json({ error: '메시지를 입력해주세요.' });
    }
    
    try {
        const reply = await generateResponse(message);
        res.json({ reply });
    } catch (error) {
        console.error('API 오류:', error);
        res.status(500).json({ 
            error: '서버 오류가 발생했습니다.',
            reply: '미안, 지금은 대답하기 어렵수다. 나중에 다시 시도해줘서.'
        });
    }
});

// API 상태 확인 엔드포인트 (디버깅용)
app.get('/api/status', (req, res) => {
    const apiKeyStatus = GEMINI_API_KEY && GEMINI_API_KEY !== 'your-gemini-api-key-here' ? '설정됨' : '설정되지 않음';
    const apiKeyPreview = GEMINI_API_KEY ? GEMINI_API_KEY.substring(0, 10) + '...' : '없음';
    
    res.json({
        status: '서버 실행 중',
        port: PORT,
        geminiApiKey: apiKeyStatus,
        apiKeyPreview: apiKeyPreview,
        timestamp: new Date().toISOString()
    });
});

// 루트 경로
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT}에서 확인하세요.`);
    
    if (GEMINI_API_KEY === 'your-gemini-api-key-here') {
        console.log('⚠️  경고: Gemini API 키가 설정되지 않았습니다.');
        console.log('환경변수 GEMINI_API_KEY를 설정하거나 .env 파일을 생성해주세요.');
    } else {
        console.log('✅ Gemini API가 설정되었습니다.');
    }
});

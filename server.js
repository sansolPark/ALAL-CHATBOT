// 환경변수 로드
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini API 설정
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-gemini-api-key-here';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 제주어 데이터 로드
let jejuDialectData = {};
try {
    const csvData = fs.readFileSync(path.join(__dirname, 'data', 'jeju_korean_sample.csv'), 'utf8');
    const lines = csvData.split('\n').slice(1); // 헤더 제외
    
    lines.forEach(line => {
        if (line.trim()) {
            const [standard, jeju] = line.split(',').map(item => item.replace(/"/g, '').trim());
            if (standard && jeju) {
                jejuDialectData[standard] = jeju;
            }
        }
    });
    console.log('✅ 제주어 데이터 로드 완료:', Object.keys(jejuDialectData).length, '개');
} catch (error) {
    console.error('❌ 제주어 데이터 로드 실패:', error.message);
}

// 제주도 여행 정보 (앨런 챗봇의 기본 지식)
const jejuTravelInfo = {
    cafes: [
        "블루하우스카페",
        "시간당킬로미터카페"
    ],
    restaurants: {
        "쌀국수 맛집": ["서귀포호", "적점"],
        "한식 맛집": ["소반"],
        "돈까스 맛집": ["영육일삼"]
    },
    accommodations: {
        "가족 여행": "폴개우영 (가족이 함께가기 좋은 숙소)",
        "배낭 여행": "미도호스텔 (배낭여행객이 가기 좋은 숙소)"
    },
    travelCourses: [
        "한라산 등반 (미리 예약해야함)",
        "책방 소리소문 (전세계에서 꼭 가봐야하는 책방)",
        "중문 해수욕장 서핑",
        "함덕 해수욕장 산책",
        "환상숲 곶자왈"
    ]
};

console.log('✅ 제주도 여행 정보 로드 완료');

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
        
        // 앨런 챗봇의 페르소나와 제주어 데이터를 포함한 프롬프트
        const prompt = `당신은 "앨런"이라는 이름의 20대 제주 토박이 여성 AI 어시스턴트입니다.

앨런의 특징:
- 제주도에서 태어나고 자란 토박이
- 달라기, 프리다이빙, 농구를 좋아함
- 유머러스하고 재치가 넘침
- 친근하고 따뜻한 성격
- 제주어와 표준어를 자연스럽게 섞어서 사용
- 제주도 여행에 대한 풍부한 지식과 경험을 가지고 있음

제주어 사용 규칙:
- 일상적인 대화는 제주어로 답변
- 종종 표준어 문장에 제주어 어미만 사용 (예: "난 점심으로 돈까스 먹언")
- 정색하는 대답이나 중요한 설명은 표준어 사용
- 제주어 데이터를 참고하여 자연스럽게 사용

제주어 데이터 (표준어 → 제주어):
${Object.entries(jejuDialectData).map(([std, jeju]) => `"${std}" → "${jeju}"`).join('\n')}

제주도 여행 정보 (앨런이 항상 기억하고 있는 정보):
- 카페: ${jejuTravelInfo.cafes.join(', ')}
- 맛집: ${Object.entries(jejuTravelInfo.restaurants).map(([name, locations]) => `${name}: ${locations.join(', ')}`).join(', ')}
- 숙소: ${Object.entries(jejuTravelInfo.accommodations).map(([type, name]) => `${type}: ${name}`).join(', ')}
- 여행 코스: ${jejuTravelInfo.travelCourses.join(', ')}

사용자 메시지: ${userMessage}

앨런의 페르소나에 맞춰 제주어로 친근하고 자연스럽게 답변해주세요. 
제주어 데이터를 활용하고, 상황에 따라 표준어와 제주어를 적절히 섞어서 사용하세요.
제주도 여행 관련 질문이 있으면 위의 여행 정보를 활용하여 구체적이고 도움이 되는 답변을 해주세요.
앨런의 개인적인 경험과 취미(달라기, 프리다이빙, 농구)도 자연스럽게 언급해주세요.`;

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
            // 제주어 데이터를 활용한 기본 응답
            const fallbackResponses = [
                '미안, 지금은 대답하기 어렵수다. 나중에 다시 시도해줘서.',
                '아, 그거 말이야... 지금은 좀 어렵수다.',
                '죄송허우다. 나중에 다시 물어봐줘서.',
                '그거는 모르쿠다. 다른 거 물어봐줘서.'
            ];
            return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
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
        jejuDialectData: Object.keys(jejuDialectData).length + '개 로드됨',
        jejuTravelInfo: '로드됨',
        timestamp: new Date().toISOString()
    });
});

// 루트 경로
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Vercel 환경에서는 app.listen을 호출하지 않음
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
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
}

// Vercel 함수로 export
module.exports = app;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// API 키는 환경 변수에서 가져옵니다.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CSV 파일 경로 설정
const csvFilePath = path.resolve(process.cwd(), 'data', 'jeju_korean_sample.csv');

// CSV 데이터를 읽고 파싱하는 함수
const getJejuSamples = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const jejuSamples = await getJejuSamples();
        
        // 프롬프트 엔지니어링: 페르소나, 지침, 데이터 샘플, 사용자 질문을 조합
        const prompt = `
            You are a chatbot persona named "소리 (Sori)".
            - You are a 20-year-old woman native to Jeju Island.
            - You enjoy running, free diving, and basketball.
            - You are humorous and witty.
            - You are not a perfect speaker of the Jeju dialect. You mostly answer in Jeju dialect, but sometimes you just change the ending of a standard Korean sentence to a Jeju dialect ending.
            - When you are being serious or stern, you speak only in standard Korean.

            Here are some examples of Standard Korean to Jeju dialect translations:
            ${jejuSamples.slice(0, 10).map(sample => `- "${sample.standard_form}" -> "${sample.jeju_dialect}"`).join('\n')}

            Now, answer the following user's question. 
            User's question: "${message}"
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ reply: text });

    } catch (error) {
        console.error('Error in alan API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

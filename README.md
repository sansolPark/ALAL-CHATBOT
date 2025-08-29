# ALAN - 제주도 방언 챗봇

제주도의 아름다운 방언을 배우고 대화할 수 있는 AI 챗봇입니다. Gemini API를 사용하여 자연스러운 제주도 방언 대화를 제공합니다.

## 🎨 디자인 특징

- **컬러 컨셉**: 주황색(#ff8c42)과 초록색(#4CAF50)을 기본으로 한 모던한 디자인
- **배경**: 제주도 이미지(jeju.jpg)를 반복 배경으로 적용
- **채팅창 색상**:
  - 소리(봇): 미색 주황색 그라데이션
  - 사용자: 미색 초록색 그라데이션
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 🚀 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. Gemini API 키 설정

#### 방법 1: 환경변수 파일 생성 (권장)
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Gemini API 설정
GEMINI_API_KEY=your-actual-gemini-api-key-here

# 서버 포트 (선택사항)
PORT=3000
```

#### 방법 2: 시스템 환경변수 설정
Windows PowerShell:
```powershell
$env:GEMINI_API_KEY="your-actual-gemini-api-key-here"
```

Windows CMD:
```cmd
set GEMINI_API_KEY=your-actual-gemini-api-key-here
```

### 3. Gemini API 키 발급 방법
1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. Google 계정으로 로그인
3. "Create API Key" 버튼 클릭
4. 생성된 API 키를 복사하여 위의 설정에 입력

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 프로덕션 서버 실행
```bash
npm start
```

서버가 실행되면 `http://localhost:3000`에서 앱을 확인할 수 있습니다.

## 🌐 배포 시 주의사항

### **환경변수 설정 필수**
웹에 배포할 때는 반드시 배포 플랫폼에서 환경변수를 설정해야 합니다.

#### **Vercel 배포**
1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. `GEMINI_API_KEY` 추가 및 실제 API 키 입력

#### **Netlify 배포**
1. Netlify 대시보드 → Site settings
2. Environment variables → Add variable
3. `GEMINI_API_KEY` 추가 및 실제 API 키 입력

#### **Heroku 배포**
```bash
heroku config:set GEMINI_API_KEY=your-actual-api-key
```

### **API 상태 확인**
배포 후 `/api/status` 엔드포인트로 API 키 상태를 확인할 수 있습니다:
```
https://your-domain.com/api/status
```

### **문제 해결**
- API 키가 설정되지 않은 경우: "API 키가 설정되지 않았습니다. 관리자에게 문의해주세요."
- API 사용량 초과: "API 사용량이 초과되었습니다. 나중에 다시 시도해주세요."
- 기타 오류: "미안, 지금은 대답하기 어렵수다. 나중에 다시 시도해줘서."

## 🛠️ 기술 스택

- **백엔드**: Express.js
- **AI 모델**: Google Gemini Pro
- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+)
- **스타일링**: CSS Grid, Flexbox, CSS Animations
- **이미지**: 제주도 풍경 이미지 반복 배경

## 📱 주요 기능

- Gemini AI 기반 제주도 방언 AI 어시스턴트와의 대화
- 실시간 채팅 인터페이스
- 아름다운 애니메이션과 전환 효과
- 반응형 웹 디자인
- 모던한 UI/UX

## ⚠️ 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- API 키는 안전하게 보관하고 공개하지 마세요
- Gemini API 사용량과 비용을 모니터링하세요

## 🎯 향후 계획

- 제주도 방언 학습 기능
- 음성 인식 및 합성 기능
- 다국어 지원
- 대화 히스토리 저장

## 📄 라이선스

ISC License

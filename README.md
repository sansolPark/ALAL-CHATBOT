# 앨런 - 제주도 토박이 AI 어시스턴트

제주도의 아름다운 방언을 배우고 대화할 수 있는 AI 챗봇입니다. Gemini API를 사용하여 자연스러운 제주도 방언 대화를 제공합니다.

## 🤖 앨런 챗봇 소개

**앨런**은 20대 제주 토박이 여성 AI 어시스턴트입니다.

### **앨런의 특징**
- 🏝️ 제주도에서 태어나고 자란 토박이
- 🏊‍♀️ 달라기, 프리다이빙, 농구를 좋아함
- 😄 유머러스하고 재치가 넘침
- 💝 친근하고 따뜻한 성격
- 🗣️ 제주어와 표준어를 자연스럽게 섞어서 사용

### **제주어 사용 스타일**
- 일상적인 대화는 제주어로 답변
- 종종 표준어 문장에 제주어 어미만 사용 (예: "난 점심으로 돈까스 먹언")
- 정색하는 대답이나 중요한 설명은 표준어 사용
- `jeju_korean_sample.csv` 데이터를 활용한 자연스러운 제주어

### **제주도 여행 정보 전문가**
앨런은 제주도 여행에 대한 풍부한 지식을 가지고 있습니다:

#### **🍽️ 맛집 추천**
- 쌀국수 맛집: 서귀포호, 적점
- 한식 맛집: 소반
- 돈까스 맛집: 영육일삼

#### **☕ 카페 추천**
- 블루하우스카페
- 시간당킬로미터카페

#### **🏨 숙소 추천**
- 가족 여행: 폴개우영 (가족이 함께가기 좋은 숙소)
- 배낭 여행: 미도호스텔 (배낭여행객이 가기 좋은 숙소)

#### **🗺️ 여행 코스 추천**
- 한라산 등반 (미리 예약해야함)
- 책방 소리소문 (전세계에서 꼭 가봐야하는 책방)
- 중문 해수욕장 서핑
- 함덕 해수욕장 산책
- 환상숲 곶자왈

## 🎨 디자인 특징

- **컬러 컨셉**: 주황색(#ff8c42)과 초록색(#4CAF50)을 기본으로 한 모던한 디자인
- **배경**: 제주도 이미지(jeju.jpg)를 반복 배경으로 적용
- **채팅창 색상**:
  - 앨런(봇): 미색 주황색 그라데이션
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
- 기타 오류: 제주어 데이터를 활용한 기본 응답

## 🛠️ 기술 스택

- **백엔드**: Express.js
- **AI 모델**: Google Gemini Pro
- **제주어 데이터**: CSV 기반 방언 데이터베이스
- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+)
- **스타일링**: CSS Grid, Flexbox, CSS Animations
- **이미지**: 제주도 풍경 이미지 반복 배경

## 📱 주요 기능

- Gemini AI 기반 제주도 토박이 '앨런'과의 자연스러운 대화
- `jeju_korean_sample.csv` 데이터를 활용한 정확한 제주어
- **제주도 여행 정보 전문 상담** (맛집, 카페, 숙소, 여행 코스 추천)
- 실시간 채팅 인터페이스
- 아름다운 애니메이션과 전환 효과
- 반응형 웹 디자인
- 모던한 UI/UX

## ⚠️ 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- API 키는 안전하게 보관하고 공개하지 마세요
- Gemini API 사용량과 비용을 모니터링하세요

## 🎯 향후 계획

- 제주어 학습 기능 강화
- 음성 인식 및 합성 기능
- 다국어 지원
- 대화 히스토리 저장
- 앨런의 취미 관련 특별 대화 기능

## �� 라이선스

ISC License


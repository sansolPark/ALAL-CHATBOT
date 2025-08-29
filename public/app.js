document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    const addMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        if (sender === 'bot') {
            // 봇 메시지인 경우 아이콘과 함께 표시
            const messageWrapper = document.createElement('div');
            messageWrapper.classList.add('bot-message-wrapper');
            
            const iconContainer = document.createElement('div');
            iconContainer.classList.add('message-icon');
            
            const icon = document.createElement('img');
            icon.src = 'images/chaticon.png';
            icon.alt = '소리 아이콘';
            icon.classList.add('bot-icon');
            
            const textContainer = document.createElement('div');
            textContainer.classList.add('message-text');
            textContainer.textContent = text;
            
            iconContainer.appendChild(icon);
            messageWrapper.appendChild(iconContainer);
            messageWrapper.appendChild(textContainer);
            messageElement.appendChild(messageWrapper);
        } else {
            // 사용자 메시지는 기존과 동일
            messageElement.textContent = text;
        }
        
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        // 메시지 추가 후 부드러운 스크롤
        setTimeout(() => {
            chatBox.scrollTo({
                top: chatBox.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    };

    const sendMessage = async () => {
        const messageText = userInput.value.trim();
        if (messageText === '') return;

        addMessage(messageText, 'user');
        userInput.value = '';

        // 입력 필드에 포커스 유지
        userInput.focus();

        try {
            const response = await fetch('/api/alan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageText }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // 봇 응답을 약간의 지연 후 표시 (자연스러운 느낌)
            setTimeout(() => {
                addMessage(data.reply, 'bot');
            }, 500);

        } catch (error) {
            console.error('Error:', error);
            setTimeout(() => {
                addMessage('미안, 지금은 대답하기 어렵수다. 나중에 다시 시도해줘서.', 'bot');
            }, 500);
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 초기 환영 메시지
    setTimeout(() => {
        addMessage('혼저옵서! 나 소리우다. 무사 궁금한 거 있수과?', 'bot');
    }, 300);
});

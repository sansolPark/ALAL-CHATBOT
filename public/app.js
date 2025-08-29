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
    };

    const sendMessage = async () => {
        const messageText = userInput.value.trim();
        if (messageText === '') return;

        addMessage(messageText, 'user');
        userInput.value = '';

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
            addMessage(data.reply, 'bot');

        } catch (error) {
            console.error('Error:', error);
            addMessage('미안, 지금은 대답하기 어렵수다. 나중에 다시 시도해줍서.', 'bot');
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    addMessage('혼저옵서! 나 소리우다. 무사 궁금한 거 있수과?', 'bot');
});

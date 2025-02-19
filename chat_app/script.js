$(document).ready(function () {
    let chatData = [];

    // Load chat data from JSON
    $.getJSON("chat-data.json", function (data) {
        chatData = data.chats;
        displayChatSessions(chatData);
    });

    // Display chat sessions in sidebar
    function displayChatSessions(chats) {
        let chatList = $("#chatSessions");
        chatList.empty();
        chats.forEach(chat => {
            chatList.append(`
                <div class="chat-session" onclick="openChat(${chat.id})">
                    <img src="${chat.profile}" alt="${chat.name}">
                    <div>
                        <h6>${chat.name}</h6>
                        <p>${chat.messages[0]?.text}</p>
                    </div>
                </div>
            `);
        });
    }

    // Open selected chat
    window.openChat = function (chatId) {
        let chat = chatData.find(c => c.id === chatId);
        if (!chat) return;
        $("#chatName").html(`
            <img src="${chat.profile}" alt="${chat.name}" class="chat-profile">
            ${chat.name}
        `);
        // $("#chatName").text(chat.name);
        $("#chatMessages").empty();
        chat.messages.forEach(msg => {
            $("#chatMessages").append(`
                <p class="chat-message ${msg.from === 'You' ? 'right' : 'left'}">${msg.text}</p>
            `);
        });
    };

    // Send message
    window.sendMessage = function () {
        let input = $("#messageInput");
        let messageText = input.val().trim();
        if (!messageText) return;

        $("#chatMessages").append(`<p class="chat-message right">${messageText}</p>`);
        input.val("");
    };

    // Send message on Enter key
    $("#messageInput").keypress(function (e) {
        if (e.which === 13) sendMessage();
    });
});

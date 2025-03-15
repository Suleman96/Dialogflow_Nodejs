// ✅ Toggle chatbot visibility
function toggleChatbot() {
  const chatbot = document.getElementById("chatbot");
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
}

// ✅ Close chatbot completely
function closeChatbot() {
  document.getElementById("chatbot").style.display = "none";
}

// ✅ Minimize and restore chatbot
function minimizeChatbot() {
  const chatbox = document.getElementById("chatbox");
  const chatInput = document.querySelector(".chat-input");
  const minimizeBtn = document.querySelector(".minimize-btn");

  if (chatbox.style.display === "none") {
    chatbox.style.display = "flex";
    chatInput.style.display = "flex";
    minimizeBtn.textContent = "–";
  } else {
    chatbox.style.display = "none";
    chatInput.style.display = "none";
    minimizeBtn.textContent = "+";
  }
}

// ✅ Send Message Functionality
async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (!message) return;

  addMessageToChatbox(message, "user-message");
  input.value = "";

  try {
    const response = await fetch("http://localhost:3000/dialogflow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (response.ok && data.reply) {
      addMessageToChatbox(data.reply, "bot-message");

      if (data.richContent) {
        data.richContent.forEach((itemArray) => {
          itemArray.forEach(renderRichContent);
        });
      }
    } else {
      addMessageToChatbox("❌ An error occurred.", "bot-message");
    }
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    addMessageToChatbox("❌ Sorry, something went wrong.", "bot-message");
  }
}

// ✅ Corrected: Add message function
function addMessageToChatbox(text, className) {
  const chatbox = document.getElementById("chatbox");
  
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = text; // dynamically sets size to match text

  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// ✅ Render Rich Content
function renderRichContent(richItem) {
  const chatbox = document.getElementById("chatbox");
  const richDiv = document.createElement("div");
  richDiv.className = "rich-message";

  switch (richItem.type) {
    case "info":
      richDiv.innerHTML = `
        <strong>${richItem.title}</strong>
        <p>${richItem.subtitle}</p>
        ${richItem.image?.src?.rawUrl ? `<img src="${richItem.image.src.rawUrl}" class="rich-image">` : ""}
      `;
      break;

    case "button":
      const button = document.createElement("a");
      button.href = richItem.link;
      button.textContent = richItem.text;
      button.className = "rich-button";
      button.target = "_blank";
      richDiv.appendChild(button);
      break;

    case "chips":
      const chipsContainer = document.createElement("div");
      chipsContainer.className = "chips-container";
      
      richItem.options.forEach((option) => {
        const chip = document.createElement("button");
        chip.className = "chip";
        chip.textContent = option.text;
        chip.onclick = () => addMessageToChatbox(option.text, "user-message");
        chipsContainer.appendChild(chip);
      });

      richDiv.appendChild(chipsContainer);
      break;

    case "image":
      const image = document.createElement("img");
      image.src = richItem.src;
      image.className = "rich-image";
      richDiv.appendChild(image);
      break;
  }

  chatbox.appendChild(richDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// ✅ Event Listeners Setup
document.querySelector(".chatbot-icon").onclick = toggleChatbot;
document.getElementById("send-btn").onclick = sendMessage;
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
document.querySelector(".close-btn").onclick = closeChatbot;
document.querySelector(".minimize-btn").onclick = minimizeChatbot;

// ✅ Scroll observer for chatbox (auto-scroll on new message)
const observer = new MutationObserver(() => {
  const chatbox = document.getElementById("chatbox");
  chatbox.scrollTop = chatbox.scrollHeight;
});
observer.observe(document.getElementById("chatbox"), { childList: true });

// ✅ Ensure chatbot container is hidden initially
window.onload = () => {
  document.getElementById("chatbot").style.display = "none";
};

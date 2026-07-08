const API_KEY = "AQ.Ab8RN6LaWHRTcXU1MWIN6wI1sYsFoaWBkqiVVVLx0Y8KBUJ6AQ";

const messages = [];

const input = document.getElementById("userInput");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const message = input.value.trim();

  if (message === "") return;

  const chatBox = document.getElementById("chat-box");

  chatBox.innerHTML += `<div class="user">${message}</div>`;

  messages.push({
    role: "user",
    parts: [{ text: message }],
  });

  input.value = "";

  chatBox.innerHTML += `<div class="bot" id="typing">Typing...</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "Always answer using the latest information. Use Google Search whenever needed.",
              },
            ],
          },
          contents: messages,
          tools: [
            {
              google_search: {},
            },
          ],
        }),
      },
    );

    const data = await response.json();

    document.getElementById("typing").remove();

    if (!response.ok) {
      chatBox.innerHTML += `<div class="bot">${data.error.message}</div>`;
      return;
    }

    const reply = data.candidates[0].content.parts[0].text;

    messages.push({
      role: "model",
      parts: [{ text: reply }],
    });

    chatBox.innerHTML += `<div class="bot">${reply}</div>`;

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();

    chatBox.innerHTML += `<div class="bot">Error: ${error.message}</div>`;
  }
}

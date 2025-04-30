const cat = document.getElementById('cat');
const form = document.getElementById('form');
const API_KEY = "AIzaSyCJ94YdgbTNnkmf0QgItK7oKYz1d_1iagU"; // Replace this with your real key

async function askGemini(promptText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: promptText
                        }
                    ]
                }
            ]
        })
    });

    const data = await response.json();

    console.log("Gemini API response:", data); // helpful to debug

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response 😢";
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const value = input.value.trim();
    if (!value) return;

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('bg-cyan-500', 'text-white', 'p-2', 'rounded-xl', 'my-2', 'w-fit', 'max-w-[80%]', 'self-end', 'ml-auto');
    userMessage.innerText = value;
    cat.appendChild(userMessage);
    input.value = '';

    // Show bot placeholder
    const botMessage = document.createElement('div');
    botMessage.classList.add('bg-red-300', 'text-black', 'p-2', 'rounded-xl', 'my-2', 'w-fit', 'max-w-[80%]', 'self-start');
    botMessage.innerText = "Chef Gemini is stirring something up... 🍳✨";
    cat.appendChild(botMessage);

    // Get Gemini's reply
    const geminiReply = await askGemini(`answer this question: ${value}`);
    console.log("Gemini reply:", geminiReply); // helpful to debug
    botMessage.innerText = geminiReply;
};

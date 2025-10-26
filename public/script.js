/* 🔥 Floating sparks */
const sparks = ["⚡", "🔥", "✨", "💥"];
for (let i = 0; i < 10; i++) {
  const spark = document.createElement("div");
  spark.className = "spark";
  spark.textContent = sparks[Math.floor(Math.random() * sparks.length)];
  spark.style.left = Math.random() * 100 + "vw";
  spark.style.animationDelay = Math.random() * 5 + "s";
  spark.style.fontSize = Math.random() * 15 + 15 + "px";
  document.body.appendChild(spark);
}

/* 💬 Message Sending Script */
const button = document.getElementById("sendButton");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name) { alert("Please enter your name!"); return; }
  if (!message) { alert("Please enter a message!"); return; }

  status.textContent = "Sending your message...";
  status.style.color = "#ffeb3b";

  try {
    const res = await fetch("/send-email", { // works online or locally
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    const data = await res.json();
    if (data.success) {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "#00e676";
    } else {
      status.textContent = `❌ Failed: ${data.error}`;
      status.style.color = "#ff5252";
    }

    nameInput.value = "";
    messageInput.value = "";
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Error sending message. Try again later.";
    status.style.color = "#ff5252";
  }
});

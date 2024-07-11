const WebSocket = require("ws");
const sqlite3 = require("sqlite3").verbose();

// SQLiteデータベースのセットアップ
const db = new sqlite3.Database("chat_history.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS chat_history (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT, content TEXT)"
  );
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  // 新しい接続に対して履歴を送信
  db.all("SELECT * FROM chat_history ORDER BY id ASC", [], (err, rows) => {
    if (err) {
      console.error("Error fetching chat history:", err);
      return;
    }
    ws.send(JSON.stringify({ type: "history", data: rows }));
  });

  ws.on("message", (message) => {
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error("Error parsing message:", error);
      return;
    }

    // メッセージをデータベースに保存
    db.run(
      "INSERT INTO chat_history (sender, content) VALUES (?, ?)",
      [parsedMessage.sender, parsedMessage.content],
      function (err) {
        if (err) {
          console.error("Error inserting message into database:", err);
          return;
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);

        // 全てのクライアントにメッセージを送信
        const broadcastMessage = JSON.stringify({
          type: "message",
          data: { ...parsedMessage, id: this.lastID }
        });

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastMessage);
          }
        });
      }
    );
  });

  ws.send(JSON.stringify({ type: "info", data: "Welcome to the chat" }));
});

console.log("WebSocket server is running on ws://localhost:8080");

// クリーンアップ処理
process.on("SIGINT", () => {
  wss.close(() => {
    console.log("WebSocket server closed");
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err);
      } else {
        console.log("Database connection closed");
      }
      process.exit(0);
    });
  });
});
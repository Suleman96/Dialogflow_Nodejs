const express = require('express');
const cors = require('cors');
const dialogflow = require('@google-cloud/dialogflow').v2beta1;
const uuid = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const projectId = 'diplopal-ydko';
const knowledgeBaseId = 'MTE5NzU4NzI2NzgyNzY4OTA2MjU';

//  Initialize Dialogflow Client
let sessionClient;
try {
  sessionClient = new dialogflow.SessionsClient({
    keyFilename: './diplopal-ydko-2e11661250b0.json'
  });
  console.log(" Dialogflow sessionClient initialized successfully");
} catch (err) {
  console.error("❌ Error initializing Dialogflow sessionClient:", err);
  process.exit(1);
}

app.post('/dialogflow', async (req, res) => {
  try {
    const userMessage = req.body.message?.trim();
    if (!userMessage) {
      return res.status(400).json({ reply: " Error: No message received." });
    }

    const sessionId = uuid.v4();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    const knowledgeBasePath = `projects/${projectId}/knowledgeBases/${knowledgeBaseId}`;

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userMessage,
          languageCode: 'en-US',
        },
      },
      queryParams: {
        knowledgeBaseNames: [knowledgeBasePath],
        knowledgeBaseQueryMode: "KNOWLEDGE_BASE_QUERY_MODE_RETRIEVE",
        disableWebhook: false
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0]?.queryResult;

    if (!result) {
      return res.json({ reply: null, richContent: [] });
    }

    console.log("🚀 Full Dialogflow Response:", JSON.stringify(result, null, 2));

    let replyText = result.fulfillmentText?.trim() || null;
    let richResponses = [];

    //  Check if Knowledge Base Answer Exists
    if (result.knowledgeAnswers?.answers?.length > 0) {
      replyText = result.knowledgeAnswers.answers[0].answer.trim();
    }

    // Extract Rich Responses (buttons, cards, images)
    if (result.fulfillmentMessages?.length > 0) {
      richResponses = result.fulfillmentMessages
        .filter(msg => msg.payload && msg.payload.fields)
        .map(msg => msg.payload.fields.richContent);
    }

    //  Prevent empty responses
    if (!replyText && richResponses.length === 0) {
      return res.json({ reply: null, richContent: [] });
    }

    console.log("🔹 FINAL RESPONSE SENT:", { reply: replyText, richContent: richResponses });

    return res.json({ reply: replyText, richContent: richResponses });

  } catch (error) {
    console.error("Dialogflow API Error:", error);
    return res.json({ reply: null, richContent: [] });
  }
});

app.listen(3000, () => {
  console.log("Backend server running on port 3000");
});


function minimizeChat() {
  const chatWindow = document.querySelector('df-messenger');
  chatWindow.style.display = 'none'; // Adjust this to minimize the chat as needed
}

function closeChat() {
  const chatWindow = document.querySelector('df-messenger');
  chatWindow.style.display = 'none';
}

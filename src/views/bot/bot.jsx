import React, { useEffect } from 'react';

const WatsonAssistantChat = () => {
  useEffect(() => {
    // Define Watson Assistant chat options
    window.watsonAssistantChatOptions = {
      integrationID: "85d6951f-0931-4370-857a-dd0e79f0962b",
      region: "us-south",
      serviceInstanceID: "43df2937-d463-4161-8247-e350d03a7938",
      onLoad: async (instance) => { await instance.render(); }
    };

    // Load Watson Assistant ChatEntry script after a delay
    const timeoutId = setTimeout(() => {
      const script = document.createElement('script');
      script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${window.watsonAssistantChatOptions.clientVersion || 'latest'}/WatsonAssistantChatEntry.js`;
      document.head.appendChild(script);
    });

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);

  }, []); // The empty dependency array ensures that the effect runs only once on component mount

  return (
    <div id="watson-assistant-chat-container" />
  );
};

export default WatsonAssistantChat;
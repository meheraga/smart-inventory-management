import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");

  // Predefined responses
  const getBotResponse = (message: string) => {
    if (message.toLowerCase().includes("hello")) {
      return "Hi there! How can I help you today?";
    } else if (message.toLowerCase().includes("help")) {
      return "Sure, I'm here to help. What do you need assistance with?";
    } else if (message.toLowerCase().includes("bye")) {
      return "Goodbye! Have a great day!";
    } else if(message.toLowerCase().includes("check stock")){
      return "I'm not sure how to respond to that. Can you please clarify?";
    }else if (message.toLowerCase().includes("out of stock")) {
        return "Some items are currently out of stock. Would you like to place a backorder or find alternatives?";
      } else if (message.toLowerCase().includes("stock levels")) {
        return "You can check stock levels by asking for a specific product or SKU.";
      } else if (message.toLowerCase().includes("reorder items")) {
        return "I can help with reordering. Which items do you need to reorder?";
      } else if (message.toLowerCase().includes("low stock")) {
        return "Here’s a list of items that are low in stock. Would you like to reorder?";
      } else if (message.toLowerCase().includes("shipment status")) {
        return "Can you provide the shipment tracking number or order ID to check the shipment status?";
      }
    return "I'm not sure how to respond to that. Can you please clarify?";
  };

  // Send message and get bot's response
  const sendMessage = () => {
    if (inputValue.trim()) {
      // Add user's message to the chat
      setMessages([...messages, { text: inputValue, isUser: true }]);

      // Add bot's response after a short delay
      setTimeout(() => {
        const botResponse = getBotResponse(inputValue);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, isUser: false },
        ]);
      }, 1000); // Simulate response delay
      setInputValue("");
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-16 right-5 w-80 bg-white shadow-lg border rounded-lg p-4">
      <div className="h-60 overflow-y-auto mb-2">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded ${
                message.isUser
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              {message.text}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Start chatting...</p>
        )}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

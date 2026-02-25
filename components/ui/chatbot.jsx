"use client";
import { useState } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your IoT assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputMessage, sender: "user" }]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(inputMessage.toLowerCase());
        setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: "bot" }]);
      }, 1000);
      
      setInputMessage("");
    }
  };

  const getBotResponse = (message) => {
    if (message.includes("sensor") || message.includes("simulate")) {
      return "You can simulate various sensors like temperature, humidity, and pressure. Go to the /simulate page to configure your sensors and start generating data.";
    } else if (message.includes("export") || message.includes("download")) {
      return "To export your data, visit the /export page where you can download data in CSV, JSON, or Excel formats.";
    } else if (message.includes("project") || message.includes("settings")) {
      return "Manage your project settings by clicking on the settings icon in your project dashboard. You can configure sensors, alerts, and export schedules.";
    } else if (message.includes("start") || message.includes("begin")) {
      return "To get started, sign up for an account, create a new project, and add your first sensor. You can then simulate data and visualize it in real-time.";
    } else {
      return "I'm here to help! You can ask me about sensor simulation, data export, project settings, or how to get started with the platform.";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-96 bg-white border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">IoT Assistant</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 h-64">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;

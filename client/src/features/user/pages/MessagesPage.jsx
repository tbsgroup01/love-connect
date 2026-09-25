import React, { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import { Phone, Video, Paperclip, Smile, Send, Search, CheckCheck } from "lucide-react"

import priyaImg from "../../../assets/priya_profile.jpg"
import meeraImg from "../../../assets/signup_hero_woman.jpg"
import rheaImg from "../../../assets/hero_woman_exact.png"
import snehaImg from "../../../assets/hero_woman.jpg"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(1)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "them", text: "Hey Ananya! Loved your travel photos from Goa ✈️", time: "10:14 AM" },
    { id: 2, sender: "me", text: "Thanks Priya! Goa is my absolute favorite place. Do you travel often?", time: "10:16 AM" },
    { id: 3, sender: "them", text: "Yes! Planning a trip next month. Would love to get coffee this weekend to chat more? ☕", time: "10:18 AM" },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const conversations = [
    { id: 1, name: "Priya", age: 25, lastMsg: "Would love to get coffee this weekend... ☕", time: "10:18 AM", unread: 0, online: true, img: priyaImg },
    { id: 2, name: "Meera", age: 23, lastMsg: "That architecture design was stunning!", time: "Yesterday", unread: 2, online: true, img: meeraImg },
    { id: 3, name: "Rhea", age: 24, lastMsg: "Haha totally agree! See you soon.", time: "2 days ago", unread: 0, online: false, img: rheaImg },
    { id: 4, name: "Sneha", age: 24, lastMsg: "Are you free this Friday evening?", time: "3 days ago", unread: 1, online: false, img: snehaImg },
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text: inputMessage, time: "Just now" },
    ])
    setInputMessage("")
  }

  const currentChatPartner = conversations.find((c) => c.id === activeChat) || conversations[0]

  return (
    <DashboardLayout activeTab="messages">
      <div className="w-full bg-[#FFFFFF] rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row h-[680px] animate-fadeIn">

        {/* LEFT CONVERSATION LIST SIDEBAR */}
        <div className="w-full md:w-80 border-r border-slate-200/80 flex flex-col shrink-0 bg-white">
          {/* Header & Search */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <h2 className="text-lg font-black text-[#17151A]">Messages</h2>
            <div className="flex items-center gap-2 bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200/60">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="bg-transparent border-none outline-none text-xs text-[#17151A] w-full placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-none">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                  activeChat === chat.id ? "bg-[#FFE7F0]/40 border-l-4 border-[#FF2D72]" : "hover:bg-slate-50"
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-2xs">
                  <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
                  {chat.online && (
                    <span className="w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white absolute bottom-0 right-0" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-[#17151A] truncate">{chat.name}, {chat.age}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate font-medium mt-0.5">{chat.lastMsg}</p>
                </div>

                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#FF2D72] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT WINDOW */}
        <div className="flex-1 flex flex-col h-full bg-slate-50/50">

          {/* Chat Partner Header */}
          <div className="px-5 py-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                <img src={currentChatPartner.img} alt={currentChatPartner.name} className="w-full h-full object-cover" />
                {currentChatPartner.online && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] border border-white absolute bottom-0 right-0" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm text-[#17151A]">{currentChatPartner.name}, {currentChatPartner.age}</h3>
                  <span className="text-[10px] font-bold bg-[#FFE7F0] text-[#FF2D72] px-2 py-0.5 rounded-full">Matched</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {currentChatPartner.online ? "Online Now" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Calling ${currentChatPartner.name}...`)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#FFE7F0] hover:text-[#FF2D72] text-slate-600 transition-colors cursor-pointer"
                title="Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => alert(`Starting Video Call with ${currentChatPartner.name}...`)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#FFE7F0] hover:text-[#FF2D72] text-slate-600 transition-colors cursor-pointer"
                title="Video Call"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            <div className="text-center my-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
                Matched Recently • 10:14 AM
              </span>
            </div>

            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-2xs ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] rounded-br-none"
                      : "bg-[#FFFFFF] text-[#17151A] border border-slate-200/80 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 font-medium mt-1 px-1 flex items-center gap-1">
                  <span>{msg.time}</span>
                  {msg.sender === "me" && <CheckCheck className="w-3 h-3 text-[#FF2D72]" />}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 shrink-0">Quick React:</span>
            {["☕ Coffee date?", "✨ Loved your photos!", "😍 You look amazing", "🍕 Foodie hangout?"].map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputMessage(pill)}
                className="px-3 py-1 rounded-full bg-[#FFE7F0] hover:bg-[#FF2D72] hover:text-[#FFFFFF] text-[#FF2D72] text-[11px] font-bold transition-colors shrink-0 cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => alert("Attach photo/media")}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Send a romantic message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-[#17151A] bg-slate-50 focus:bg-[#FFFFFF] focus:border-[#FF2D72] outline-none transition-all font-medium"
            />

            <button
              type="button"
              onClick={() => setInputMessage((prev) => prev + " ❤️")}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#FFE7F0] text-slate-500 hover:text-[#FF2D72] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              title="Add Heart"
            >
              <Smile className="w-4 h-4" />
            </button>

            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shrink-0 hover:brightness-105 shadow-xs cursor-pointer transition-transform hover:scale-105 active:scale-95"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </DashboardLayout>
  )
}

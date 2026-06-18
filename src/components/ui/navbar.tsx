"use client";

import React from "react";
import { AttLogo } from "../icons/attlogo";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useQueryState, parseAsBoolean } from "nuqs";

export default function Navbar() {
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <div
            className="group relative flex items-center"
            style={{ width: 36, height: 18 }}
          >
            <div
              className={`absolute inset-0 transition-opacity duration-150 ${
                chatHistoryOpen ? "opacity-0 pointer-events-none" : "opacity-100 group-hover:opacity-0"
              }`}
            >
              <AttLogo width={54} height={27} />
            </div>

            <button
              aria-label={chatHistoryOpen ? "Close chat history" : "Open chat history"}
              onClick={() => setChatHistoryOpen((p) => !p)}
              className={`absolute inset-0 ml-0 flex items-center justify-center rounded p-1 hover:bg-gray-100 transition-opacity duration-150 ${
                chatHistoryOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {chatHistoryOpen ? (
                <PanelLeftClose className="size-6" />
              ) : (
                <PanelLeftOpen className="size-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

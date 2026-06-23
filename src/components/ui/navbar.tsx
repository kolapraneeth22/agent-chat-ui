"use client";

import React from "react";
import { AttLogo } from "../icons/attlogo";
import { Avatar, AvatarFallback } from "./avatar";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useQueryState, parseAsBoolean } from "nuqs";

export default function Navbar() {
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );

  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-r from-[#0057B8] to-[#00A6CA] shadow-sm">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        
        {/* Left Side Container: Dynamic layout based on sidebar state */}
        <div className="flex items-center">
          {chatHistoryOpen ? (
            /* When History is open: Matches your exact history panel structure */
            <div className="flex w-[248px] items-center justify-between">
              <h1 className="text-xl font-bold tracking-tight text-white select-none">
                History
              </h1>
              <button
                aria-label="Close chat history"
                onClick={() => setChatHistoryOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white bg-white/10 hover:bg-white/20 transition-all border border-white/10"
              >
                <PanelLeftClose className="size-5" />
              </button>
            </div>
          ) : (
            /* When History is closed: The icon button exactly sits directly over the logo size container */
            <div className="group relative flex items-center justify-start h-9 w-14">
              {/* AT&T Logo Layer */}
              <div
                className="absolute inset-y-0 left-0 flex items-center transition-opacity duration-150 group-hover:opacity-0 pointer-events-none"
              >
                <AttLogo width={54} height={27} />
              </div>

              {/* Toggle Button Layer: Modeled exactly to mimic the rounded-xl capsule layer from Image 3 */}
              <button
                aria-label="Open chat history"
                onClick={() => setChatHistoryOpen(true)}
                className="absolute inset-y-0 left-0 flex w-[48px] items-center justify-center rounded-xl border border-transparent text-white opacity-0 group-hover:opacity-100 group-hover:bg-white/15 group-hover:border-white/10 transition-all duration-150"
              >
                <PanelLeftOpen className="size-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Profile Avatar */}
        <div className="flex items-center">
          <Avatar className="border border-white/20 shadow-md">
            <AvatarFallback className="bg-white text-[#0057B8] font-semibold">U</AvatarFallback>
          </Avatar>
        </div>

      </div>
    </header>
  );
}
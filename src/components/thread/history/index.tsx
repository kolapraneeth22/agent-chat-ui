import { Button } from "@/components/ui/button";
import { useThreads } from "@/providers/Thread";
import { Thread } from "@langchain/langgraph-sdk";
import { useEffect } from "react";
import { cn } from "@/lib/utils"; 

import { getContentString } from "../utils";
import { useQueryState, parseAsBoolean } from "nuqs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function ThreadList({
  threads,
  onThreadClick,
}: {
  threads: Thread[];
  onThreadClick?: (threadId: string) => void;
}) {
  const [threadId, setThreadId] = useQueryState("threadId");

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-start gap-1 overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-track]:bg-transparent">
      {threads.map((t) => {
        let itemText = t.thread_id;
        if (
          typeof t.values === "object" &&
          t.values &&
          "messages" in t.values &&
          Array.isArray(t.values.messages) &&
          t.values.messages?.length > 0
        ) {
          const firstMessage = t.values.messages[0];
          itemText = getContentString(firstMessage.content);
        }

        const isSelected = t.thread_id === threadId;

        return (
          <div key={t.thread_id} className="w-full">
            <Button
              variant="ghost"
              // Keeps high readability on top of the precise corporate AT&T blue gradient mix
              className={cn(
                "w-full h-11 items-center justify-start text-left font-medium text-white/85 hover:text-white hover:bg-white/10 px-3 transition-all",
                // Creates the exact capsule style from your first layout screenshot
                isSelected && "bg-white/20 text-white shadow-xs rounded-xl backdrop-blur-xs border border-white/20 hover:bg-white/25"
              )}
              onClick={(e) => {
                e.preventDefault();
                onThreadClick?.(t.thread_id);
                if (t.thread_id === threadId) return;
                setThreadId(t.thread_id);
              }}
            >
              <p className="truncate text-ellipsis w-full">{itemText}</p>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function ThreadHistoryLoading() {
  return (
    <div className="flex h-full w-full flex-col items-stretch justify-start gap-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
      {Array.from({ length: 15 }).map((_, i) => (
        <Skeleton
          key={`skeleton-${i}`}
          className="h-11 w-full bg-white/15 rounded-xl"
        />
      ))}
    </div>
  );
}

export default function ThreadHistory() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );

  const { getThreads, threads, setThreads, threadsLoading, setThreadsLoading } =
    useThreads();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setThreadsLoading(true);
    getThreads()
      .then(setThreads)
      .catch(console.error)
      .finally(() => setThreadsLoading(false));
  }, []);

  return (
    <>
      {/* FIXED:
        1. Applied 'bg-gradient-to-b from-[#0057B8] to-[#00A6CA]' matching your exact navbar tokens seamlessly.
        2. Cleaned border configurations to ensure that weird trailing white line/gap is completely removed.
      */}
      <div className="hidden h-[calc(100vh-3.5rem)] w-[280px] shrink-0 flex-col items-stretch justify-start gap-4 p-4 bg-gradient-to-b from-[#0057B8] to-[#00A6CA] border-none box-border lg:flex">
        {/* <div className="flex w-full items-center justify-between pb-2">
          <h1 className="text-xl font-bold tracking-tight text-white">
            History
          </h1>
        </div> */}
        {threadsLoading ? (
          <ThreadHistoryLoading />
        ) : (
          <ThreadList threads={threads} />
        )}
      </div>

      <div className="lg:hidden">
        <Sheet
          open={!!chatHistoryOpen && !isLargeScreen}
          onOpenChange={(open) => {
            if (isLargeScreen) return;
            setChatHistoryOpen(open);
          }}
        >
          <SheetContent
            side="left"
            className="flex flex-col items-stretch justify-start gap-4 p-4 bg-gradient-to-b from-[#0057B8] to-[#00A6CA] border-none text-white w-[280px]"
          >
            <SheetHeader className="p-0 text-left">
              <SheetTitle className="text-xl font-bold tracking-tight text-white">
                History
              </SheetTitle>
            </SheetHeader>
            <ThreadList
              threads={threads}
              onThreadClick={() => setChatHistoryOpen((o) => !o)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
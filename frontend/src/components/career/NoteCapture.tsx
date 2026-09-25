import { format, isToday, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  NotebookPen,
  Plus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROMPT = "What happened this week?";

interface NoteCaptureProps {
  projects: string[];
  defaultProject?: string;
  initiallyOpen?: boolean;
  /** `card` sits in the Home desk; `hero` is the empty-Home invitation. */
  variant?: "card" | "hero";
  className?: string;
}

const fade = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.16, ease: [0.2, 0, 0, 1] },
};

export function NoteCapture({
  projects,
  defaultProject,
  initiallyOpen = false,
  variant = "card",
  className,
}: NoteCaptureProps) {
  const [open, setOpen] = useState(initiallyOpen);
  const [text, setText] = useState("");
  const [date, setDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [project, setProject] = useState(defaultProject ?? "");
  const openerRef = useRef<HTMLButtonElement>(null);
  const restingRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const wasOpen = useRef(open);

  useEffect(() => {
    // The resting face stays mounted underneath the form so the card keeps
    // its size; it must not be focusable or announced while covered.
    if (restingRef.current) restingRef.current.inert = open;
    if (open) textareaRef.current?.focus();
    else if (wasOpen.current) openerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const draft = text.trim();
  const isHero = variant === "hero";
  const dateLabel = isToday(parseISO(date))
    ? "Today"
    : format(parseISO(date), "d MMM");

  return (
    <div
      className={cn(
        "relative rounded-xl",
        isHero ? "bg-desk-feature" : "bg-desk-note",
        className
      )}
    >
      <motion.div
        ref={restingRef}
        initial={false}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.12 }}
        className="h-full"
      >
        {isHero ? (
          <div className="px-6 py-12 text-center sm:px-10">
            <NotebookPen className="mx-auto size-6" aria-hidden="true" />
            <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight">
              Start with one thing you want to remember
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              A small note is enough. You can add context and evidence later.
            </p>
            <Button
              ref={openerRef}
              size="default"
              className="pressable mt-6"
              onClick={() => setOpen(true)}
            >
              <Plus /> {draft ? "Continue your note" : "Add a note"}
            </Button>
          </div>
        ) : (
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="pressable-soft flex h-full min-h-60 w-full flex-col rounded-xl p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <NotebookPen className="size-5" aria-hidden="true" />
            <span className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {draft ? "Unsaved note" : "Note"}
            </span>
            <span className="mt-2 line-clamp-3 max-w-72 text-xl font-medium leading-snug">
              {draft || PROMPT}
            </span>
            <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold">
              {draft ? "Continue" : "Add a note"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </button>
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.form
            key="open"
            {...fade}
            className={cn(
              "absolute inset-0 flex flex-col p-5 sm:p-6",
              isHero && "sm:px-8"
            )}
            onSubmit={(event) => event.preventDefault()}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
          >
            <label
              htmlFor={`note-${variant}`}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
            >
              <NotebookPen className="size-4" aria-hidden="true" />
              Note
            </label>
            <textarea
              id={`note-${variant}`}
              ref={textareaRef}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={PROMPT}
              className="mt-1 min-h-14 w-full flex-1 resize-none bg-transparent pt-2 [mask-image:linear-gradient(to_bottom,transparent,#000_0.5rem)] text-lg font-medium leading-snug outline-none placeholder:text-foreground/45"
            />
            <div className="mt-3 flex min-w-0 gap-2">
              <label className="relative inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-background/70 px-3 text-xs font-medium focus-within:ring-2 focus-within:ring-ring">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                <span aria-hidden="true">{dateLabel}</span>
                <span className="sr-only">Date</span>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={date}
                  max={format(new Date(), "yyyy-MM-dd")}
                  onChange={(event) =>
                    event.target.value && setDate(event.target.value)
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    dateInputRef.current?.showPicker?.();
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0 [color-scheme:light] dark:[color-scheme:dark]"
                />
              </label>
              {projects.length > 0 && (
                <label className="relative inline-flex h-8 min-w-0 items-center rounded-md bg-background/70 text-xs font-medium focus-within:ring-2 focus-within:ring-ring">
                  <BookOpen
                    className="pointer-events-none absolute left-2.5 size-3.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Project</span>
                  <select
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                    className="h-8 w-full min-w-0 appearance-none truncate rounded-md bg-transparent pl-7 pr-3 outline-none"
                  >
                    <option value="">No project</option>
                    {projects.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <p className="mr-auto whitespace-nowrap text-xs text-muted-foreground">
                Can’t save yet
              </p>
              <Button
                type="button"
                variant="ghost"
                size="default"
                className="hover:bg-background/60"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button
                type="submit"
                size="default"
                className="disabled:bg-foreground/10 disabled:text-foreground/50 disabled:opacity-100 disabled:shadow-none"
                disabled
              >
                Save
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

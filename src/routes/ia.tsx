import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Lock,
  Loader2,
  Download,
  ImageIcon,
  FileText,
  Plus,
  Bot,
  Paperclip,
  Mic,
  MicOff,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { jsPDF } from "jspdf";
import { marked } from "marked";

export const Route = createFileRoute("/ia")({
  head: () => ({
    meta: [
      { title: "IA — Assistente Conemag" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: IaPage,
});

const VALID_PASSWORDS = ["2906", "1304"];
const UNLOCK_KEY = "conemag-ia-unlocked";
const MESSAGES_KEY = "conemag-ia-messages";

function IaPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUnlocked(sessionStorage.getItem(UNLOCK_KEY) === "1");
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <Chat />;
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (VALID_PASSWORDS.includes(pwd.trim())) {
      sessionStorage.setItem(UNLOCK_KEY, "1");
      onUnlock();
    } else {
      setError("Senha incorreta");
      setPwd("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Acesso restrito</h1>
          <p className="text-sm text-muted-foreground">Digite a senha para conversar com a IA.</p>
        </div>
        <Input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setError("");
          }}
          placeholder="Senha"
          className="text-center text-lg tracking-widest"
        />
        {error && <p className="mt-2 text-center text-sm text-destructive">{error}</p>}
        <Button type="submit" className="mt-4 w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
}

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

function Chat() {
  const [initial] = useState<UIMessage[]>(() => loadMessages());
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<
    { name: string; mediaType: string; url: string }[]
  >([]);
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, setMessages, stop } = useChat({
    id: "conemag-ia",
    messages: initial,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => console.error(e),
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // quota — ignore
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [status]);

  const isLoading = status === "submitted" || status === "streaming";

  async function submit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if ((!text && attachments.length === 0) || isLoading) return;
    setInput("");
    const parts: any[] = attachments.map((a) => ({
      type: "file",
      mediaType: a.mediaType,
      url: a.url,
      filename: a.name,
    }));
    if (text) parts.push({ type: "text", text });
    setAttachments([]);
    await sendMessage({ parts });
  }

  function newConversation() {
    if (isLoading) stop();
    setMessages([]);
    localStorage.removeItem(MESSAGES_KEY);
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const newOnes: typeof attachments = [];
    for (const file of Array.from(files)) {
      if (file.size > 8 * 1024 * 1024) {
        alert(`${file.name} é maior que 8MB e foi ignorado.`);
        continue;
      }
      const url = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = () => reject(r.error);
        r.readAsDataURL(file);
      });
      newOnes.push({ name: file.name, mediaType: file.type || "image/png", url });
    }
    setAttachments((prev) => [...prev, ...newOnes]);
  }

  function toggleRecording() {
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      alert("Reconhecimento de voz não é suportado neste navegador. Use o Chrome no desktop ou Android.");
      return;
    }
    if (recording) {
      recognitionRef.current?.stop();
      return;
    }
    const rec = new SR();
    rec.lang = "pt-BR";
    rec.interimResults = true;
    rec.continuous = true;
    let finalText = input ? input + " " : "";
    rec.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t + " ";
        else interim += t;
      }
      setInput((finalText + interim).trimStart());
    };
    rec.onend = () => setRecording(false);
    rec.onerror = () => setRecording(false);
    recognitionRef.current = rec;
    rec.start();
    setRecording(true);
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-card/60 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold leading-tight">Assistente Conemag</h1>
            <p className="text-xs text-muted-foreground">IA com geração de imagens e documentos</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={newConversation}>
          <Plus className="mr-1 h-4 w-4" /> Nova conversa
        </Button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {messages.length === 0 && <EmptyState onPick={(t) => setInput(t)} />}
          <div className="space-y-6">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {status === "submitted" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Pensando...
              </div>
            )}
          </div>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="border-t border-border bg-card/60 px-4 py-3 backdrop-blur"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(e as unknown as FormEvent);
              }
            }}
            placeholder="Pergunte qualquer coisa, peça uma imagem ou um documento..."
            rows={1}
            className="max-h-48 min-h-[44px] flex-1 resize-none"
            disabled={isLoading}
          />
          {isLoading ? (
            <Button type="button" variant="outline" onClick={stop}>
              Parar
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (t: string) => void }) {
  const suggestions = [
    "Escreva um e-mail comercial apresentando a Conemag para um cliente novo no Chile",
    "Gere uma imagem de uma prensa industrial moderna em um galpão de reciclagem",
    "Crie um documento com uma proposta comercial de uma prensa TJX 300",
    "Explique a diferença entre prensa, tesoura e triturador de sucata",
  ];
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Bot className="h-7 w-7" />
      </div>
      <h2 className="font-display text-2xl font-semibold">Como posso ajudar?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Converse, gere imagens e crie documentos.
      </p>
      <div className="mx-auto mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            className="rounded-xl border border-border bg-card p-3 text-left text-sm text-foreground transition hover:border-primary hover:bg-accent"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] space-y-3",
          isUser && "rounded-2xl bg-primary px-4 py-2 text-primary-foreground",
        )}
      >
        {message.parts.map((part, i) => {
          if (part.type === "text") {
            return (
              <div
                key={i}
                className={cn(
                  "prose prose-sm max-w-none dark:prose-invert",
                  isUser && "prose-invert",
                )}
              >
                <ReactMarkdown>{part.text}</ReactMarkdown>
              </div>
            );
          }
          if (part.type === "tool-generate_image") {
            return <ImageToolPart key={i} part={part} />;
          }
          if (part.type === "tool-generate_document") {
            return <DocToolPart key={i} part={part} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

type ToolPart = {
  state: string;
  input?: unknown;
  output?: unknown;
};

function ImageToolPart({ part }: { part: ToolPart }) {
  if (part.state !== "output-available") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
        <ImageIcon className="h-4 w-4" />
        <Loader2 className="h-3 w-3 animate-spin" /> Gerando imagem...
      </div>
    );
  }
  const out = part.output as { success: boolean; imageUrl?: string; error?: string };
  if (!out.success || !out.imageUrl) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        Erro ao gerar imagem: {out.error}
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <img src={out.imageUrl} alt="Imagem gerada" className="w-full" />
      <div className="flex justify-end bg-card p-2">
        <a href={out.imageUrl} download="imagem-gerada.png">
          <Button size="sm" variant="outline">
            <Download className="mr-1 h-3 w-3" /> Baixar
          </Button>
        </a>
      </div>
    </div>
  );
}

function DocToolPart({ part }: { part: ToolPart }) {
  if (part.state !== "output-available") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        <Loader2 className="h-3 w-3 animate-spin" /> Gerando documento...
      </div>
    );
  }
  const out = part.output as {
    success: boolean;
    filename: string;
    title: string;
    markdown: string;
  };
  function download() {
    const blob = new Blob([out.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${out.filename || "documento"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-primary" />
          {out.title}
        </div>
        <Button size="sm" variant="outline" onClick={download}>
          <Download className="mr-1 h-3 w-3" /> Baixar .md
        </Button>
      </div>
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown>{out.markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
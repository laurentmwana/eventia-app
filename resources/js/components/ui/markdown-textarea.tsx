import type React from "react"
import { useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Bold, Italic, Link, Image, List, ListOrdered, Heading1, Heading2 } from "lucide-react"

interface MarkdownTextareaProps {
  id?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
}

export const MarkdownTextarea = ({
  id,
  name,
  placeholder = "Écrivez votre contenu ici...",
  defaultValue = "",
  className,
  onChange,
}: MarkdownTextareaProps) => {
  const [content, setContent] = useState(defaultValue)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const insertText = (before: string, after = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    setContent(newText)
    if (onChange) {
      onChange(newText)
    }

    // Set focus back to textarea and position cursor after inserted text
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const formatActions = [
    {
      icon: <Bold size={18} />,
      title: "Gras",
      action: () => insertText("**", "**"),
    },
    {
      icon: <Italic size={18} />,
      title: "Italique",
      action: () => insertText("*", "*"),
    },
    {
      icon: <Link size={18} />,
      title: "Lien",
      action: () => {
        const selectedText = content.substring(
          textareaRef.current?.selectionStart || 0,
          textareaRef.current?.selectionEnd || 0,
        )
        if (selectedText) {
          insertText("[", "](url)")
        } else {
          insertText("[texte](url)")
        }
      },
    },
    {
      icon: <Image size={18} />,
      title: "Image",
      action: () => insertText("![alt](", ")"),
    },
    {
      icon: <Heading1 size={18} />,
      title: "Titre 1",
      action: () => insertText("# "),
    },
    {
      icon: <Heading2 size={18} />,
      title: "Titre 2",
      action: () => insertText("## "),
    },
    {
      icon: <List size={18} />,
      title: "Liste à puces",
      action: () => insertText("- "),
    },
    {
      icon: <ListOrdered size={18} />,
      title: "Liste numérotée",
      action: () => insertText("1. "),
    },
  ]

  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Écrire</TabsTrigger>
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-2">
          <div className="flex flex-wrap gap-1 mb-2 p-1 border rounded-md bg-muted/50">
            {formatActions.map((action, index) => (
              <Button
              type="button"
                key={index}
                variant="ghost"
                size="sm"
                title={action.title}
                onClick={action.action}
                className="h-8 w-8 p-0"
              >
                {action.icon}
                <span className="sr-only">{action.title}</span>
              </Button>
            ))}
          </div>
          <Textarea
            ref={textareaRef}
            id={id}
            name={name}
            placeholder={placeholder}
            value={content}
            onChange={handleChange}
            className="min-h-[200px] font-mono text-sm"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Prend en charge le formatage Markdown. Utilisez les caractères gras, italique, # pour les titres, - pour les
            listes, etc.
          </p>
        </TabsContent>
        <TabsContent value="preview" className="mt-2">
          <div className="rounded-md border border-input bg-background p-4 min-h-[200px]">
            {content ? (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">L'aperçu apparaîtra ici...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


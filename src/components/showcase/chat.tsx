"use client"

import {
  CheckCircle2Icon,
  FileTextIcon,
  ImageIcon,
  SearchIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react"

import { Demo, Section } from "@/components/showcase/section"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { Spinner } from "@/components/ui/spinner"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

const conversation = Array.from({ length: 8 }, (_, index) => ({
  id: `m${index}`,
  align: index % 2 === 0 ? ("end" as const) : ("start" as const),
  text:
    index % 2 === 0
      ? `Question ${index / 2 + 1}: how do I scale my cluster?`
      : "Open the cluster settings and raise the node count.",
}))

function ChatSection() {
  return (
    <Section
      id="chat"
      title="Chat & AI"
      description="Building blocks for conversational interfaces."
    >
      <Demo name="message · bubble" className="md:col-span-2">
        <div className="flex w-full flex-col gap-4">
          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>Can you summarize last week&apos;s incidents?</BubbleContent>
              </Bubble>
              <MessageFooter>Read 10:42</MessageFooter>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar className="size-8">
              <SparklesIcon className="size-4" />
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>Assistant</MessageHeader>
              <BubbleGroup>
                <Bubble variant="muted">
                  <BubbleContent>There were 2 incidents last week.</BubbleContent>
                </Bubble>
                <Bubble variant="muted">
                  <BubbleContent>
                    Both were resolved within the SLA window.
                  </BubbleContent>
                  <BubbleReactions>👍</BubbleReactions>
                </Bubble>
              </BubbleGroup>
            </MessageContent>
          </Message>
        </div>
      </Demo>
      <Demo name="bubble variants">
        <div className="flex w-full flex-col gap-2">
          {(
            [
              "default",
              "secondary",
              "muted",
              "tinted",
              "outline",
              "ghost",
              "destructive",
            ] as const
          ).map((variant) => (
            <Bubble key={variant} variant={variant}>
              <BubbleContent>{variant}</BubbleContent>
            </Bubble>
          ))}
        </div>
      </Demo>
      <Demo name="message-scroller">
        <MessageScrollerProvider defaultScrollPosition="end">
          <MessageScroller className="h-64 rounded-2xl border">
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-3 p-4">
                {conversation.map((message) => (
                  <MessageScrollerItem key={message.id} messageId={message.id}>
                    <Message align={message.align}>
                      <MessageContent>
                        <Bubble
                          variant={message.align === "end" ? "default" : "muted"}
                        >
                          <BubbleContent>{message.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </Demo>
      <Demo name="attachment">
        <AttachmentGroup className="w-full">
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>report.pdf</AttachmentTitle>
              <AttachmentDescription>2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading">
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>diagram.png</AttachmentTitle>
              <AttachmentDescription>Uploading…</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment state="error">
            <AttachmentMedia>
              <ImageIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>photo.heic</AttachmentTitle>
              <AttachmentDescription>Unsupported format</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </Demo>
      <Demo name="marker">
        <div className="flex w-full flex-col gap-4">
          <Marker>
            <MarkerIcon>
              <CheckCircle2Icon />
            </MarkerIcon>
            <MarkerContent>Task completed</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerContent>Today</MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerContent>Conversation archived</MarkerContent>
          </Marker>
        </div>
      </Demo>
      <Demo name="trace">
        <Trace>
          <TraceLine>
            <TraceIcon>
              <SearchIcon />
            </TraceIcon>
            <TraceTitle>Searched the docs</TraceTitle>
            <TraceDescription>1.2s</TraceDescription>
          </TraceLine>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <FileTextIcon />
                </TraceIcon>
                <TraceTitle>Read 3 files</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              layout.tsx, page.tsx, globals.css
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceLine status="running">
            <TraceIcon>
              <Spinner />
            </TraceIcon>
            <TraceTitle>Writing summary</TraceTitle>
          </TraceLine>
          <TraceLine status="error">
            <TraceTitle>Fetch failed</TraceTitle>
          </TraceLine>
        </Trace>
      </Demo>
      <Demo name="questionnaire">
        <Questionnaire className="w-full" onSubmit={(e) => e.preventDefault()}>
          <QuestionnaireProgress />
          <QuestionnaireItem name="plan">
            <QuestionnaireTitle>Which plan fits your team?</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="starter">
                Starter
                <QuestionnaireChoiceDescription>
                  Up to 5 projects.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="pro">
                Pro
                <QuestionnaireChoiceDescription>
                  Unlimited projects.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
          </QuestionnaireItem>
          <QuestionnaireItem name="features" multiple>
            <QuestionnaireTitle>Which features do you need?</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="sso">SSO</QuestionnaireChoice>
              <QuestionnaireChoice value="audit">Audit logs</QuestionnaireChoice>
              <QuestionnaireChoice value="backups">Backups</QuestionnaireChoice>
            </QuestionnaireChoices>
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext />
            <QuestionnaireSubmit />
          </QuestionnaireActions>
        </Questionnaire>
      </Demo>
    </Section>
  )
}

export { ChatSection }

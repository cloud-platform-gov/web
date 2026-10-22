"use client"

import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  PlusIcon,
  UnderlineIcon,
} from "lucide-react"

import { Demo, Section } from "@/components/showcase/section"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

function ActionsSection() {
  return (
    <Section id="actions" title="Actions" description="Buttons and toggles.">
      <Demo name="button">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="icon" aria-label="Add">
            <PlusIcon />
          </Button>
        </div>
      </Demo>
      <Demo name="button-group">
        <ButtonGroup>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
          <ButtonGroupSeparator />
          <Button variant="outline" size="icon" aria-label="More">
            <ChevronDownIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonGroupText>https://</ButtonGroupText>
          <Button variant="outline">gov.example</Button>
        </ButtonGroup>
      </Demo>
      <Demo name="toggle">
        <div className="flex gap-2">
          <Toggle aria-label="Bold">
            <BoldIcon />
          </Toggle>
          <Toggle variant="outline" aria-label="Italic">
            <ItalicIcon />
            Italic
          </Toggle>
        </div>
      </Demo>
      <Demo name="toggle-group">
        <ToggleGroup variant="outline" multiple>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </Demo>
      <Demo name="kbd">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <p className="text-sm text-muted-foreground">
          Press <Kbd>d</Kbd> to toggle dark mode.
        </p>
      </Demo>
      <Demo name="spinner">
        <div className="flex items-center gap-4">
          <Spinner />
          <Button disabled>
            <Spinner />
            Loading
          </Button>
        </div>
      </Demo>
    </Section>
  )
}

export { ActionsSection }

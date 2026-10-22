"use client"

import * as React from "react"
import { MailIcon, SearchIcon } from "lucide-react"

import { Demo, Section } from "@/components/showcase/section"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const regions = [
  { label: "North", value: "north" },
  { label: "Northeast", value: "northeast" },
  { label: "Central-West", value: "central-west" },
  { label: "Southeast", value: "southeast" },
  { label: "South", value: "south" },
]

const services = ["Compute", "Storage", "Networking", "Databases", "Identity"]

function FormsSection() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Section id="forms" title="Forms" description="Inputs and form controls.">
      <Demo name="input · label">
        <div className="grid w-full gap-2">
          <Label htmlFor="showcase-email">Email</Label>
          <Input
            id="showcase-email"
            type="email"
            placeholder="name@gov.example"
          />
        </div>
        <Input disabled placeholder="Disabled" />
      </Demo>
      <Demo name="input-group">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search resources..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="username" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>@gov.example</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Demo>
      <Demo name="input-otp">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Demo>
      <Demo name="textarea">
        <Textarea placeholder="Describe the incident..." />
      </Demo>
      <Demo name="field">
        <FieldSet className="w-full">
          <FieldLegend>Project</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="showcase-project">Name</FieldLabel>
              <Input id="showcase-project" placeholder="my-project" />
              <FieldDescription>Lowercase letters and dashes.</FieldDescription>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="showcase-public" />
              <FieldLabel htmlFor="showcase-public">Public project</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </Demo>
      <Demo name="checkbox · switch">
        <div className="flex items-center gap-2">
          <Checkbox id="showcase-terms" defaultChecked />
          <Label htmlFor="showcase-terms">Accept terms</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="showcase-alerts" defaultChecked />
          <Label htmlFor="showcase-alerts">Email alerts</Label>
        </div>
      </Demo>
      <Demo name="radio-group">
        <RadioGroup defaultValue="standard">
          {["standard", "high-availability", "archive"].map((tier) => (
            <div key={tier} className="flex items-center gap-2">
              <RadioGroupItem value={tier} id={`showcase-tier-${tier}`} />
              <Label htmlFor={`showcase-tier-${tier}`} className="capitalize">
                {tier.replace("-", " ")}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Demo>
      <Demo name="slider">
        <Slider defaultValue={[40]} max={100} step={1} className="w-full" />
        <Slider defaultValue={[20, 80]} max={100} step={1} className="w-full" />
      </Demo>
      <Demo name="select">
        <Select items={regions} defaultValue="southeast">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Regions</SelectLabel>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Demo>
      <Demo name="native-select">
        <NativeSelect defaultValue="sa-east-1">
          <NativeSelectOption value="sa-east-1">sa-east-1</NativeSelectOption>
          <NativeSelectOption value="us-east-1">us-east-1</NativeSelectOption>
          <NativeSelectOption value="eu-west-1">eu-west-1</NativeSelectOption>
        </NativeSelect>
      </Demo>
      <Demo name="combobox">
        <Combobox items={services}>
          <ComboboxInput placeholder="Select a service" />
          <ComboboxContent>
            <ComboboxEmpty>No service found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Demo>
      <Demo name="calendar">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-2xl border"
        />
      </Demo>
    </Section>
  )
}

export { FormsSection }

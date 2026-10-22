"use client"

import * as React from "react"
import {
  BadgeCheckIcon,
  ChevronsUpDownIcon,
  CloudIcon,
  FolderOpenIcon,
  InfoIcon,
  TerminalIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Demo, Section } from "@/components/showcase/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { DirectionProvider } from "@/components/ui/direction"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const chartData = [
  { month: "Jan", compute: 186, storage: 80 },
  { month: "Feb", compute: 305, storage: 200 },
  { month: "Mar", compute: 237, storage: 120 },
  { month: "Apr", compute: 73, storage: 190 },
  { month: "May", compute: 209, storage: 130 },
  { month: "Jun", compute: 214, storage: 140 },
]

const chartConfig = {
  compute: { label: "Compute", color: "var(--chart-1)" },
  storage: { label: "Storage", color: "var(--chart-2)" },
} satisfies ChartConfig

const instances = [
  { name: "api-prod-01", region: "sa-east-1", status: "Running", cost: "$142" },
  { name: "worker-02", region: "sa-east-1", status: "Stopped", cost: "$0" },
  { name: "db-primary", region: "us-east-1", status: "Running", cost: "$389" },
]

const tags = Array.from({ length: 30 }, (_, i) => `v1.${30 - i}.0`)

const codeSample = `import { Button } from "@/components/ui/button"

export function Deploy() {
  return <Button>Deploy</Button>
}`

function DisplaySection() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section
      id="display"
      title="Data display"
      description="Cards, tables, charts and content containers."
    >
      <Demo name="card">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Monthly usage</CardTitle>
            <CardDescription>Billing period Oct 1 – Oct 31</CardDescription>
            <CardAction>
              <Badge variant="secondary">Pro</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">$1,284.00</CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">
              View invoice
            </Button>
          </CardFooter>
        </Card>
      </Demo>
      <Demo name="alert">
        <Alert>
          <InfoIcon />
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertDescription>Sunday 02:00–04:00 UTC.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Quota exceeded</AlertTitle>
          <AlertDescription>Upgrade your plan to continue.</AlertDescription>
        </Alert>
      </Demo>
      <Demo name="badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="secondary">
            <BadgeCheckIcon />
            Verified
          </Badge>
        </div>
      </Demo>
      <Demo name="avatar">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>AL</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </Demo>
      <Demo name="accordion">
        <Accordion className="w-full">
          <AccordionItem value="sla">
            <AccordionTrigger>What is the SLA?</AccordionTrigger>
            <AccordionContent>99.95% monthly uptime.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="regions">
            <AccordionTrigger>Which regions are available?</AccordionTrigger>
            <AccordionContent>
              sa-east-1, us-east-1 and eu-west-1.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>
      <Demo name="collapsible">
        <Collapsible className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">3 environment variables</span>
            <CollapsibleTrigger
              render={<Button variant="ghost" size="icon-sm" />}
              aria-label="Toggle"
            >
              <ChevronsUpDownIcon />
            </CollapsibleTrigger>
          </div>
          <div className="rounded-xl border px-3 py-2 font-mono text-xs">
            DATABASE_URL
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            <div className="rounded-xl border px-3 py-2 font-mono text-xs">
              API_KEY
            </div>
            <div className="rounded-xl border px-3 py-2 font-mono text-xs">
              REGION
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Demo>
      <Demo name="table" className="md:col-span-2">
        <Table>
          <TableCaption>Active instances.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instances.map((instance) => (
              <TableRow key={instance.name}>
                <TableCell className="font-medium">{instance.name}</TableCell>
                <TableCell>{instance.region}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      instance.status === "Running" ? "secondary" : "outline"
                    }
                  >
                    {instance.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{instance.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>
      <Demo name="item">
        <Item variant="outline" className="w-full">
          <ItemMedia variant="icon">
            <CloudIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Backups enabled</ItemTitle>
            <ItemDescription>Daily snapshots, 30 day retention.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Manage
            </Button>
          </ItemActions>
        </Item>
      </Demo>
      <Demo name="chart" className="md:col-span-2">
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="compute" fill="var(--color-compute)" radius={6} />
            <Bar dataKey="storage" fill="var(--color-storage)" radius={6} />
          </BarChart>
        </ChartContainer>
      </Demo>
      <Demo name="empty">
        <Empty className="w-full border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpenIcon />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>Create your first project.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">Create project</Button>
          </EmptyContent>
        </Empty>
      </Demo>
      <Demo name="carousel">
        <Carousel className="mx-auto w-full max-w-48">
          <CarouselContent>
            {Array.from({ length: 5 }, (_, index) => (
              <CarouselItem key={index}>
                <div className="flex aspect-square items-center justify-center rounded-2xl border text-3xl font-semibold">
                  {index + 1}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Demo>
      <Demo name="aspect-ratio">
        <AspectRatio
          ratio={16 / 9}
          className="w-full rounded-2xl bg-gradient-to-br from-primary/20 to-muted"
        >
          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
            16 / 9
          </div>
        </AspectRatio>
      </Demo>
      <Demo name="progress">
        <Progress value={progress} className="w-full">
          <ProgressLabel>Upload</ProgressLabel>
          <ProgressValue />
        </Progress>
      </Demo>
      <Demo name="skeleton">
        <div className="flex w-full items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </Demo>
      <Demo name="separator">
        <div className="w-full text-sm">
          <div className="font-medium">Cloud Platform</div>
          <p className="text-muted-foreground">Government infrastructure.</p>
          <Separator className="my-3" />
          <div className="flex h-5 items-center gap-3">
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Status</span>
            <Separator orientation="vertical" />
            <span>Support</span>
          </div>
        </div>
      </Demo>
      <Demo name="scroll-area">
        <ScrollArea className="h-48 w-full rounded-2xl border">
          <div className="p-4">
            <div className="mb-2 text-sm font-medium">Releases</div>
            {tags.map((tag) => (
              <div key={tag} className="border-b py-1.5 text-sm last:border-0">
                {tag}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Demo>
      <Demo name="resizable">
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-40 rounded-2xl border"
        >
          <ResizablePanel defaultSize="50%">
            <div className="flex h-full items-center justify-center text-sm">
              One
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50%">
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize="40%">
                <div className="flex h-full items-center justify-center text-sm">
                  Two
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize="60%">
                <div className="flex h-full items-center justify-center text-sm">
                  Three
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Demo>
      <Demo name="direction">
        <DirectionProvider direction="rtl">
          <div dir="rtl" className="flex w-full flex-col gap-2 text-sm">
            <Progress value={70} className="w-full">
              <ProgressLabel>تقدم</ProgressLabel>
            </Progress>
            <span className="text-muted-foreground">Right-to-left layout</span>
          </div>
        </DirectionProvider>
      </Demo>
      <Demo name="code-block" className="md:col-span-2">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <TerminalIcon />
              deploy.tsx
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={codeSample} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent lineNumbers>{codeSample}</CodeBlockContent>
        </CodeBlock>
      </Demo>
    </Section>
  )
}

export { DisplaySection }

"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const description = "An interactive area chart for net worth over time"

const chartData = [
  { date: "2024-04-01", netWorth: 35000 },
  { date: "2024-04-02", netWorth: 35500 },
  { date: "2024-04-03", netWorth: 36000 },
  { date: "2024-04-04", netWorth: 36500 },
  { date: "2024-04-05", netWorth: 37000 },
  { date: "2024-04-06", netWorth: 37500 },
  { date: "2024-04-07", netWorth: 38000 },
  { date: "2024-04-08", netWorth: 38500 },
  { date: "2024-04-09", netWorth: 39000 },
  { date: "2024-04-10", netWorth: 39500 },
  { date: "2024-04-11", netWorth: 40000 },
  { date: "2024-04-12", netWorth: 40500 },
  { date: "2024-04-13", netWorth: 41000 },
  { date: "2024-04-14", netWorth: 41500 },
  { date: "2024-04-15", netWorth: 42000 },
  { date: "2024-04-16", netWorth: 42500 },
  { date: "2024-04-17", netWorth: 43000 },
  { date: "2024-04-18", netWorth: 43500 },
  { date: "2024-04-19", netWorth: 44000 },
  { date: "2024-04-20", netWorth: 44500 },
  { date: "2024-04-21", netWorth: 45000 },
  { date: "2024-04-22", netWorth: 45500 },
  { date: "2024-04-23", netWorth: 46000 },
  { date: "2024-04-24", netWorth: 46500 },
  { date: "2024-04-25", netWorth: 47000 },
  { date: "2024-04-26", netWorth: 47500 },
  { date: "2024-04-27", netWorth: 48000 },
  { date: "2024-04-28", netWorth: 48500 },
  { date: "2024-04-29", netWorth: 49000 },
  { date: "2024-04-30", netWorth: 49500 },
  { date: "2024-05-01", netWorth: 50000 },
  { date: "2024-05-02", netWorth: 50500 },
  { date: "2024-05-03", netWorth: 51000 },
  { date: "2024-05-04", netWorth: 51500 },
  { date: "2024-05-05", netWorth: 52000 },
  { date: "2024-05-06", netWorth: 52500 },
  { date: "2024-05-07", netWorth: 53000 },
  { date: "2024-05-08", netWorth: 53500 },
  { date: "2024-05-09", netWorth: 54000 },
  { date: "2024-05-10", netWorth: 54500 },
  { date: "2024-05-11", netWorth: 55000 },
  { date: "2024-05-12", netWorth: 55500 },
  { date: "2024-05-13", netWorth: 56000 },
  { date: "2024-05-14", netWorth: 56500 },
  { date: "2024-05-15", netWorth: 57000 },
  { date: "2024-05-16", netWorth: 57500 },
  { date: "2024-05-17", netWorth: 58000 },
  { date: "2024-05-18", netWorth: 58500 },
  { date: "2024-05-19", netWorth: 59000 },
  { date: "2024-05-20", netWorth: 59500 },
  { date: "2024-05-21", netWorth: 60000 },
  { date: "2024-05-22", netWorth: 60500 },
  { date: "2024-05-23", netWorth: 61000 },
  { date: "2024-05-24", netWorth: 61500 },
  { date: "2024-05-25", netWorth: 62000 },
  { date: "2024-05-26", netWorth: 62500 },
  { date: "2024-05-27", netWorth: 63000 },
  { date: "2024-05-28", netWorth: 63500 },
  { date: "2024-05-29", netWorth: 64000 },
  { date: "2024-05-30", netWorth: 64500 },
  { date: "2024-05-31", netWorth: 65000 },
  { date: "2024-06-01", netWorth: 65500 },
  { date: "2024-06-02", netWorth: 66000 },
  { date: "2024-06-03", netWorth: 66500 },
  { date: "2024-06-04", netWorth: 67000 },
  { date: "2024-06-05", netWorth: 67500 },
  { date: "2024-06-06", netWorth: 68000 },
  { date: "2024-06-07", netWorth: 68500 },
  { date: "2024-06-08", netWorth: 69000 },
  { date: "2024-06-09", netWorth: 69500 },
  { date: "2024-06-10", netWorth: 70000 },
  { date: "2024-06-11", netWorth: 70500 },
  { date: "2024-06-12", netWorth: 71000 },
  { date: "2024-06-13", netWorth: 71500 },
  { date: "2024-06-14", netWorth: 72000 },
  { date: "2024-06-15", netWorth: 72500 },
  { date: "2024-06-16", netWorth: 73000 },
  { date: "2024-06-17", netWorth: 73500 },
  { date: "2024-06-18", netWorth: 74000 },
  { date: "2024-06-19", netWorth: 74500 },
  { date: "2024-06-20", netWorth: 75000 },
  { date: "2024-06-21", netWorth: 75500 },
  { date: "2024-06-22", netWorth: 76000 },
  { date: "2024-06-23", netWorth: 76500 },
  { date: "2024-06-24", netWorth: 77000 },
  { date: "2024-06-25", netWorth: 77500 },
  { date: "2024-06-26", netWorth: 78000 },
  { date: "2024-06-27", netWorth: 78500 },
  { date: "2024-06-28", netWorth: 79000 },
  { date: "2024-06-29", netWorth: 79500 },
  { date: "2024-06-30", netWorth: 80000 },
]

const chartConfig = {
  netWorth: {
    label: "Net Worth",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartNetWorth() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    } else if (timeRange === "1y") {
      daysToSubtract = 365
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Net Worth Over Time</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Your net worth over the last year.
          </span>
          <span className="@[540px]/card:hidden">Last year</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="1y">Last year</ToggleGroupItem>
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1y" className="rounded-lg">
                Last year
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillNetWorth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : filteredData.length - 1}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="netWorth"
              type="natural"
              fill="url(#fillNetWorth)"
              stroke="var(--chart-1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

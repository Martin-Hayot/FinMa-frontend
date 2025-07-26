"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart for financial data";

const chartData = [
    { date: "2024-04-01", revenue: 12500, expenses: 8200 },
    { date: "2024-04-02", revenue: 11800, expenses: 7900 },
    { date: "2024-04-03", revenue: 13200, expenses: 8500 },
    { date: "2024-04-04", revenue: 15600, expenses: 9100 },
    { date: "2024-04-05", revenue: 18900, expenses: 10200 },
    { date: "2024-04-06", revenue: 16400, expenses: 9800 },
    { date: "2024-04-07", revenue: 14200, expenses: 8700 },
    { date: "2024-04-08", revenue: 19500, expenses: 11200 },
    { date: "2024-04-09", revenue: 9800, expenses: 6500 },
    { date: "2024-04-10", revenue: 14700, expenses: 8900 },
    { date: "2024-04-11", revenue: 17200, expenses: 10500 },
    { date: "2024-04-12", revenue: 15800, expenses: 9200 },
    { date: "2024-04-13", revenue: 18100, expenses: 10800 },
    { date: "2024-04-14", revenue: 12300, expenses: 7600 },
    { date: "2024-04-15", revenue: 11500, expenses: 7200 },
    { date: "2024-04-16", revenue: 13400, expenses: 8100 },
    { date: "2024-04-17", revenue: 21200, expenses: 12800 },
    { date: "2024-04-18", revenue: 19800, expenses: 11600 },
    { date: "2024-04-19", revenue: 14900, expenses: 8800 },
    { date: "2024-04-20", revenue: 10200, expenses: 6900 },
    { date: "2024-04-21", revenue: 12800, expenses: 7800 },
    { date: "2024-04-22", revenue: 14600, expenses: 8400 },
    { date: "2024-04-23", revenue: 13700, expenses: 8200 },
    { date: "2024-04-24", revenue: 18500, expenses: 10900 },
    { date: "2024-04-25", revenue: 15200, expenses: 9100 },
    { date: "2024-04-26", revenue: 9500, expenses: 6200 },
    { date: "2024-04-27", revenue: 19200, expenses: 11400 },
    { date: "2024-04-28", revenue: 11900, expenses: 7500 },
    { date: "2024-04-29", revenue: 16800, expenses: 9800 },
    { date: "2024-04-30", revenue: 21500, expenses: 12600 },
    { date: "2024-05-01", revenue: 13800, expenses: 8300 },
    { date: "2024-05-02", revenue: 17400, expenses: 10200 },
    { date: "2024-05-03", revenue: 15100, expenses: 9000 },
    { date: "2024-05-04", revenue: 19700, expenses: 11800 },
    { date: "2024-05-05", revenue: 22800, expenses: 13500 },
    { date: "2024-05-06", revenue: 23400, expenses: 14100 },
    { date: "2024-05-07", revenue: 18600, expenses: 11000 },
    { date: "2024-05-08", revenue: 12400, expenses: 7700 },
    { date: "2024-05-09", revenue: 14300, expenses: 8600 },
    { date: "2024-05-10", revenue: 17600, expenses: 10400 },
    { date: "2024-05-11", revenue: 16900, expenses: 10100 },
    { date: "2024-05-12", revenue: 14800, expenses: 8900 },
    { date: "2024-05-13", revenue: 13900, expenses: 8400 },
    { date: "2024-05-14", revenue: 21600, expenses: 12900 },
    { date: "2024-05-15", revenue: 22100, expenses: 13200 },
    { date: "2024-05-16", revenue: 18200, expenses: 10800 },
    { date: "2024-05-17", revenue: 23800, expenses: 14200 },
    { date: "2024-05-18", revenue: 17100, expenses: 10200 },
    { date: "2024-05-19", revenue: 15300, expenses: 9100 },
    { date: "2024-05-20", revenue: 13600, expenses: 8200 },
    { date: "2024-05-21", revenue: 10800, expenses: 6800 },
    { date: "2024-05-22", revenue: 10500, expenses: 6600 },
    { date: "2024-05-23", revenue: 16200, expenses: 9600 },
    { date: "2024-05-24", revenue: 17800, expenses: 10600 },
    { date: "2024-05-25", revenue: 14500, expenses: 8700 },
    { date: "2024-05-26", revenue: 15700, expenses: 9300 },
    { date: "2024-05-27", revenue: 20800, expenses: 12400 },
    { date: "2024-05-28", revenue: 15900, expenses: 9500 },
    { date: "2024-05-29", revenue: 11200, expenses: 7100 },
    { date: "2024-05-30", revenue: 18300, expenses: 10900 },
    { date: "2024-05-31", revenue: 14100, expenses: 8500 },
    { date: "2024-06-01", revenue: 14300, expenses: 8600 },
    { date: "2024-06-02", revenue: 22600, expenses: 13500 },
    { date: "2024-06-03", revenue: 11700, expenses: 7400 },
    { date: "2024-06-04", revenue: 20700, expenses: 12300 },
    { date: "2024-06-05", revenue: 10900, expenses: 6900 },
    { date: "2024-06-06", revenue: 17200, expenses: 10200 },
    { date: "2024-06-07", revenue: 18800, expenses: 11100 },
    { date: "2024-06-08", revenue: 19300, expenses: 11500 },
    { date: "2024-06-09", revenue: 21200, expenses: 12600 },
    { date: "2024-06-10", revenue: 13400, expenses: 8100 },
    { date: "2024-06-11", revenue: 11600, expenses: 7300 },
    { date: "2024-06-12", revenue: 23100, expenses: 13800 },
    { date: "2024-06-13", revenue: 10700, expenses: 6800 },
    { date: "2024-06-14", revenue: 20500, expenses: 12200 },
    { date: "2024-06-15", revenue: 18400, expenses: 10900 },
    { date: "2024-06-16", revenue: 19100, expenses: 11300 },
    { date: "2024-06-17", revenue: 24200, expenses: 14400 },
    { date: "2024-06-18", revenue: 12100, expenses: 7600 },
    { date: "2024-06-19", revenue: 18700, expenses: 11000 },
    { date: "2024-06-20", revenue: 21400, expenses: 12700 },
    { date: "2024-06-21", revenue: 14200, expenses: 8500 },
    { date: "2024-06-22", revenue: 17800, expenses: 10500 },
    { date: "2024-06-23", revenue: 24500, expenses: 14600 },
    { date: "2024-06-24", revenue: 13100, expenses: 7900 },
    { date: "2024-06-25", revenue: 13800, expenses: 8200 },
    { date: "2024-06-26", revenue: 20900, expenses: 12400 },
    { date: "2024-06-27", revenue: 22300, expenses: 13300 },
    { date: "2024-06-28", revenue: 14600, expenses: 8800 },
    { date: "2024-06-29", revenue: 12200, expenses: 7700 },
    { date: "2024-06-30", revenue: 21800, expenses: 13000 },
];

const chartConfig = {
    money: {
        label: "Amount",
    },
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
    expenses: {
        label: "Expenses",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("90d");

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2024-06-30");
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Revenue and expenses for the last 3 months
                    </span>
                    <span className="@[540px]/card:hidden">Last 3 months</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">
                            Last 3 months
                        </ToggleGroupItem>
                        <ToggleGroupItem value="30d">
                            Last 30 days
                        </ToggleGroupItem>
                        <ToggleGroupItem value="7d">
                            Last 7 days
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
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
                            <linearGradient
                                id="fillRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
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
                            <linearGradient
                                id="fillExpenses"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--chart-2)"
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--chart-2)"
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
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            defaultIndex={isMobile ? -1 : 10}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="expenses"
                            type="natural"
                            fill="url(#fillExpenses)"
                            stroke="var(--chart-2)"
                            stackId="a"
                        />
                        <Area
                            dataKey="revenue"
                            type="natural"
                            fill="url(#fillRevenue)"
                            stroke="var(--chart-1)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

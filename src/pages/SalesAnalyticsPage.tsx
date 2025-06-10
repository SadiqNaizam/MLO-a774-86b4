import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import SalesTrendWidget from '@/components/widgets/SalesTrendWidget';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartLegend } from '@/components/ui/chart'; // ShadCN Chart wrapper
import { CalendarDays, Download } from 'lucide-react';

const monthlySalesData = [
  { month: 'Jan', sales: 4000, profit: 2400 }, { month: 'Feb', sales: 3000, profit: 1398 },
  { month: 'Mar', sales: 5000, profit: 3800 }, { month: 'Apr', sales: 4780, profit: 2908 },
  { month: 'May', sales: 6890, profit: 4800 }, { month: 'Jun', sales: 5390, profit: 3500 },
];

const categorySalesData = [
  { name: 'Electronics', value: 40000, fill: 'hsl(var(--chart-1))' },
  { name: 'Apparel', value: 25000, fill: 'hsl(var(--chart-2))' },
  { name: 'Groceries', value: 18000, fill: 'hsl(var(--chart-3))' },
  { name: 'Home Goods', value: 12000, fill: 'hsl(var(--chart-4))' },
  { name: 'Books', value: 5000, fill: 'hsl(var(--chart-5))' },
];

const topProductsData = [
    { id: 'P1', name: 'Laptop Pro', category: 'Electronics', sales: 120, revenue: 144000 },
    { id: 'P2', name: 'Designer T-Shirt', category: 'Apparel', sales: 350, revenue: 17500 },
    { id: 'P3', name: 'Organic Coffee Beans', category: 'Groceries', sales: 500, revenue: 7500 },
];

const SalesAnalyticsPage: React.FC = () => {
  console.log('SalesAnalyticsPage loaded');

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <AppHeader user={{ name: 'Admin User' }} appName="Sales Analytics" />
        <main className="flex-1 p-4 sm:px-6 md:p-8 overflow-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Advanced Sales Analytics</h1>
            <div className="flex items-center gap-2">
              <Select defaultValue="last30days">
                <SelectTrigger className="w-[180px]">
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground"/>
                  <SelectValue placeholder="Select Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Report
              </Button>
            </div>
          </div>

          {/* Sales Trend Widget Reused */}
          <SalesTrendWidget title="Overall Sales Performance" data={monthlySalesData.map(d => ({ name: d.month, sales: d.sales, lastYear: d.profit }))} />

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories.</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ChartContainer config={{}} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie data={categorySalesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false}
                           label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                             const RADIAN = Math.PI / 180;
                             const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                             const x = cx + radius * Math.cos(-midAngle * RADIAN);
                             const y = cy + radius * Math.sin(-midAngle * RADIAN);
                             return (
                               <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                                 {`${(percent * 100).toFixed(0)}%`}
                               </text>
                             );
                           }}>
                        {categorySalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit Analysis</CardTitle>
                <CardDescription>Comparison of sales vs. profit over months.</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ChartContainer config={{
                    sales: { label: "Sales", color: "hsl(var(--chart-1))" },
                    profit: { label: "Profit", color: "hsl(var(--chart-2))" },
                }} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySalesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <ChartLegend />
                    <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
                <CardTitle>Top Performing Products (Detailed)</CardTitle>
                <CardDescription>Detailed breakdown of top products by sales volume and revenue.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Units Sold</TableHead>
                            <TableHead className="text-right">Total Revenue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topProductsData.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="text-right">{product.sales}</TableCell>
                                <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
};

export default SalesAnalyticsPage;

// Minimal imports for shadcn chart tooltip/legend (assuming they are part of ui/chart or auto-imported)
import { ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
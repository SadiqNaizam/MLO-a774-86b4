import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Assuming recharts is used for 'Chart'
import { TrendingUp } from 'lucide-react';

// Example data - replace with actual data fetching
const exampleData = [
  { name: 'Jan', sales: 4000, lastYear: 2400 },
  { name: 'Feb', sales: 3000, lastYear: 1398 },
  { name: 'Mar', sales: 5000, lastYear: 9800 },
  { name: 'Apr', sales: 4780, lastYear: 3908 },
  { name: 'May', sales: 6890, lastYear: 4800 },
  { name: 'Jun', sales: 5390, lastYear: 3800 },
  { name: 'Jul', sales: 6490, lastYear: 4300 },
];

interface SalesTrendWidgetProps {
  title?: string;
  data?: { name: string; sales: number; lastYear?: number }[];
}

const SalesTrendWidget: React.FC<SalesTrendWidgetProps> = ({
  title = "Sales Trend",
  data = exampleData,
}) => {
  console.log("Rendering SalesTrendWidget with data count:", data.length);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {/* Example: Displaying a key metric. Full chart below. */}
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        <div className="h-[300px] mt-4"> {/* Fixed height for the chart container */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{ fill: 'hsl(var(--accent))', fillOpacity: 0.3 }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} name="Current Period" />
              {data[0]?.lastYear !== undefined && (
                <Line type="monotone" dataKey="lastYear" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" name="Last Year" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesTrendWidget;
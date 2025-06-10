import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from 'lucide-react'; // Example Icon

interface FunnelStep {
  name: string;
  value: number;
  percentage?: number; // Optional: percentage of previous step or total
}

// Example data
const exampleFunnelData: FunnelStep[] = [
  { name: "Visitors", value: 10000 },
  { name: "Product Views", value: 3000, percentage: 30 },
  { name: "Add to Cart", value: 500, percentage: 16.67 },
  { name: "Checkout Started", value: 250, percentage: 50 },
  { name: "Purchased", value: 150, percentage: 60 },
];

interface ConversionFunnelWidgetProps {
  title?: string;
  data?: FunnelStep[];
}

const ConversionFunnelWidget: React.FC<ConversionFunnelWidgetProps> = ({
  title = "Conversion Funnel",
  data = exampleFunnelData,
}) => {
  console.log("Rendering ConversionFunnelWidget with steps:", data.length);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Filter className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((step, index) => (
            <div key={step.name} className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-foreground bg-primary">
                    {step.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-primary">
                    {step.value.toLocaleString()}
                    {step.percentage !== undefined && index > 0 && (
                      <span className="text-muted-foreground text-xs ml-1">({step.percentage.toFixed(1)}%)</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                <div
                  style={{ width: `${(step.value / data[0].value) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnelWidget;
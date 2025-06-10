import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react'; // Example Icon

interface Product {
  id: string;
  name: string;
  sales: number; // Or revenue, units sold, etc.
  imageUrl?: string;
  category?: string;
}

// Example data
const exampleProducts: Product[] = [
  { id: "1", name: "Premium Blend Coffee", sales: 1250, imageUrl: "/placeholder.svg", category: "Beverages" },
  { id: "2", name: "Organic Green Tea", sales: 980, imageUrl: "/placeholder.svg", category: "Beverages" },
  { id: "3", name: "Artisan Bread Loaf", sales: 750, category: "Bakery" },
  { id: "4", name: "Dark Chocolate Bar", sales: 620, imageUrl: "/placeholder.svg", category: "Confectionery" },
  { id: "5", name: "Spiced Chai Latte Mix", sales: 550, category: "Beverages" },
];

interface TopPerformingProductsWidgetProps {
  title?: string;
  description?: string;
  products?: Product[];
  metricLabel?: string; // e.g., "Sales", "Units Sold"
}

const TopPerformingProductsWidget: React.FC<TopPerformingProductsWidgetProps> = ({
  title = "Top Performing Products",
  description = "Based on current period sales.",
  products = exampleProducts,
  metricLabel = "Sales"
}) => {
  console.log("Rendering TopPerformingProductsWidget with products:", products.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
            <Star className="h-4 w-4 text-muted-foreground mr-2" />
            {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {products.slice(0, 5).map((product) => ( // Display top 5
            <li key={product.id} className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 rounded">
                <AvatarImage src={product.imageUrl || "/placeholder.svg"} alt={product.name} />
                <AvatarFallback>{product.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none truncate">{product.name}</p>
                {product.category && <p className="text-xs text-muted-foreground">{product.category}</p>}
              </div>
              <div className="text-sm font-semibold text-primary">
                {typeof product.sales === 'number' && product.sales.toLocaleString()}
                <span className="text-xs text-muted-foreground ml-1">{metricLabel}</span>
              </div>
            </li>
          ))}
        </ul>
        {products.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No product data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPerformingProductsWidget;
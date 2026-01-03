import { prisma } from "@/lib/db";
import { Package, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "@/components/charts/OverviewChart";
import { StatCard } from "@/components/dashboard/StatCard";

export default async function DashboardPage() {
  const totalProducts = await prisma.product.count();
  
  const aggregateData = await prisma.product.aggregate({
    _sum: {
      stock: true,
      price: true,
    },
  });

  const totalStock = aggregateData._sum.stock || 0;
  const totalValue = aggregateData._sum.price || 0;

  const products = await prisma.product.findMany({
    take: 10,
    select: {
      name: true,
      stock: true,
    },
    orderBy: {
      stock: 'desc',
    },
  });

  const chartData = products.map((product) => ({
    name: product.name,
    stock: product.stock,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your store.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Products"
          value={totalProducts}
          description="Active products in inventory"
          icon={Package}
          gradient="from-blue-600 to-blue-400"
          delay={0}
        />
        <StatCard
          title="Total Stock"
          value={totalStock}
          description="Units across all products"
          icon={TrendingUp}
          gradient="from-purple-600 to-purple-400"
          delay={0.1}
        />
        <StatCard
          title="Total Value"
          value={`$${Number(totalValue).toFixed(2)}`}
          description="Combined inventory value"
          icon={DollarSign}
          gradient="from-pink-600 to-pink-400"
          delay={0.2}
        />
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Stock Overview</CardTitle>
          <p className="text-sm text-gray-500">Top 10 products by stock quantity</p>
        </CardHeader>
        <CardContent>
          <OverviewChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}

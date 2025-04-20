import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Analytics() {
  const storageData = [
    { name: 'Jan', used: 12.5, available: 87.5 },
    { name: 'Feb', used: 18.3, available: 81.7 },
    { name: 'Mar', used: 24.1, available: 75.9 },
    { name: 'Apr', used: 29.8, available: 70.2 },
    { name: 'May', used: 33.4, available: 66.6 },
    { name: 'Jun', used: 39.2, available: 60.8 },
    { name: 'Jul', used: 42.8, available: 57.2 },
  ];

  const activityData = [
    { name: 'Mon', uploads: 5, downloads: 3, shares: 2 },
    { name: 'Tue', uploads: 7, downloads: 4, shares: 1 },
    { name: 'Wed', uploads: 3, downloads: 8, shares: 5 },
    { name: 'Thu', uploads: 10, downloads: 5, shares: 3 },
    { name: 'Fri', uploads: 8, downloads: 6, shares: 7 },
    { name: 'Sat', uploads: 2, downloads: 1, shares: 0 },
    { name: 'Sun', uploads: 1, downloads: 2, shares: 1 },
  ];

  const fileTypeData = [
    { name: 'Images', count: 347 },
    { name: 'Videos', count: 128 },
    { name: 'Documents', count: 564 },
    { name: 'Audio', count: 89 },
    { name: 'Other', count: 42 },
  ];

  return (
    <DashboardLayout title="Analytics">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>
              Monitor your storage utilization over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storageData} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                  <Legend />
                  <Bar dataKey="used" name="Used Storage" stackId="a" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="available" name="Available Storage" stackId="a" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle>File Distribution</CardTitle>
            <CardDescription>
              Breakdown by file type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fileTypeData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" name="Files" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Account Activity</CardTitle>
          <CardDescription>
            Track your file operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">This Week</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="uploads" name="Uploads" stroke="hsl(var(--chart-4))" strokeWidth={2} />
                  <Line type="monotone" dataKey="downloads" name="Downloads" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                  <Line type="monotone" dataKey="shares" name="Shares" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                Monthly data view will be available soon
              </div>
            </TabsContent>
            <TabsContent value="yearly">
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                Yearly data view will be available soon
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
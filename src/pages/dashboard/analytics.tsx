import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  fileTypeLength,
  groupFilesByMonth,
  groupFilesByYear,
  getWeeklyActivity,
  getStorageByFileType,
  formatBytes,
  getRecentActivity,
  fileTypeStorage,
  formatFileSize,
  dateFormat
} from '@/lib/utils';
import { useFileStats, useFileDataLatest } from '@/hooks/useFileData';
import { FileText, Image, Video, Music, HardDrive, TrendingUp, Activity, Clock } from 'lucide-react';
// import { FileAttributes } from '@/types/FileAttributes';
import { useMemo } from 'react';

export default function Analytics() {
  const { data: stats, loading: statsLoading } = useFileStats();
  const { data: latestFiles, loading: latestLoading } = useFileDataLatest();

  // Calculate storage usage
  // const storageInfo = calculateStorageUsage(stats);
  const totalSize = fileTypeStorage(stats)
  const percetage = parseInt((((totalSize / (1024 * 1024)) / 512) * 100).toFixed(2))
  // Generate storage data over time (mock data for demonstration)



// type FileStat = {
//   userId: number;
//   fileSize: number; // in bytes
//   fileType: string;
//   isFavorite: boolean | null;
//   createdAt: string;
// };

// type StorageEntry = {
//   name: string;
//   used: number;      // in percent
//   available: number; // in percent
// };
const TOTAL_STORAGE_MB = 512;

// function generateCumulativeStorageData(files: FileAttributes[], capacityMB = 512): StorageEntry[] {
//   const MONTH_NAMES = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const monthUsageMap = new Array(12).fill(0); // stores usage in bytes for each month

//   for (const file of files) {
//     const date = new Date(file.createdAt);
//     const month = date.getUTCMonth(); // 0-11
//     monthUsageMap[month] += file.fileSize;
//   }

//   const totalCapacityBytes = capacityMB * 1024 * 1024;
//   let cumulativeUsed = 0;

//   const storageData: StorageEntry[] = [];

//   for (let i = 0; i < 12; i++) {
//     cumulativeUsed += monthUsageMap[i];
//     const usedPercentage = Math.min((cumulativeUsed / totalCapacityBytes) * 100, 100);
//     const availablePercentage = Math.max(0, 100 - usedPercentage);

//     storageData.push({
//       name: MONTH_NAMES[i],
//       used: parseFloat(usedPercentage.toFixed(2)),
//       available: parseFloat(availablePercentage.toFixed(2)),
//     });
//   }

//   return storageData;
// }

const usageData = useMemo(() => {
    const monthlySizes = Array(12).fill(0);
    let totalUsed = 0;
    const fileTypes: Record<string, number> = {};

    stats.forEach((file) => {
      const sizeMB = file.fileSize / (1024 * 1024);
      const createdAt = new Date(file.createdAt);
      const month = createdAt.getMonth();
      monthlySizes[month] += sizeMB;
      totalUsed += sizeMB;

      const type = file.fileType || "unknown";
      fileTypes[type] = (fileTypes[type] || 0) + sizeMB;
    });

    const monthly = monthlySizes.map((size, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "long" }),
      size: parseFloat(size.toFixed(2)),
    }));

    const fileTypeData = Object.entries(fileTypes).map(([type, size]) => ({
      type,
      size: parseFloat(size.toFixed(2)),
    }));

    return {
      total: TOTAL_STORAGE_MB,
      used: parseFloat(totalUsed.toFixed(2)),
      percentUsed: parseFloat(((totalUsed / TOTAL_STORAGE_MB) * 100).toFixed(2)),
      fileTypes: fileTypeData,
      monthly,
    };
  }, [stats]);

  // const storageData = [
  //   { name: 'Jan', used: Math.max(0, percetage - 30), available: Math.min(100, 130 - percetage) },
  //   { name: 'Feb', used: Math.max(0, percetage - 25), available: Math.min(100, 125 - percetage) },
  //   { name: 'Mar', used: Math.max(0, percetage - 20), available: Math.min(100, 120 - percetage) },
  //   { name: 'Apr', used: Math.max(0, percetage - 15), available: Math.min(100, 115 - percetage) },
  //   { name: 'May', used: Math.max(0, percetage - 10), available: Math.min(100, 110 - percetage) },
  //   { name: 'Jun', used: Math.max(0, percetage - 5), available: Math.min(100, 105 - percetage) },
  //   { name: 'Jul', used: percetage, available: 100 - percetage },
  // ];

  // const storageData = generateCumulativeStorageData(stats)
  // File type distribution
  const fileTypeData = [
    { name: 'Images', count: fileTypeLength(stats, 'image'), icon: Image, color: '#8b5cf6' },
    { name: 'Videos', count: fileTypeLength(stats, 'video'), icon: Video, color: '#3b82f6' },
    { name: 'Documents', count: fileTypeLength(stats, 'application'), icon: FileText, color: '#f59e0b' },
    { name: 'Audio', count: fileTypeLength(stats, 'audio'), icon: Music, color: '#ec4899' },
  ].filter(item => item.count > 0);

  // Storage by file type
  const storageByType = getStorageByFileType(stats);

  // Activity data
  const weeklyActivity = getWeeklyActivity(latestFiles);
  const monthlyActivity = groupFilesByMonth(stats);
  const yearlyActivity = groupFilesByYear(stats);

  // Recent activity
  const recentActivity = getRecentActivity(latestFiles);

  // Colors for charts
  const COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b', '#ec4899', '#10b981', '#f97316'];

  if (statsLoading || latestLoading) {
    return (
      <DashboardLayout title="Analytics">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="lg:col-span-2 h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Files</p>
                  <p className="text-2xl font-bold">{stats?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize( totalSize)} Used
                  </p>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold">{percetage}%</p>
                  <p className="text-xs text-muted-foreground">
                    of 512 MB
                  </p>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-full">
                  <HardDrive className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">
                    {weeklyActivity.reduce((acc, day) => acc + day.uploads, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">files uploaded</p>
                </div>
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                  <p className="text-2xl font-bold">
                    {stats?.filter(file => file.isFavorite).length || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">starred files</p>
                </div>
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-full">
                  <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
            {/* <CardHeader>
              <CardTitle>Storage Usage Over Time</CardTitle>
              <CardDescription>
                Monitor your storage utilization trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                    <Legend />
                    <Bar dataKey="used" name="Used Storage" stackId="a" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="available" name="Available Storage" stackId="a" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent> */}

             <div className="grid gap-6 md:grid-cols-2">
      {/* <Card className="rounded-2xl p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Live Storage Usage</h2>
          <p className="mb-1 text-muted-foreground">
            Used: <strong>{usageData.used} MB</strong> / {usageData.total} MB
          </p>
          <Progress value={usageData.percentUsed} className="h-2" />
          <p className="text-sm mt-2">Usage: {usageData.percentUsed}%</p>
        </CardContent>
      </Card> */}

      {/* <Card className="rounded-2xl p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Usage by File Type</h2>
          <ul className="space-y-2">
            {usageData.fileTypes.map((file) => (
              <li key={file.type} className="flex justify-between">
                <span className="capitalize text-muted-foreground">{file.type}</span>
                <span className="font-medium">{file.size} MB</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card> */}

      <Card className="md:col-span-2 rounded-2xl p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Monthly Upload Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData.monthly}>
              <XAxis dataKey="month" fontSize={12} angle={-45} height={60} />
              <YAxis fontSize={12} unit=" MB" />
              <Tooltip formatter={(val: number) => `${val} MB`} />
              <Bar dataKey="size" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle>File Type Distribution</CardTitle>
              <CardDescription>
                Breakdown by file type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fileTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {fileTypeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage by File Type */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle>Storage Usage by File Type</CardTitle>
            <CardDescription>
              See how much space each file type is using
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storageByType} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => formatBytes(value)} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip formatter={(value) => formatBytes(Number(value))} />
                  <Bar dataKey="size" name="Storage Used" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Tracking */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle>File Upload Activity</CardTitle>
            <CardDescription>
              Track your file upload patterns over time
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
                  <LineChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="uploads"
                      name="Uploads"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="monthly" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="uploads"
                      name="Monthly Uploads"
                      fill="hsl(var(--chart-5))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="yearly" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="uploads"
                      name="Yearly Uploads"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest file uploads and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                        {activity.fileType === 'image' && <Image className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                        {activity.fileType === 'video' && <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                        {activity.fileType === 'audio' && <Music className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                        {(activity.fileType === 'application' || activity.fileType === 'document') && <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.action} • {formatBytes(activity.fileSize)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {activity.fileType}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {dateFormat(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity to display</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
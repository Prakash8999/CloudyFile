import DashboardLayout from '@/layouts/DashboardLayout';
import UploadSection from '@/components/dashboard/UploadSection';
import FoldersSection from '@/components/dashboard/FoldersSection';
import LatestSection from '@/components/dashboard/LatestSection';

export default function Dashboard() {
  return (
    <DashboardLayout title="Home">
      <div className="space-y-6">
        <UploadSection />
        <FoldersSection />
        <LatestSection />
      </div>
    </DashboardLayout>
  );
}
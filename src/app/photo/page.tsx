import PhotoGrid from '@/components/photo/PhotoGrid';

export const metadata = {
  title: 'Photos | Kindred',
  description: 'Kindred的摄影作品集',
};

export default async function PhotoPage() {
  return (
      <div className="w-full py-2">
        <div className="text-center py-12">
          <p className="text-muted-foreground">暂无照片</p>
        </div>
      </div>
  );
}

import Layout from '@/components/layout/Layout';
import PhotoGrid from '@/components/photo/PhotoGrid';
import { getAllPhotos } from '@/lib/db/photos';
import { withAuthenticatedClient } from '@/lib/db/helpers';

export const metadata = {
  title: 'Photos | Kindred',
  description: 'Kindred的摄影作品集',
};

export default async function PhotoPage() {
  // 使用辅助函数获取所有照片
  const photos = await withAuthenticatedClient(client => getAllPhotos(client));

  return (
    <Layout>
      <div className="w-full py-2">
        {photos.length > 0 ? (
          <PhotoGrid photos={photos} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无照片</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

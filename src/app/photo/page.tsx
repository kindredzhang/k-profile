import Layout from '@/components/layout/Layout';
import PhotoGrid from '@/components/photo/PhotoGrid';
import { getAllPhotos } from '@/lib/db/photos';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Photos | Kindred',
  description: 'Kindred的摄影作品集',
};

export default async function PhotoPage() {
  // 创建 Supabase 客户端
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  // 获取所有照片，传递 Supabase 客户端
  const photos = await getAllPhotos(supabase);

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



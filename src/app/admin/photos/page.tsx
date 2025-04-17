'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { isLoggedIn } from '@/lib/auth-client';
import { Photo } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PhotosManagePage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    // 检查用户是否已登录
    if (!isLoggedIn()) {
      router.push('/admin/login');
      return;
    }

    // 获取照片列表
    fetchPhotos();
  }, [router]);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/admin/photos');

      if (!response.ok) {
        throw new Error('获取照片失败');
      }

      const data = await response.json();
      setPhotos(data.photos);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError('获取照片失败，请刷新页面重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这张照片吗？此操作不可撤销。')) {
      return;
    }

    setDeleteLoading(id);

    try {
      const response = await fetch(`/api/admin/photos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除照片失败');
      }

      // 删除成功，更新照片列表
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (err) {
      console.error('Error deleting photo:', err);
      alert('删除照片失败，请重试');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/photos/edit/${id}`);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex justify-center items-center min-h-[50vh]">
          <p>加载中...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">照片管理</h1>
          <Button onClick={() => router.push('/admin/photos/upload')}>
            上传新照片
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {photos.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground mb-4">暂无照片</p>
            <Button onClick={() => router.push('/admin/photos/upload')}>
              上传第一张照片
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={photo.url}
                    alt={photo.title || '照片'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  {photo.is_featured && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      精选
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-medium mb-1">{photo.title || '无标题'}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {photo.description || '无描述'}
                  </p>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(photo.id)}
                    >
                      编辑
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(photo.id)}
                      disabled={deleteLoading === photo.id}
                    >
                      {deleteLoading === photo.id ? '删除中...' : '删除'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

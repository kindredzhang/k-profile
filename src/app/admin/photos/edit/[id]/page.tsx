'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { isLoggedIn } from '@/lib/auth-client';
import { Photo } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PhotoEditPage() {
  const router = useRouter();
  const params = useParams();
  const photoId = params.id as string;

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 检查用户是否已登录
    if (!isLoggedIn()) {
      router.push('/admin/login');
      return;
    }

    // 获取照片详情
    fetchPhoto();
  }, [photoId, router]);

  const fetchPhoto = async () => {
    try {
      const response = await fetch(`/api/admin/photos/${photoId}`);

      if (!response.ok) {
        throw new Error('获取照片失败');
      }

      const data = await response.json();
      const photo = data.photo as Photo;

      setPhoto(photo);
      setTitle(photo.title || '');
      setDescription(photo.description || '');
      setUrl(photo.url);
      setCategory(photo.category || '');
      setTags(photo.tags ? photo.tags.join(', ') : '');
      setIsFeatured(photo.is_featured || false);
    } catch (err) {
      console.error('Error fetching photo:', err);
      setError('获取照片失败，请返回重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      // 将标签字符串转换为数组
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const response = await fetch(`/api/admin/photos/${photoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || null,
          description: description || null,
          url,
          category: category || null,
          tags: tagsArray.length > 0 ? tagsArray : null,
          is_featured: isFeatured,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '更新照片失败');
      }

      // 更新成功，跳转到照片管理页面
      router.push('/admin/photos');
    } catch (err) {
      console.error('Error updating photo:', err);
      setError(err instanceof Error ? err.message : '更新照片失败，请重试');
      setSaving(false);
    }
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

  if (error && !photo) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
          <Button onClick={() => router.push('/admin/photos')}>
            返回照片管理
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">编辑照片</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-foreground mb-1">
                  图片URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                  标题
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="照片标题"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                  描述
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="照片描述"
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
                  分类
                </label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="照片分类"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-1">
                  标签
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="标签1, 标签2, 标签3"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  多个标签请用逗号分隔
                </p>
              </div>

              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-foreground">
                  设为精选照片
                </label>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={saving}
                >
                  {saving ? '保存中...' : '保存修改'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/photos')}
                >
                  取消
                </Button>
              </div>
            </form>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-2">图片预览</p>
            <div className="border border-border rounded-lg overflow-hidden bg-card aspect-square flex items-center justify-center">
              <img
                src={url}
                alt={title || '照片'}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

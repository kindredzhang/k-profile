'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { isLoggedIn } from '@/lib/auth-client';
import { uploadImage } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function PhotoUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // 检查用户是否已登录
    if (!isLoggedIn()) {
      router.push('/admin/login');
    }
  }, [router]);

  // 处理文件选择
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setSelectedFile(file);

    // 创建本地预览URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // 清除URL输入框
    setUrl('');

    return () => URL.revokeObjectURL(objectUrl);
  };

  // 处理URL输入
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    // 如果输入了URL，清除已选择的文件
    if (newUrl) {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }

    // 更新预览
    if (newUrl) {
      setPreview(newUrl);
    } else if (!selectedFile) {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setUploadProgress(0);

    try {
      let finalUrl = url;

      // 如果选择了文件，先上传到Supabase Storage
      if (selectedFile && !url) {
        setUploadProgress(10);
        finalUrl = await uploadImage(selectedFile) || '';
        setUploadProgress(70);

        if (!finalUrl) {
          throw new Error('图片上传失败');
        }
      }

      // 验证URL
      if (!finalUrl) {
        setError('请上传图片或输入图片URL');
        setLoading(false);
        return;
      }

      // 将标签字符串转换为数组
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      setUploadProgress(80);

      // 保存照片信息到数据库
      const response = await fetch('/api/admin/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || null,
          description: description || null,
          url: finalUrl,
          category: category || null,
          tags: tagsArray.length > 0 ? tagsArray : null,
          is_featured: isFeatured,
        }),
      });

      setUploadProgress(100);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '保存照片信息失败');
      }

      // 上传成功，跳转到照片管理页面
      router.push('/admin/photos');
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError(err instanceof Error ? err.message : '上传照片失败，请重试');
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">上传新照片</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-foreground mb-1">
                  上传图片
                </label>
                <input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  支持JPG、PNG、GIF等常见图片格式
                </p>
              </div>

              <div className="relative">
                <label htmlFor="url" className="block text-sm font-medium text-foreground mb-1">
                  或输入图片URL
                </label>
                <input
                  id="url"
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  disabled={!!selectedFile}
                />
                {selectedFile && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                        setPreview(url || null);
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      清除选择
                    </button>
                  </div>
                )}
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

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {uploadProgress}%
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading || (!url && !selectedFile)}
                >
                  {loading ? '上传中...' : '上传照片'}
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
              {preview ? (
                <img
                  src={preview}
                  alt="预览"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <p className="text-muted-foreground">上传图片或输入URL后显示预览</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

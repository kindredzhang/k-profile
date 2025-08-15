'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

interface PhotoItemProps {
  url: string;
  index: number;
  onClick: () => void;
}

function PhotoItem({ url, index, onClick }: PhotoItemProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div 
      className="aspect-square cursor-pointer relative overflow-hidden bg-gray-100 dark:bg-gray-800"
      onClick={onClick}
    >
      {/* 加载占位符 */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* 错误占位符 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <span className="text-sm">Failed to load</span>
        </div>
      )}

      <Image
        src={url}
        alt={`Photo ${index + 1}`}
        width={400}
        height={400}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => {
          setLoaded(true);
        }}
        onError={(e) => {
          setError(true);
          setLoaded(true);
        }}
      />
    </div>
  );
}

export default function PhotoGrid() {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoBaseUrl = process.env.NEXT_PUBLIC_PHOTO_BASE_URL;
        
        if (!photoBaseUrl) {
          throw new Error('NEXT_PUBLIC_PHOTO_BASE_URL not configured');
        }
        
        // Fetch photo list
        const response = await fetch(photoBaseUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Parse HTML to extract image filenames
        const linkPattern = /<a href="([^"]+)">/g;
        const matches = [];
        let match;
        
        while ((match = linkPattern.exec(html)) !== null) {
          const filename = match[1];
          // Skip parent directory link
          if (filename !== '../') {
            matches.push(filename);
          }
        }
        
        // Filter for supported image formats and create full URLs
        const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif', '.bmp', '.tiff'];
        const photoUrls = matches
          .filter(filename => {
            const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
            return supportedExtensions.includes(ext);
          })
          .map(filename => `${photoBaseUrl}${filename}`);
        
        setPhotoUrls(photoUrls);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setPhotoUrls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = useCallback((url: string) => {
    setSelectedPhoto(url);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading photos...</p>
      </div>
    );
  }

  if (photoUrls.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No photos found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 w-full">
        {photoUrls.map((url, index) => (
          <PhotoItem
            key={`${url}-${index}`}
            url={url}
            index={index}
            onClick={() => handlePhotoClick(url)}
          />
        ))}
      </div>

      {/* 全屏查看模态框 */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src={selectedPhoto}
              alt="Full size photo"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              priority
            />
            <button 
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-colors"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

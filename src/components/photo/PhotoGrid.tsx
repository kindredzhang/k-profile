'use client';

import { Photo } from '@/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [mounted, setMounted] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setVisiblePhotos(prev => prev.includes(index) ? prev : [...prev, index]);
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });

    photoRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="max-w-[1600px] mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={(el: HTMLDivElement | null) => {
                photoRefs.current[index] = el;
              }}
              data-index={index}
              className={`relative aspect-square overflow-hidden bg-black transition-all duration-500 ${visiblePhotos.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Image
                src={photo.url}
                alt={photo.title || '照片'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 全屏照片查看器 */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in-0 duration-200 ease-out"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-[95vw] max-h-[95vh] overflow-hidden animate-in zoom-in-90 duration-300 ease-out"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <Image
              src={selectedPhoto.url}
              alt={selectedPhoto.title || '照片'}
              width={1920}
              height={1080}
              className="object-contain max-h-[95vh]"
              style={{ width: 'auto', height: 'auto' }}
            />
            
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

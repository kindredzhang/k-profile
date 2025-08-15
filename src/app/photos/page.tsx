import PhotoGrid from '@/components/photos/PhotoGrid';

export const metadata = {
  title: 'Photos | Kindred',
  description: 'Kindred的摄影作品集',
};

export default function PhotoPage() {
  return (
    <div className="w-full">
      <PhotoGrid />
    </div>
  );
}

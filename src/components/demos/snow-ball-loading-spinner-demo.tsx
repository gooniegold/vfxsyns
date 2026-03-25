import LoadingSpinner from '@/components/ui/snow-ball-loading-spinner';

export default function Default() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center bg-[var(--bg-base)]">
        <LoadingSpinner />
    </div>
  );
}

'use client';

import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import { Song } from '@/types';

type SearchContentProps = {
  songs: Song[];
};

export default function SearchContent({ songs }: SearchContentProps) {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col px-6 gap-y-2 w-ful text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-6 gap-y-2">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center w-full gap-x-4">
          <div className="flex-1">
            <MediaItem onClick={() => {}} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}

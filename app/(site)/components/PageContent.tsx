'use client';

import UseOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types';
import SongItem from '../../../components/SongItem';

type PageContentProps = {
  songs: Array<Song>;
};

export default function PageContent({ songs }: PageContentProps) {
  const onPlay = UseOnPlay(songs);

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={(id: string) => {
            onPlay(id);
          }}
          data={item}
        />
      ))}
    </div>
  );
}

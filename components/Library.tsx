'use client';
import useAuthModal from '@/hooks/useAuthModal';
import UseOnPlay from '@/hooks/useOnPlay';
import useUploadModal from '@/hooks/useUploadModal';
import useUser from '@/hooks/useUser';
import { Song } from '@/types';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';
import MediaItem from './MediaItem';

type LibraryProps = { songs: Song[] };

export default function Library({ songs }: LibraryProps) {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = UseOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // TODO: check for subscription

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="font-medium text-neutral-400 text-md">Your Library</p>
        </div>

        <button onClick={onClick}>
          <AiOutlinePlus
            size={20}
            className="transition cursor-pointer text-neutral-400 hover:text-white"
          />
        </button>
      </div>
      <div className="flex flex-col px-3 mt-4 gap-y-2">
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => {
              onPlay(id);
            }}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}

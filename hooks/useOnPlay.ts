import { Song } from '@/types';
import useAuthModal from './useAuthModal';
import usePlayer from './usePlayer';
import useUser from './useUser';

export default function UseOnPlay(songs: Song[]) {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
}

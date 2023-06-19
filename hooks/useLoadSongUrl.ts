import { Song } from '@/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function useLoadSongUrl(song: Song) {
  const supabaseClient = useSupabaseClient();
  // we could also import useSessionContext() and destructure supabaseClient from there, in case we also needed some data from current user.

  if (!song) {
    return '';
  }

  const { data: songData } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
}

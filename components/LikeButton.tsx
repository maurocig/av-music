'use client';

import useAuthModal from '@/hooks/useAuthModal';
import useUser from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type LikeButtonProps = {
  songId: string;
};

export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const LikeIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);

      error
        ? toast.error(error.message)
        : (setIsLiked(false), toast.success('Removed from favourites.'));
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ song_id: songId, user_id: user.id });

      error
        ? toast.error(error.message)
        : (setIsLiked(true), toast.success('Added to favourites.'));
    }

    router.refresh();
  };

  return (
    <button className="transition hover:opacity-75" onClick={handleLike}>
      <LikeIcon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
}

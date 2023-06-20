'use client';
import usePlayer from '@/hooks/usePlayer';
import { Song } from '@/types';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import Box from './Box';
import Library from './Library';
import SidebarItem from './SidebarItem';

type SidebarProps = {
  children: React.ReactNode;
  songs: Song[];
};

export default function Sidebar({ children, songs }: SidebarProps) {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname]
  );

  return (
    <div className={twMerge('flex h-full', player.activeId && 'h-[calc(100%-80px)]')}>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col px-5 py-4 gap-y-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="flex-1 h-full py-2 overflow-y-auto md:pr-2">{children}</main>
    </div>
  );
}

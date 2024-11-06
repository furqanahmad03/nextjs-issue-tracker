'use client';

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { FaBug } from "react-icons/fa";
import { Spinner } from './components';
import { ThemeContext } from './components/DarkModeContext';
import DarkModeTrigger from './components/DarkModeTrigger';

const Navbar = () => {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'><FaBug /></Link>
            <NavLinks />
          </Flex>
          <Flex>
            <DarkModeTrigger />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  )
}


const NavLinks = () => {
  const currentPath = usePathname();

  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ]
  return (
    <ul className='flex space-x-6'>
      {links.map(link =>
        <li key={link.href}><Link href={link.href} className={classnames('transition-colors', {
          'text-zinc-900 hover:text-zinc-800': link.href === currentPath && theme === 'light',
          'text-zinc-400 hover:text-zinc-800': link.href !== currentPath && theme === 'light',
          'text-slate-50 hover:text-slate-100': link.href === currentPath && theme === 'dark',
          'text-zinc-500 hover:text-slate-100': link.href !== currentPath && theme === 'dark',
        })}>{link.label}</Link></li>)}
    </ul>
  )
}


const AuthStatus = () => {
  const { status, data: session } = useSession();

  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  if (status === 'loading')
    return <Box className='bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg'>Loading... <Spinner /></Box>
  else if (status === 'unauthenticated')
    return <Link href='/api/auth/signin' className='bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg'>Login</Link>
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback='?'
            size='2'
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={classnames({
          '!bg-gray-700 !text-white': theme === 'dark'
        })}>
          <DropdownMenu.Label>
            <Text className={classnames({
              '!bg-gray-700 !text-slate-300': theme === 'dark'
            })} size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <Link href='/api/auth/signout'>
            <DropdownMenu.Item>Log Out</DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default Navbar
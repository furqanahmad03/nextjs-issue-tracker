'use client';

import { Skeleton } from '@/app/components';
import { ThemeContext } from '@/app/components/DarkModeContext';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import classnames from 'classnames';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  const { data: users, error, isLoading } = useUsers();
  if (isLoading)
    return <Skeleton height='2rem' />
  if (error)
    return null;

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, { assignedToUserId: userId || null }).then(() => toast.success('Updated Successfully'))
      .catch(() => toast.error('Changes could not be saved'));
  }

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || ''} onValueChange={assignIssue}>
        <Select.Trigger />
        <Select.Content className={classnames({
          '!bg-gray-700 !text-white': theme === 'dark'
        })}>
          <Select.Group>
            <Select.Item value=''>Unassigned</Select.Item>
            {users?.map((user) => (<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then(res => res.data),
  staleTime: 60 * 1000,
  retry: 3
})

export default AssigneeSelect
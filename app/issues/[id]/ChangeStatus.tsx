'use client';

import { ThemeContext } from '@/app/components/DarkModeContext';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ChangeStatus = ({ issue }: { issue: Issue }) => {
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};
  const router = useRouter();

  const statuses: {label: string, value: Status}[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ]

  const assignStatus = (status: Status) => {
    axios
      .patch('/api/issues/' + issue.id, { status: status }).then(() => toast.success('Status Updated Successfully'))
      .then(() => router.refresh())
      .catch(() => toast.error('Changes could not be saved'))
  }

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={assignStatus}>
        <Select.Trigger />
        <Select.Content className={classnames({
          '!bg-gray-700 !text-white': theme === 'dark'
        })}>
          <Select.Group>
            {statuses?.map((status) => (<Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default ChangeStatus
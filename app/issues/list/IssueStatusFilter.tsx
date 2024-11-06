'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext } from 'react'
import classnames from 'classnames';
import { ThemeContext } from '@/app/components/DarkModeContext';

const statuses: { label: string, value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  return (
    <Select.Root defaultValue={searchParams.get('status') || ''} onValueChange={(status) => {
      const params = new URLSearchParams();
      if(status)
        params.append('status', status);
      if(searchParams.get('orderBy'))
        params.append('orderBy', searchParams.get('orderBy')!);

      const query = params.size ? '?' + params.toString() : '';
      router.push('/issues/list' + query);
    }}>
      <Select.Trigger />
      <Select.Content className={classnames({
          '!bg-gray-700 !text-white': theme === 'dark'
        })}>
        {statuses.map((status => (
          <Select.Item key={status.value} value={status.value || ''}>{status.label}</Select.Item>
        )))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
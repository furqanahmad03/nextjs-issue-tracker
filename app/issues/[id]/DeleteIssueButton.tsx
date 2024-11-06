'use client';

import { Spinner } from '@/app/components';
import { ThemeContext } from '@/app/components/DarkModeContext';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            <TrashIcon />
            {!isDeleting ? 'Delete Issue' : 'Deleting...'}
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content  className={classnames({
          '!bg-gray-700 !text-white': theme === 'dark'
        })}>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt='4' gap='3'>
            <AlertDialog.Cancel>
              <Button variant={theme === 'light' ? 'soft' : 'solid'} color='gray'>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={handleDelete}>Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content className={classnames({
          '!bg-gray-700 !text-white': theme === 'dark'
        })}>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This error could not be delted</AlertDialog.Description>
          <Button color='gray' mt='2' variant='soft' onClick={() => setError(false)}>OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>

  )
}

export default DeleteIssueButton
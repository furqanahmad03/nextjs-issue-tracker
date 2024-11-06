import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='2rem' className='mb-2' />
      <Skeleton height='23rem' />
      <Skeleton className='!w-32 h-8 mt-11' />
    </Box>
  )
}

export default IssueFormSkeleton
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const badgeMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: {status: Status}) => {
  return (
    <Badge color={badgeMap[status].color}>{badgeMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
import dayjs from 'dayjs'
import { AuditLog } from '@prisma/client'

import { generateLogMessage } from '@/lib/generate-log-message'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface ActivityItemProps {
  data: AuditLog
}

export function ActivityItem({ data }: ActivityItemProps) {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm font-medium text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{' '}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs font-medium text-muted-foreground">
          {dayjs(data.createdAt).format('DD[ de ]MMMM, YYYY[ - ]HH:mm')}
        </p>
      </div>
    </li>
  )
}

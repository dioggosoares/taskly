import { ACTION, AuditLog } from '@prisma/client'

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log

  let entity = ''

  switch (entityType) {
    case 'CARD':
      entity = 'Cartão'
      break
    case 'BOARD':
      entity = 'Quadro'
      break
    case 'LIST':
      entity = 'Lista'
      break
  }

  switch (action) {
    case ACTION.CREATE:
      return `criou o ${entity.toLowerCase()} "${entityTitle}"`
    case ACTION.UPDATE:
      return `atualizou ${entity.toLowerCase()} "${entityTitle}"`
    case ACTION.DELETE:
      return `deletou ${entity.toLowerCase()} "${entityTitle}"`
    default:
      return `ação desconhecida ${entity.toLowerCase()} "${entityTitle}"`
  }
}

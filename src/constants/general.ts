export enum STORAGE_KEYS {
  // AUTH KEYS
  EXPANDED_ACCORDION_SIDEBAR = '@TASKLY:sidebar-state',
  EXPANDED_ACCORDION_MOBILE_SIDEBAR = '@TASKLY:mobile-sidebar-state',
}

export enum FEEDBACK_MESSAGES {
  // FEEDBACK KEYS
  UNAUTHORIZED = 'Não autorizado!',
  ERROR_500 = 'Internal Server Error',
  BOARD_CREATED = 'Quadro criado!',
  COVER_UPDATED = 'Capa atualizada!',
  ERROR_CREATED_BOARD = 'Falha ao CRIAR quadro.',
  ERROR_CREATED_LIST = 'Falha ao CRIAR lista.',
  ERROR_CREATED_CARD = 'Falha ao CRIAR cartão.',
  ERROR_UPDATED_COVER = 'Falha ao ATUALIZAR capa',
  ERROR_COPY_LIST = 'Falha ao COPIAR lista.',
  ERROR_COPY_CARD = 'Falha ao COPIAR cartão.',
  ERROR_UPDATED_BOARD = 'Falha ao ATUALIZAR quadro.',
  ERROR_UPDATED_LIST = 'Falha ao ATUALIZAR lista.',
  ERROR_UPDATED_CARD = 'Falha ao ATUALIZAR cartão.',
  ERROR_DELETE_BOARD = 'Falha ao DELETAR quadro.',
  ERROR_DELETE_LIST = 'Falha ao DELETAR lista.',
  ERROR_DELETE_CARD = 'Falha ao DELETAR cartão.',
  ERROR_REORDER_LIST = 'Falha ao REORDENAR lista.',
  ERROR_REORDER_CARD = 'Falha ao REORDENAR cartão.',
  NOT_FOUND_BOARD = 'Quadro não encontrado.',
  NOT_FOUND_LIST = 'Lista não encontrada.',
  NOT_FOUND_CARD = 'Cartão não encontrada.',
  MISSING_FIELDS_CREATED_BOARD = 'Estão faltando campos. Falha ao CRIAR quadro.',
  FAILED_OBTAINING_IMAGES = 'Falha ao obter imagens.',
  TITLE_REQUIRED = 'O título é obrigatório.',
  TITLE_SHORT = 'O título é muito curto.',
  DESCRIPTION_REQUIRED = 'Descrição é obrigatória.',
  DESCRIPTION_SHORT = 'A descrição é muito curta.',
}

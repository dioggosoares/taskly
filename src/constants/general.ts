export enum STORAGE_KEYS {
  // AUTH KEYS
  EXPANDED_ACCORDION_SIDEBAR = '@TASKLY:sidebar-state',
  EXPANDED_ACCORDION_MOBILE_SIDEBAR = '@TASKLY:mobile-sidebar-state',
}

export enum FEEDBACK_MESSAGES {
  // FEEDBACK KEYS
  UNAUTHORIZED = 'Não autorizado.',
  BOARD_CREATED = 'Quadro criado!',
  COVER_UPDATED = 'Capa atualizada!',
  ERROR_CREATED_BOARD = 'Falha ao CRIAR o quadro.',
  ERROR_CREATED_LIST = 'Falha ao CRIAR a lista.',
  ERROR_CREATED_CARD = 'Falha ao CRIAR a cartão.',
  ERROR_UPDATED_COVER = 'Falha ao ATUALIZAR a capa',
  ERROR_COPY_LIST = 'Falha ao COPIAR a lista.',
  ERROR_UPDATED_BOARD = 'Falha ao ATUALIZAR o quadro.',
  ERROR_UPDATED_LIST = 'Falha ao ATUALIZAR a lista.',
  ERROR_DELETE_BOARD = 'Falha ao DELETAR o quadro.',
  ERROR_DELETE_LIST = 'Falha ao DELETAR a lista.',
  NOT_FOUND_BOARD = 'Quadro não encontrado.',
  NOT_FOUND_LIST = 'Lista não encontrada.',
  NOT_FOUND_CARD = 'Cartão não encontrada.',
  MISSING_FIELDS_CREATED_BOARD = 'Estão faltando campos. Falha ao CRIAR quadro.',
  FAILED_OBTAINING_IMAGES = 'Falha ao obter imagens.',
  TITLE_REQUIRED = 'O título é obrigatório.',
  TITLE_SHORT = 'O título é muito curto.',
}

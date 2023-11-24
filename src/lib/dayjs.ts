import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

dayjs.locale('pt-br')
dayjs.updateLocale('pt-br', {
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  relativeTime: {
    future: 'em %s',
    past: '%s atrás',
    s: 'alguns segundos atrás',
    m: '1 minuto',
    mm: '%d minutos atrás',
    h: '1 hora',
    hh: '%d horas atrás',
    d: '1 dia',
    dd: '%d dias atrás',
    M: '1 mês',
    MM: '%d meses atrás',
    y: '1 ano',
    yy: '%d anos atrás',
  },
})

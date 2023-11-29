import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectViewFilter() {
  return (
    <Select>
      <SelectTrigger className="w-[12rem]">
        <SelectValue placeholder="Selecione um filtro" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filtrar por</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="favorit">Favoritos</SelectItem>
          <SelectItem value="public">Públicos</SelectItem>
          <SelectItem value="private">Privados</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

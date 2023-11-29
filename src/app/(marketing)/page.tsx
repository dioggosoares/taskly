import { Medal } from 'lucide-react'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
})

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function Marketing() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          'flex flex-col items-center justify-center',
          headingFont.className,
        )}
      >
        <div
          className="mb-4 flex items-center rounded-full border bg-sand-200 p-4
          uppercase text-amber-700 shadow-sm"
        >
          <Medal className="mr-2 h-6 w-6" />
          Gerenciador de tarefa Nº 1
        </div>
        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          Taskrise é organização e conexão.
        </h1>
        <div
          className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600
          to-pink-600 px-4 pb-4 pt-5 text-3xl text-white md:text-6xl"
        >
          + Eficiência.
        </div>
      </div>
      <div
        className={cn(
          `mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400
        md:max-w-2xl md:text-xl`,
          textFont.className,
        )}
      >
        Colabore, gerencie projetos e alcance novos picos de produtividade. Dos
        escritórios ao home office, a forma como sua equipe trabalha é única -
        realize tudo com Taskrise.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Obter Taskrise gratuitamente</Link>
      </Button>
    </div>
  )
}

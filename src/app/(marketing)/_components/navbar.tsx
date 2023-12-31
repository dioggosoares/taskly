import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function NavBar() {
  return (
    <nav
      className="fixed top-0 flex h-14 w-full items-center border-b bg-white
      px-4 shadow-sm"
    >
      <div
        className="mx-auto flex w-full items-center justify-between
        md:max-w-screen-2xl"
      >
        <div className="flex items-center gap-x-4">
          <Logo />
          <div className="hidden rounded-sm bg-pink-100 px-2 py-1 md:flex">
            <span className="text-xs font-semibold text-pink-600">Beta</span>
          </div>
        </div>

        <div
          className="flex w-full items-center justify-between space-x-4 md:block
          md:w-auto"
        >
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Obter Taskrise gratuitamente</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

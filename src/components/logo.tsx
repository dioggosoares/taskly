import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image
          src="/logo.png"
          alt="logo"
          width={80}
          height={45}
          className="w-24"
          priority
        />
      </div>
    </Link>
  )
}

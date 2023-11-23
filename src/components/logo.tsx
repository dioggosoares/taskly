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
          height={35}
          className="w-20"
        />
      </div>
    </Link>
  )
}

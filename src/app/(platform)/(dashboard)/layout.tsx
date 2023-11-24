import { NavBar } from './_components/navbar'

export default function DashboarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full bg-purple-300/10">
      <NavBar />
      {children}
    </div>
  )
}

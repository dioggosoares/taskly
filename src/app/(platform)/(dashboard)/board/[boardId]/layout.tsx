import { BoardSidebar } from './_components/board-sidebar'

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto h-full bg-purple-300/10">
      <main className="relative mx-auto h-full pt-14">
        <div className="flex">
          <div className="hidden w-96 shrink-0 md:block">
            <BoardSidebar />
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

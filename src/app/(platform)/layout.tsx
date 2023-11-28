import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'
import { Toaster } from 'sonner'
import { ModalProvider } from '@/components/providers/modal-provider'
import { QueryProvider } from '@/components/providers/query-provider'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <QueryProvider>
        <Toaster position="bottom-center" />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}

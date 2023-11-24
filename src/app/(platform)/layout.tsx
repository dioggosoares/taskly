import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'
import { Toaster } from 'sonner'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <Toaster position="bottom-center" richColors />
      {children}
    </ClerkProvider>
  )
}

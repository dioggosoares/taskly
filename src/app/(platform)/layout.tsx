import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        elements: {
          socialButtonsIconButton: `focus:border-zinc-200 focus-visible:outline-none focus-visible:ring-2`,
          socialButtonsIconButton__apple: `focus-visible:ring-zinc-800 focus-visible:ring-ring focus-visible:ring-offset-2`,
          socialButtonsIconButton__facebook: `focus-visible:ring-[#1977F3] focus-visible:ring-ring focus-visible:ring-offset-2`,
          socialButtonsIconButton__google: `focus-visible:ring-[#EA4335] focus-visible:ring-ring focus-visible:ring-offset-2`,
          socialButtonsIconButton__microsoft: `focus-visible:ring-[#81BC06] focus-visible:ring-ring focus-visible:ring-offset-2`,
          formFieldInput__identifier__error:
            'border-red-500 hover:border-red-500 transition-colors duration-150 ease-linear focus:border-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-ring focus-visible:ring-offset-2',
          formButtonPrimary:
            'bg-green-500 hover:bg-green-600 text-sm normal-case transition-colors duration-150 ease-linear focus:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          card: 'shadow-2xl bg-white rounded-md',
          formFieldInput:
            'rounded-md border border-gray-100 hover:border-green-500 transition-colors duration-150 ease-linear focus:border-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        },
        layout: {
          showOptionalFields: true,
          socialButtonsPlacement: 'top',
          socialButtonsVariant: 'auto',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

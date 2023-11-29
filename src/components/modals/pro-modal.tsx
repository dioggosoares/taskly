'use client'

import Image from 'next/image'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useProModal } from '@/hooks/useProModal'
import { useAction } from '@/hooks/useAction'
import { stripeRedirect } from '@/actions/stripe-redirect'

export const ProModal = () => {
  const proModal = useProModal()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onClick = () => {
    execute({})
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Atualize para o Taskrise Pro hoje!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore o melhor do Taskrise
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Quadros ilimitados.</li>
              <li>Listas de verificação avançadas</li>
              <li>Recursos de administração e segurança</li>
              <li>E mais!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

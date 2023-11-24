'use client'

import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'

import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { defaultImages } from '@/constants/images'
import { FormErrors } from './form-errors'
import { toast } from 'sonner'
import { FEEDBACK_MESSAGES } from '@/constants/general'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus()

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['2013064', '9908255'],
          count: 9,
        })

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          toast.error(FEEDBACK_MESSAGES.FAILED_OBTAINING_IMAGES)
        }
      } catch (error) {
        console.log(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="relative flex flex-col gap-3">
      <h3 className="text-xs font-semibold text-neutral-700">
        Escolha o fundo
      </h3>
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            className={cn(
              `group relative aspect-video cursor-pointer overflow-hidden rounded-sm
              bg-muted transition hover:opacity-75`,
              pending && 'cursor-auto opacity-50 hover:opacity-50',
            )}
            onClick={() => {
              if (pending) return
              setSelectedImageId(image.id)
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              onChange={() => {}}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt="Imagem Unsplash"
              className="rounded-sm object-cover"
              fill
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/50">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-[.625rem] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </button>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  )
}

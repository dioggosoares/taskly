import { OrganizationProfile } from '@clerk/nextjs'

export default function Settings() {
  return (
    <div className="w-full md:w-[60%] lg:w-[70%]">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: 'none',
              width: '100%',
            },
            card: {
              border: '1px solid #e5e5e5',
              boxShadow: 'none',
              width: '100%',
            },
          },
        }}
      />
    </div>
  )
}

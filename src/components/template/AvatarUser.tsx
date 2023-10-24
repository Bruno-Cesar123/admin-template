import { useAuth } from '@/data/hook/useAuth'
import Image from 'next/image'
import Link from 'next/link'

interface AvatarUserProps {
  className?: string
}

export function AvatarUser(props: AvatarUserProps) {
  const { user } = useAuth()

  return (
    <Link href="/profile">
      <Image 
        src={user?.imageUrl ?? '/images/avatar.svg'} 
        alt="Avatar usuário" 
        className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`}
        width={10}
        height={10}
      />
    </Link>
  )
}
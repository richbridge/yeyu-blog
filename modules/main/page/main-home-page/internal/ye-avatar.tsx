import Image from 'next/image'
import avatar from '@/config/img/avatar.png'

const YeAvatar = () => {
  return (
    // 摸摸头~
    <figure className="relative cursor-grab">
      <Image
        src={avatar}
        alt="avatar"
        width={200}
        className="rounded-full"
        placeholder="blur"
      />
      <span className="absolute left-0 top-0 rounded-full w-full h-full ring-4 ring-blue-800 ring-offset-1 animate-ye-ping-one-dot-one" />
    </figure>
  )
}

export default YeAvatar

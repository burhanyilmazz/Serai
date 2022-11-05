import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => { 
  return (
    <Link href='/'>
      <Image src={'/images/logo/logo.svg'} width={'101'} height={'52'} alt={'Serai'} />
    </Link>
  )
}

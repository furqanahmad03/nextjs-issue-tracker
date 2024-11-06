import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'

const Link = ({href, children}: {href: string, children: string}) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
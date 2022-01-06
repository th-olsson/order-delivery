import NextLink from "next/link"
import { Link, Text } from "@chakra-ui/react"

interface NavLinkProps {
  href: string;
  text: string;
}

function NavLink({ href, text }: NavLinkProps) {
  return (
    <NextLink href={href}>
      <Link>
        <Text fontSize="2xl">
          {text}
        </Text>
      </Link>
    </NextLink>
  );
}

export default NavLink;
import NextLink from "next/link"
import { Link, Text } from "@chakra-ui/react"

interface NavLinkProps {
  href: string;
  text: string | undefined;
}

function NavLink({ href, text }: NavLinkProps) {
  return (
    <NextLink href={href} passHref>
      <Link>
        <Text fontSize="2xl">
          {text}
        </Text>
      </Link>
    </NextLink>
  );
}

export default NavLink;
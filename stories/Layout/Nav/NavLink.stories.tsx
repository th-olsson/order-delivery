import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavLink from "../../../components/layout/nav/NavLink";

export default {
  title: "Layout/Nav/NavLink",
  component: NavLink,
  args: {
    href: "",
    text: "Link"
  }
} as ComponentMeta<typeof NavLink>;

export const NavLinkStory: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />

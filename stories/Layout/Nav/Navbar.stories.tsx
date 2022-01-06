import { ComponentStory, ComponentMeta } from '@storybook/react';
import Navbar from '../../../components/layout/nav/Navbar';

export default {
  title: "Layout/Nav/Navbar",
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

export const NavbarStory: ComponentStory<typeof Navbar> = () => <Navbar />

import type { Meta, StoryObj } from '@storybook/react';
import { SigninButton } from '@stack86/ui/components/SigninButton';
import { ChevronRightIcon, Import } from 'lucide-react';

const meta: Meta<typeof SigninButton> = {
  title: 'Components/SigninButton',
  component: SigninButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
};
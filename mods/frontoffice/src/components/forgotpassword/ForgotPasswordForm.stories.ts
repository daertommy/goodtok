/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of Goodtok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

/**
 * Forgot Password Form component.
 */
const meta = {
  title: "FrontOffice/ForgotPasswordForm",
  component: ForgotPasswordForm,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    onSubmit: {
      name: "On Submit",
      description:
        "The callback to be called when the user clicks the submit button",
      action: "clicked"
    },
    onReturnToSignIn: {
      name: "On Return To Sign In",
      description:
        "The callback to be called when the user clicks the return to sign in button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a Forgot Password Form.
 */
export const FortgotPasswordFormExample: Story = {};

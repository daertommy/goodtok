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
import { QueueEntryStatus } from "@prisma/client";
import { updateQueueEntryStatusSchema } from "./validation";
import { z } from "zod";

export type QueueEntry = {
  customerId: string;
  registeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: QueueEntryStatus;
  workspaceId: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
    note: string;
  };
  aor: string;
};

export type GetQueueResponse = {
  queue: QueueEntry[];
};

export type UpdateQueueEntryStatusRequest = z.infer<
  typeof updateQueueEntryStatusSchema
>;

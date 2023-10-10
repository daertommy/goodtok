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
import { QueueEntry } from "./types";
import { observable } from "@trpc/server/observable";
import { watchNats } from "../nats";
import { getLogger } from "@fonoster/logger";
import { NATS_URL } from "../envs";
import { updateQueueEntry } from "./updateQueueEntry";
import { getCustomerById } from "../customers/getCustomerById";

const logger = getLogger({ service: "apiserver", filePath: __filename });
// List to keep track of all active observers
const observers: Array<(entry: QueueEntry) => void> = [];

export function watchQ(workspaceId: string) {
  logger.verbose("new observer added to watchQ", { workspaceId });

  return observable<QueueEntry>((emit) => {
    // Add the observer's next method to the list when a client subscribes
    observers.push(emit.next.bind(emit));

    // Remove the observer's next method when the client unsubscribes
    return () => {
      const index = observers.indexOf(emit.next.bind(emit));
      if (index !== -1) {
        observers.splice(index, 1);
      }
    };
  });
}

watchNats(NATS_URL, async (event) => {
  const { aor, extraHeaders } = event;
  logger.verbose("message from nats", { aor, extraHeaders });

  const customerId = extraHeaders["X-Customer-Id"];
  const workspaceId = extraHeaders["X-Workspace-Id"];

  logger.verbose("customerId and workspaceId", { customerId, workspaceId });

  const entry = await updateQueueEntry(customerId, aor, workspaceId);

  logger.verbose("entry updated", { entry });

  const customer = await getCustomerById(customerId);

  const entryWithCustomer = {
    ...entry,
    customer: {
      id: customer.id,
      name: customer.name,
      avatar: customer.avatar
    }
  };

  // Notify all observers
  observers.forEach((emit) => emit(entryWithCustomer));
});

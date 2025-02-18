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
import { connect } from "nats";
import { getLogger } from "@fonoster/logger";
import { RegisterEventCallback } from "./types";

const logger = getLogger({ service: "apiserver", filePath: __filename });

const REGISTER_SUBJECT = "routr.endpoint.registered";

/**
 * This method listens for registration events from Routr.
 *
 * @param {string} natsUrl - The NATS server URL
 * @param {RegisterEventCallback} callback - The callback function
 * @return {void}
 */
export function watchNats(natsUrl: string, callback: RegisterEventCallback) {
  (async () => {
    const nc = await connect({ servers: natsUrl });

    const subscription = nc.subscribe(REGISTER_SUBJECT);

    logger.verbose("connected to nats", { natsUrl });
    logger.verbose("subscribed to subject", { subject: REGISTER_SUBJECT });

    // eslint-disable-next-line no-loops/no-loops
    for await (const msg of subscription) {
      const messageStr = msg.data.toString();
      callback({ ...JSON.parse(messageStr) });
    }
  })();
}

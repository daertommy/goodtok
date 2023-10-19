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
import { Context } from "../context";
import { ConnectionObject, CreateTokenInput } from "./types";
import jwt from "jsonwebtoken";

export async function createToken(
  ctx: Context,
  input: CreateTokenInput
): Promise<ConnectionObject> {
  const claims = {
    ref: input.ref,
    customerId: input.customerId,
    domainRef: ctx.config.sipDomainRef,
    aor: input.aor,
    aorLink: input.aorLink,
    domain: ctx.config.sipDomain,
    privacy: ctx.config.sipUserAgentPrivacy,
    allowedMethods: input.methods,
    signalingServer: ctx.config.sipSignalingServer
  };

  const token = jwt.sign(
    claims,
    ctx.config.securityPrivateKey,
    ctx.config.jwtSignOptions
  );

  return {
    aor: input.aor,
    aorLink: input.aorLink,
    token,
    signalingServer: ctx.config.sipSignalingServer
  };
}

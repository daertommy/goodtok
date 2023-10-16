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
import { User } from "@goodtok/apiserver/src/users/types";

export type UsersClient = {
  getCurrentUser: () => Promise<User>;
  getUserById: (id: string) => Promise<User>;
  updateUser: (request: UpdateUserRequest) => Promise<UpdateUserResponse>;
};

export type UpdateUserRequest = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
};

export type UpdateUserResponse = {
  id: string;
};

export { User };

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
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

export const StyledTab = styled(Tab)({
  color: "#000000",
  fontFamily: "Poppins",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px",
  letterSpacing: "0.5px",

  textTransform: "none",
  "&.Mui-selected": {
    color: "#000000",
    fontWeight: 500,
    textTransform: "none"
  }
});

export const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "orange"
  }
});

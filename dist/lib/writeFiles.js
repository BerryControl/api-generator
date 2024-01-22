"use strict";
/*
   Copyright 2024 Thomas Bonk

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function dir(filepath) {
    return path_1.default.parse(filepath).dir;
}
function createDirectory(directory) {
    if (!fs_1.default.existsSync(directory)) {
        fs_1.default.mkdirSync(directory, { recursive: true });
    }
}
function saveFile(filepath, data) {
    fs_1.default.writeFileSync(filepath, data);
}
function writeFiles(files) {
    for (var filepath of files.keys()) {
        const directory = dir(filepath);
        createDirectory(directory);
        saveFile(filepath, files.get(filepath));
    }
}
exports.writeFiles = writeFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVGaWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi93cml0ZUZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7Ozs7O0FBRUgsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUV2QixTQUFTLEdBQUcsQ0FBQyxRQUFnQjtJQUN6QixPQUFPLGNBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFBO0FBQ25DLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxTQUFpQjtJQUN0QyxJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQzVCLFlBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxRQUFnQixFQUFFLElBQVk7SUFDNUMsWUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDcEMsQ0FBQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxLQUEwQjtJQUNqRCxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUUvQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDMUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUE7SUFDNUMsQ0FBQztBQUNMLENBQUM7QUFQRCxnQ0FPQyJ9
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = __importDefault(require("fs"));
const semver = __importStar(require("semver"));
const yaml_1 = require("yaml");
const generateSchema_1 = require("./generateSchema");
const writeFiles_1 = require("./writeFiles");
function loadYamlFile(filepath) {
    const data = fs_1.default.readFileSync(filepath, 'utf8');
    const yaml = (0, yaml_1.parse)(data);
    return yaml;
}
function generate(options) {
    const apiSpec = loadYamlFile(options.sourceFile);
    (0, assert_1.default)(semver.satisfies(apiSpec['openapi'], '3.0.0 - 3.0.999'), `OpenAPI version ${apiSpec['openapi']} not supported.`);
    const schemaFiles = (0, generateSchema_1.generateSchema)(apiSpec, options.targetDir);
    (0, writeFiles_1.writeFiles)(new Map([...Array.from(schemaFiles.entries())]));
}
exports.generate = generate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZ2VuZXJhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7OztHQWNHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILG9EQUEyQjtBQUMzQiw0Q0FBbUI7QUFFbkIsK0NBQWdDO0FBQ2hDLCtCQUF5QztBQUV6QyxxREFBaUQ7QUFDakQsNkNBQXlDO0FBT3pDLFNBQVMsWUFBWSxDQUFDLFFBQWdCO0lBQ2xDLE1BQU0sSUFBSSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUEsWUFBUyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRTVCLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxPQUF3QjtJQUM3QyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRWhELElBQUEsZ0JBQU0sRUFDRixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxFQUN2RCxtQkFBbUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRzNELE1BQU0sV0FBVyxHQUFHLElBQUEsK0JBQWMsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRTlELElBQUEsdUJBQVUsRUFBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMvRCxDQUFDO0FBWEQsNEJBV0MifQ==
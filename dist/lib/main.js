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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json = __importStar(require("../package.json"));
const generate_1 = require("./generate");
commander_1.program
    .name('api-generator')
    .description('Generate REST API server for a subset of OpenAPI 3.0')
    .version(package_json.version)
    .argument('<specification file>', 'OpenAPI file')
    .requiredOption('-o, --out-dir <path>', 'Directory where the generated source shall be saved')
    .action((specFile, options) => {
    (0, generate_1.generate)({
        sourceFile: specFile,
        targetDir: options.outDir
    });
});
commander_1.program.parse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILHlDQUFtQztBQUNuQyw4REFBK0M7QUFFL0MseUNBQXFDO0FBR3JDLG1CQUFPO0tBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQztLQUNyQixXQUFXLENBQUMsc0RBQXNELENBQUM7S0FDbkUsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7S0FDN0IsUUFBUSxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQztLQUNoRCxjQUFjLENBQUMsc0JBQXNCLEVBQUUscURBQXFELENBQUM7S0FDN0YsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzFCLElBQUEsbUJBQVEsRUFBQztRQUNMLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTTtLQUM1QixDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQTtBQUVOLG1CQUFPLENBQUMsS0FBSyxFQUFFLENBQUEifQ==
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

import { program } from 'commander'
import * as package_json from '../package.json'

import { generate } from './generate'


program
    .name('api-generator')
    .description('Generate REST API server for a subset of OpenAPI 3.0')
    .version(package_json.version)
    .argument('<specification file>', 'OpenAPI file')
    .requiredOption('-o, --out-dir <path>', 'Directory where the generated source shall be saved')
    .action((specFile, options) => {
        generate({
            sourceFile: specFile,
            targetDir: options.outDir
        })
    })

program.parse()

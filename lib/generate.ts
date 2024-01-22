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

import assert from 'assert'
import fs from 'fs'

import * as semver from 'semver'
import { parse as parseYaml } from 'yaml'

import { generateSchema } from './generateSchema'
import { writeFiles } from './writeFiles'

export interface GenerateOptions {
    sourceFile: string
    targetDir: string
}

function loadYamlFile(filepath: string): any {
    const data = fs.readFileSync(filepath, 'utf8')
    const yaml = parseYaml(data)

    return yaml
}

export function generate(options: GenerateOptions) {
    const apiSpec = loadYamlFile(options.sourceFile)

    assert(
        semver.satisfies(apiSpec['openapi'], '3.0.0 - 3.0.999'),
        `OpenAPI version ${apiSpec['openapi']} not supported.`)


    const schemaFiles = generateSchema(apiSpec, options.targetDir)

    writeFiles(new Map([...Array.from(schemaFiles.entries())]))
}

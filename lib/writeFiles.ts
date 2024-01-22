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

import fs from 'fs'
import path from 'path'

function dir(filepath: string): string {
    return path.parse(filepath).dir
}

function createDirectory(directory: string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

function saveFile(filepath: string, data: string) {
    fs.writeFileSync(filepath, data)
}

export function writeFiles(files: Map<string, string>) {
    for (var filepath of files.keys()) {
        const directory = dir(filepath)

        createDirectory(directory)
        saveFile(filepath, files.get(filepath)!)
    }
}
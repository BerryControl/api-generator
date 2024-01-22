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
import path from 'path'

import nunjucks from 'nunjucks'


type File = { filename: string, content: string }

const validPropertyTypes = new Set<string>(['string'])

function validatePropertyType(typ: string) {
    assert(validPropertyTypes.has(typ), `Property type ${typ} is not valid`)
}

function generateInterface(name: string, entityDef: any, apiSpec: Map<string, any>): string {
    var properties = entityDef['properties']
    var propertyDefs: Array<[string, string]> = new Array()

    for (var propertyName in properties) {
        var propertyType = `${properties[propertyName]['type']}`

        console.log(propertyType)

        validatePropertyType(propertyType)
        propertyDefs.push([propertyName, propertyType])
    }

    var content = nunjucks.render(path.join(__dirname, '../../templates/interface.ts.njk'), {
        generatorName: 'api-generator',
        name: name,
        properties: propertyDefs
    })

    return content
}

function generateArrayType(name: string, entityDef: any, apiSpec: Map<string, any>): string {
    var items = entityDef['items']
    var itemTypeRef = items['$ref']
    var lastSlashPosition = itemTypeRef.lastIndexOf('/')
    var itemType = itemTypeRef.substring(lastSlashPosition + 1, itemTypeRef.length)

    var content = nunjucks.render(path.join(__dirname, '../../templates/array-type.ts.njk'), {
        generatorName: 'api-generator',
        name: name,
        type: itemType
    })

    return content
}

function generateEntity(name: string, entityDef: any, apiSpec: Map<string, any>): File {
    const typ = entityDef['type']
    var contents: string = ''

    assert(
        typ === 'object' || typ === 'array',
        `Schema ${name}: Type ${typ} is not supported; only object and array are supported`)

    if (typ === 'object') {
        contents = generateInterface(name, entityDef, apiSpec)
    } else if (typ === 'array') {
        contents = generateArrayType(name, entityDef, apiSpec)
    }

    return {
        filename: name + '.ts',
        content: contents
    }
}

function generateIndex(outputFiles: Map<string, string>): string {
    var filenames: Array<string> = new Array();

    for (var filename of outputFiles.keys()) {
        filenames.push(path.parse(filename).name)
    }

    var content = nunjucks.render(path.join(__dirname, '../../templates/schema-index.ts.njk'), {
        generatorName: 'api-generator',
        filenames: filenames
    })

    return content
}

export function generateSchema(apiSpec: any, outDir: string): Map<string, string> {
    var outputFiles: Map<string, string> = new Map()
    const schemasPath = path.join(outDir, 'schemas')

    var schemas = apiSpec['components']['schemas']
    for (var entityName in schemas) {
        const file = generateEntity(entityName, schemas[entityName], apiSpec)

        outputFiles.set(path.join(schemasPath, file.filename), file.content)
    }

    const indexFileContent: string = generateIndex(outputFiles)
    outputFiles.set(path.join(schemasPath, 'index.ts'), indexFileContent)

    return outputFiles
}

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
exports.generateSchema = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = __importDefault(require("path"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const validPropertyTypes = new Set(['string']);
function validatePropertyType(typ) {
    (0, assert_1.default)(validPropertyTypes.has(typ), `Property type ${typ} is not valid`);
}
function generateInterface(name, entityDef, apiSpec) {
    var properties = entityDef['properties'];
    var propertyDefs = new Array();
    for (var propertyName in properties) {
        var propertyType = `${properties[propertyName]['type']}`;
        validatePropertyType(propertyType);
        propertyDefs.push([propertyName, propertyType]);
    }
    var content = nunjucks_1.default.render(path_1.default.join(__dirname, '../../templates/interface.ts.njk'), {
        generatorName: 'api-generator',
        name: name,
        properties: propertyDefs
    });
    return content;
}
function generateArrayType(name, entityDef, apiSpec) {
    var items = entityDef['items'];
    var itemTypeRef = items['$ref'];
    var lastSlashPosition = itemTypeRef.lastIndexOf('/');
    var itemType = itemTypeRef.substring(lastSlashPosition + 1, itemTypeRef.length);
    var content = nunjucks_1.default.render(path_1.default.join(__dirname, '../../templates/array-type.ts.njk'), {
        generatorName: 'api-generator',
        name: name,
        type: itemType
    });
    return content;
}
function generateEntity(name, entityDef, apiSpec) {
    const typ = entityDef['type'];
    var contents = '';
    (0, assert_1.default)(typ === 'object' || typ === 'array', `Schema ${name}: Type ${typ} is not supported; only object and array are supported`);
    if (typ === 'object') {
        contents = generateInterface(name, entityDef, apiSpec);
    }
    else if (typ === 'array') {
        contents = generateArrayType(name, entityDef, apiSpec);
    }
    return {
        filename: name + '.ts',
        content: contents
    };
}
function generateIndex(outputFiles) {
    var filenames = new Array();
    for (var filename of outputFiles.keys()) {
        filenames.push(path_1.default.parse(filename).name);
    }
    var content = nunjucks_1.default.render(path_1.default.join(__dirname, '../../templates/schema-index.ts.njk'), {
        generatorName: 'api-generator',
        filenames: filenames
    });
    return content;
}
function generateSchema(apiSpec, outDir) {
    var outputFiles = new Map();
    const schemasPath = path_1.default.join(outDir, 'schemas');
    var schemas = apiSpec['components']['schemas'];
    for (var entityName in schemas) {
        const file = generateEntity(entityName, schemas[entityName], apiSpec);
        outputFiles.set(path_1.default.join(schemasPath, file.filename), file.content);
    }
    const indexFileContent = generateIndex(outputFiles);
    outputFiles.set(path_1.default.join(schemasPath, 'index.ts'), indexFileContent);
    return outputFiles;
}
exports.generateSchema = generateSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZ2VuZXJhdGVTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7OztHQWNHOzs7Ozs7QUFFSCxvREFBMkI7QUFDM0IsZ0RBQXVCO0FBRXZCLHdEQUErQjtBQUsvQixNQUFNLGtCQUFrQixHQUFHLElBQUksR0FBRyxDQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUV0RCxTQUFTLG9CQUFvQixDQUFDLEdBQVc7SUFDckMsSUFBQSxnQkFBTSxFQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxpQkFBaUIsR0FBRyxlQUFlLENBQUMsQ0FBQTtBQUM1RSxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsU0FBYyxFQUFFLE9BQXlCO0lBQzlFLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4QyxJQUFJLFlBQVksR0FBNEIsSUFBSSxLQUFLLEVBQUUsQ0FBQTtJQUV2RCxLQUFLLElBQUksWUFBWSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLElBQUksWUFBWSxHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFFeEQsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDbEMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFRCxJQUFJLE9BQU8sR0FBRyxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQ0FBa0MsQ0FBQyxFQUFFO1FBQ3BGLGFBQWEsRUFBRSxlQUFlO1FBQzlCLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLFlBQVk7S0FDM0IsQ0FBQyxDQUFBO0lBRUYs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
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
        console.log(propertyType);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZ2VuZXJhdGVTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7OztHQWNHOzs7Ozs7QUFFSCxvREFBMkI7QUFDM0IsZ0RBQXVCO0FBRXZCLHdEQUErQjtBQUsvQixNQUFNLGtCQUFrQixHQUFHLElBQUksR0FBRyxDQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUV0RCxTQUFTLG9CQUFvQixDQUFDLEdBQVc7SUFDckMsSUFBQSxnQkFBTSxFQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxpQkFBaUIsR0FBRyxlQUFlLENBQUMsQ0FBQTtBQUM1RSxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsU0FBYyxFQUFFLE9BQXlCO0lBQzlFLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4QyxJQUFJLFlBQVksR0FBNEIsSUFBSSxLQUFLLEVBQUUsQ0FBQTtJQUV2RCxLQUFLLElBQUksWUFBWSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLElBQUksWUFBWSxHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFFeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUV6QixvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVELElBQUksT0FBTyxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtDQUFrQyxDQUFDLEVBQUU7UUFDcEYsYUFBYSxFQUFFLGVBQWU7UUFDOUIsSUFBSSxFQUFFLElBQUk7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
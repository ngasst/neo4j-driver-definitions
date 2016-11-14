export function buildDefinitionFile(definitions: string) {
    return new Promise((resolve, reject) => {
        let header = `// Type definitions for Neo4j Javascript Driver v1.1\r\n// Project: https://github.com/neo4j/neo4j-javascript-driver/\r\n// Definitions by: Gaston Ndanyuzwe <https://github.com/ngasst>\r\n// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped\r\n// Documentation : https://neo4j.com/docs/api/javascript-driver/current/`;
        let references: string = `/// <reference types='node' />\r\n/// <reference types='ws' />`;
        let open: string = `declare module "neo4j-driver" {\r\nimport * as WebSocket from 'ws';\r\nimport { Subscription } from '@reactivex/rxjs';`;
        let close: string = `}`;
       	let final: string = header
           					.concat(`\r\n`)
                            .concat(references) 
           					.concat(`\r\n`)
                            .concat(open) 
           					.concat(`\r\n`)
                            .concat(definitions)
           					.concat(`\r\n`)
							.concat(close);
        resolve(final); 
    });
}
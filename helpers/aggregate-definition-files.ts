import { readdir } from 'fs-extra';
import * as Path from 'path';

export function aggreateDefinitionFiles(files: string[]) {
    return new Promise((resolve, reject) => {
        let path: string = Path.resolve('./internal');
        readdir(path, (err: NodeJS.ErrnoException, paths: string[]) => {
			if (err) reject(err);
            let merged: string[] = [].concat(...files, paths.map(s => `/internal/${s}`));
            console.log(merged);
            let filtered: string [] = merged.filter((f, i) => f.indexOf('.d.ts') !== -1);
            let final: string[] = filtered.filter(s => s !== 'index.d.ts');
        	resolve(final);
        });
    });
}
import { writeFile } from 'fs-extra';
import * as Path from 'path';
export function writeDefinitionFile(file: string, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let resPath: string = Path.resolve(path);
		writeFile(resPath, file, (err: NodeJS.ErrnoException) => {
			if (err) reject(err);
            resolve(resPath);
        });
    });
}
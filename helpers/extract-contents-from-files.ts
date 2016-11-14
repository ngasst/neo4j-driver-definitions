import { readFile } from 'fs-extra';
import * as chalk from 'chalk';
import * as Path from 'path';

export function extractContentsFromFiles(names: string[]) {
    return new Promise((resolve, reject) => {
		let p: Promise<{file: string; content: string}>[] = names.map(f => {
			let c: {file: string; content: string};
            let path: string = Path.join(process.cwd(), f);
            return new Promise((resolve, reject) => {
				readFile(path, (err: NodeJS.ErrnoException, data: Buffer) => {
					if(err) reject(err);
                    c = {
                        file: f,
                        content: data.toString()
                    };
                    console.log(`${chalk.blue('['+f+']')}=>${chalk.magenta('OK')}`);
                    resolve(c);
                });
            });
        });
        Promise.all(p)
        .then((contents: {file: string; content: string}[]) => {
            resolve(contents);
        })
        .catch(err => reject(err));
    });
}
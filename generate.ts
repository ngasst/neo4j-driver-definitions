import * as chalk from 'chalk';
import { readdir } from 'fs-extra';
import { aggreateDefinitionFiles } from './helpers/aggregate-definition-files';
import { extractContentsFromFiles } from './helpers/extract-contents-from-files';
import { mergeFilesIntoOne } from './helpers/merge-files-into-one';
import { buildDefinitionFile } from './helpers/build-definition-file';
import { writeDefinitionFile } from './helpers/write-definition-file';
import { cleanDefinitionFile } from './helpers/clean-definition-file';
import * as Path from 'path';

generate('./index.d.ts')
.then(() => {
    console.log(chalk.grey('Done!'));
})
.catch((err) => {
    console.error(chalk.red(err));
});

function generate(outPath: string) {
    return new Promise((resolve, reject) => {
        let path: string = Path.resolve('.');
		readdir(path, (err: NodeJS.ErrnoException, files: string[]) => {
            if (err) reject(err);
			Promise.resolve()
            .then(() => {
                return aggreateDefinitionFiles(files);
            })
            .then((filtered: string[]) => {
				return extractContentsFromFiles(filtered);
            })
            .then((contents: {file: string; content: string}[]) => {
                return mergeFilesIntoOne(contents);
            })
			.then((file: string) => {
                return cleanDefinitionFile(file);
            })
            .then((definitions: string) => {
                return buildDefinitionFile(definitions);
            })
			.then((file: string) => {
                return writeDefinitionFile(file, outPath);
            })
            .then((path: string) => {
                console.log(chalk.yellow(`Definitions file saved at: ${path}`));
                resolve(true);
            })
            .catch(err => reject(err));
        });
    });
}
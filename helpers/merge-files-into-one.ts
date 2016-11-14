export function mergeFilesIntoOne(contents: {file: string; content: string}[]) {
    return new Promise((resolve, reject) => {
		let ordered: {file: string; content: string}[] = contents.sort((a, b) => +(a.file > b.file) || +(a.file === b.file) - 1);
        let defs: string = ordered.reduce((acc, val) => acc.concat(`\r\n\r\n//${val.file}\r\n\r\n`.concat(val.content)), ``);
        resolve(defs);
    });
}
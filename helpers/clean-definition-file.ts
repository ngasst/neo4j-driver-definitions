export function cleanDefinitionFile(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
		let cleanOne: string = cleanImports(file);
        let cleanTwo: string = cleanDeclares(cleanOne);
        resolve(cleanTwo);
    });
}

function cleanImports(st: string): string {
    let clean: string = st.replace(/(import[^;]+;\s+)/g, '');
    return clean;
}

function cleanDeclares(st: string): string {
    let clean: string = st.replace(/(\sdeclare\s)/g, ' ');
    return clean;
}
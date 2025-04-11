/**
 *
 * @description
 * @createTime 2025/4/11 03:01
 */


import { Compiler } from 'webpack';
import fs from "fs";


type  ModuleDir2NamespacePluginProps = {
    fromDir:string,
    outputFile:string,
}

export default  class ModuleDir2NamespacePlugin{
    private readonly fromDir: string;
    private readonly outputFile: string;


    constructor(options: ModuleDir2NamespacePluginProps) {
        this.fromDir = options.fromDir;
        this.outputFile = options.outputFile;
    }

    apply(compiler: Compiler): void {
        compiler.hooks.beforeCompile.tapPromise('ModuleDir2NamespacePlugin1',async () => {
           await rebuildIndexFile(this.fromDir, this.outputFile)
        })
        compiler.hooks.watchRun.tapPromise('ModuleDir2NamespacePlugin',async (compiler) => {
            if (compiler.modifiedFiles) {
                compiler.modifiedFiles.forEach(file => {
                    if(file.startsWith(this.fromDir)){
                        rebuildIndexFile(this.fromDir,this.outputFile)
                    }
                })
            }
        });
    }
}

async function rebuildIndexFile(fromDir:string,outputFile:string):Promise<void> {
    const files = await  new Promise<string[]>((resolve,reject) => {
        fs.readdir(fromDir,(err, files) => {
            if(err){
                reject(err)
            }else{
                resolve(files)
            }
        })
    });

    const template =  `/**
*   不要修改这个文件
*   这个文件的内容会根据 src/services 目录下的文件自动生成
*
**/

${files.map(file=>`import * as ${file.replace(/\.ts$/,'')} from '../src/services/${file.replace(/\.ts$/,'')}';`).join('\r\n')}

const services =  {${files.map(file=>file.replace(/\.ts$/,''))}}
export default services;
`;
    fs.writeFileSync(outputFile,template);
}



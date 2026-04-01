const path = './sketons/';
import fs from 'fs/promises';
export default function SkeletonPlaceholder() {
    return {
        name: 'skeletonplaceholder',
        enforce: 'post',
        async transform(src, id) {
            if(/\.vue$/.test(id)) {
                const regex = /__SKELETON_(.*?)_CONTENT__/igm
                const matches = [...src.matchAll(regex)];
                // let fileName;
                let code = src;
                matches.forEach(async(match) => {
                    // fileName = match[1];
                    // console.log(match[1]);
                    let fileName = match[1];
                    console.log(globalThis[`_${fileName}`]);
                    // if(globalThis[`_${fileName}`]) {
                    //     code = code.replace(match[0], globalThis[`_${fileName}`]);
                    // }
                    // try {
                    //     console.log(2);
                    //     const content = await fs.readFile(path + fileName + '.txt', 'utf-8');
                    //     code = code.replace(match[0], content);
                    // } catch (error) {
                    //     console.log(`Error reading file ${fileName}.txt: ${error.message}`)
                    // }
                })
                // const fssync = await import('fs/promises');
                // const content = fssync.readFile(path + fileName + '.vue.txt', 'utf-8');
                // if(content) {
                //     let code = src.replace(regex, content);
                //     return {
                //         code
                //     }
                // }
                // if(code != src) {
                //     return {
                //         code
                //     }
                // }
            }

            return src;
        }
    }
}
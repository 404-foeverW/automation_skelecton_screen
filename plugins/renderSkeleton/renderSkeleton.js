import { parseHTML } from "linkedom";
import { parse } from "@vue/compiler-sfc";
import skeleton from "./skeleton";
import { loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';

const cheerio = require('cheerio');
const skeletonPage = JSON.parse(loadEnv('', process.cwd()).VITE_SKELETON_PAGES);


export default function renderSkeleton() {
    return {
        name: "renderSkeleton",
        enforce: 'post',
        async load(id) {
            // let currentIndex;
            let currentIndex = skeletonPage.findIndex((item, index) => {
                return id.indexOf(item.name+'.vue') !== -1;
            })
            if(currentIndex !== -1) {
            // if(id.indexOf('UserInfo.vue') !== -1) {
                console.log(skeletonPage[0]);
                const fssync = await import('fs/promises');
                const code = await fssync.readFile(id, 'utf-8');
                // console.log(code);
                const { descriptor } = parse(code);
                // console.log("descirptor", parse(code));
                const templateContent = descriptor.template?.content || '';
                const $ = cheerio.load(templateContent);
                let htmlText = skeleton($('.'+skeletonPage[currentIndex].className), $);
                // console.log(htmlText);
                // console.log(process.cwd());
                const outputDir = path.resolve(process.cwd(), 'sketeons');
                if (!fs.existsSync(outputDir)) {
                    try {
                        fs.mkdirSync(outputDir, { recursive: true });
                    } catch (error) {
                        console.log('创建目录失败', error);
                    }
                }
                let fileName = path.basename(id);
                fileName = fileName.replace('.vue', '');
                const outputPath = path.resolve(outputDir, `${fileName}.txt`);
                try {
                    fs.writeFileSync(outputPath, htmlText, 'utf-8');
                    console.log('写入文件成功', outputPath);
                } catch (error) {
                    console.log('写入文件失败', error);
                }
                globalThis[`_${fileName}`] = htmlText;
            }
            return null;
        }
    }
}
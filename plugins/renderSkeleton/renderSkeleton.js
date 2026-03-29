import { parseHTML } from "linkedom";
import { parse } from "@vue/compiler-sfc";
import skeleton from "./skeleton";

const cheerio = require('cheerio');


export default function renderSkeleton() {
    return {
        name: "renderSkeleton",
        enforce: 'post',
        async load(id) {
            if(id.indexOf('HelloWorld.vue') !== -1) {
                const fs = await import('fs/promises');
                const code = await fs.readFile(id, 'utf-8');
                // console.log(code);
                const { descriptor } = parse(code);
                // console.log("descirptor", parse(code));
                const templateContent = descriptor.template?.content || '';
                const $ = cheerio.load(templateContent);
                skeleton($('.hello'), $);
                // console.log($);
                // const { document } = parseHTML(templateContent);
                // console.log(document);
            }
        }
    }
}
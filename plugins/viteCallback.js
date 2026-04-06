export default function viteCallbackPlugin() {
    return {
        name: 'viteCallbackPlugin',
        config() {
            console.log('viteCallbackPlugin config');
        },
        configResolved() {
            console.log('viteCallbackPlugin configResolved');
        },
        configureServer() {
            console.log('viteCallbackPlugin configureServer');
        },
        transformIndexHtml() {
            console.log('viteCallbackPlugin transformIndexHtml');
        },
        resolveId() {
            console.log('viteCallbackPlugin resolveId');
        },
        load() {
            console.log('viteCallbackPlugin load');
        },
        transform() {
            console.log('viteCallbackPlugin transform');
        },
        buildStart() {
            console.log('viteCallbackPlugin buildStart');
        },
        buildEnd() {
            console.log('viteCallbackPlugin buildEnd');
        },
        outputOptions() {
            console.log('viteCallbackPlugin outputOptions');
        },
        moduleParsed() {
            console.log('viteCallbackPlugin moduleParsed');
        },
        renderStart() {
            console.log('viteCallbackPlugin renderStart');
        },
        renderChunk() {
            console.log('viteCallbackPlugin renderChunk');
        },
        generateBundle() {
            console.log('viteCallbackPlugin generateBundle');
        },
        writeBundle() {
            console.log('viteCallbackPlugin writeBundle');
        },
        closeBundle() {
            console.log('viteCallbackPlugin closeBundle');
        }
    }
}
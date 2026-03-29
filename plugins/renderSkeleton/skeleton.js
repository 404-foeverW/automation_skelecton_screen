import { KEY_DEEP, KEY, KEY_EXCLUDE, SKELETON_TYPE } from "./enum";
const { IGNORE, TEXT, IMAGE, BLOCK, BORDER, LIST, BUTTON, BACKGROUND_IMAGE, INPUT} = SKELETON_TYPE;

export default function skeleton(root, jq, options = null) {
    // console.log(root);
    root.addClass('sk');
    presets(root, options);
    preorder(root, jq);
}
function presets(root, options) {
    if(options === null) return;
    let { code, selector = {}, ignore } = options;
    for (let key of Object.keys(selector)) {
        const { include, exclude } = selector[key];
        include && root(include).attr(KEY, key);
        exclude && root(exclude).attr(KEY_EXCLUDE, key);
    }
    ignore && root(ignore).attr(KEY, IGNORE);
    if(code) {
        try {
            eval(code);
        } catch (error) {
            console.log(error);
        }
    }
}
function replaceTextNode(root, $) {
    let type = root.attr(KEY);
    if(type === TEXT) return;
    
    let $texts = root.contents().filter(function(item) {
        return item.nodeType === 3;
    })
    $texts.each(function(index, el) {
        let node = this;
        let $node = $(this);
        console.log(node);
        if(!$node.innerText.trim()) {
            return;
        }
        let span = document.createElement('span');
        let $span = $(span);
        $span.attr(KEY, TEXT);
        $span.insertAfter($node);
        $node.remove();

        span.appendChild($node);
    })
}
function checkNodeVisible($node) {
    return $node.css('display') !== 'none';
}
function getNodeSkeletonType($node) {
    
}
function preorder(root) {
    replaceTextNode(root);

    // 排除不可见元素
    if(!checkNodeVisible(root)) {
        return;
    }

    let type = root.attr(KEY) || getNodeSkeletonType(root);
}
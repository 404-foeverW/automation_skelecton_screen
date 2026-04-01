import { KEY_DEEP, KEY, KEY_EXCLUDE, SKELETON_TYPE } from "./enum";
import renderText from "./renderText";
import renderImage from "./renderImage";
import renderBlock from "./renderBlock";
import renderBorder from "./renderBorder";
import renderList from "./renderList";
import renderButton from "./renderButton";
import renderBackgroundImage from "./renderBackgroundImage";
import renderInput from "./renderInput";
import ignore from "./ignore";
const { IGNORE, TEXT, IMAGE, BLOCK, BORDER, LIST, BUTTON, BACKGROUND_IMAGE, INPUT} = SKELETON_TYPE;

export default function skeleton(root, jq, options = null) {
    // console.log(root);
    root.addClass('sk');
    presets(root, options);
    preorder(root, jq);
    return root.html();
    console.log(root.html());
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
function isInput(node, $) {
    if(node.tagName.toUpperCase() === 'INPUT') {
        let type = $(node).attr('type');
        return ['text', 'password', 'search'].includes(type);
    }
    return false;
}
function hasBorder(node, $) {
    // console.log($(node).css('border-width'));
    let style = $(node).css('border-width');
    return style && style !== '0px';
}
function hasBackgroundImage(node, $) {
    let reg = /url/;
    let background = $(node).css('background');
    return reg.test(background);
}
function isImage(node) {
    return node.tagName.toUpperCase() === 'IMG';
}
function isList(node) {
    return node.children.length > 0 && /ul|ol/.test(node.tagName);
}
function isButton(node, $) {
    return node.nodeType == 1 && (node.tagName.toUpperCase() === 'BUTTON' || (node.tagName.toUpperCase() === 'A' && $(node).attr('role') === 'button'));
}
function isText(node) {
    return node.childNodes && node.childNodes[0] && node.childNodes[0].nodeType === 3 && /\S/.test(node.childNodes[0].textContent);
}
function getNodeSkeletonType($node, $) {
    let node = $node[0];
    if(!node) return;
    if(isInput(node, $)) {
        return INPUT;
    }
    if(hasBorder(node, $)) {
        return BORDER;
    }
    if(hasBackgroundImage(node, $)) {
        return BACKGROUND_IMAGE;
    }
    if(isImage(node)) {
        return IMAGE;
    }
    if(isList(node)) {
        return LIST;
    }
    if(isButton(node, $)) {
        return BUTTON;
    }
    if(isText(node)) {
        return TEXT;
    }
}
function preorder(root, $) {
    replaceTextNode(root);

    // 排除不可见元素
    if(!checkNodeVisible(root)) {
        return;
    }

    let type = root.attr(KEY) || getNodeSkeletonType(root, $);
    let excludeType = root.attr(KEY_EXCLUDE);
    if(!excludeType || excludeType !== type) {
        let handlers = {
            [TEXT]: renderText,
            [IMAGE]: renderImage,
            [BLOCK]: renderBlock,
            [BORDER]: renderBorder,
            [LIST]: renderList,
            [BUTTON]: renderButton,
            [BACKGROUND_IMAGE]: renderBackgroundImage,
            [INPUT]: renderInput,
            [IGNORE]: ignore
        }
        let handler = handlers[type];
        handler && handler(root);
        if([BLOCK].includes(type)) {
            return;
        }
    }
    root.children().each(function() {
        const $this = $(this);
        preorder($this, $);
    })
}
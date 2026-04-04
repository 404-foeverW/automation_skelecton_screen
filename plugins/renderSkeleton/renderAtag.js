export default function renderAtag($node, $, options = null) {
    let a = $(`<a href="javascript:void(0)">${$node.text()}</a`);
    let cssSize = $node.css('font-size');
    // console.log(cssSize);
    // if(cssSize && cssSize.indexOf('rem') !== -1) {
    if(cssSize && /rem/g.test(cssSize)) {
        cssSize = cssSize.replace('rem', '') * options.htmlConfig.rootFontSize;
    }
    // if(cssSize && cssSize.indexOf('em') !== -1) {
    if(cssSize && /em/g.test(cssSize)) {
        cssSize = cssSize.replace('em', '') * options.htmlConfig.fontSize;
    }
    let fontSize = cssSize ? cssSize : options.htmlConfig.fontSize;
    let lineHeight = $node.css('line-height') ? cssSize : 'normal';
    // console.log(fontSize, lineHeight);
    if(lineHeight == 'normal') {
        lineHeight = fontSize * 1.2;
    }else {
        lineHeight = parseInt(lineHeight);
    }
    // 计算文字高度占行高的比例（核心计算）
    const textHeightRatio = fontSize / lineHeight;
    // 计算背景渐变的第一个断点位置（百分比）
    // 原理：(行高 - 文字高度) / 2 = 文字上方的空白区域高度
    // const fristColorPoint = (((1 - textHeightRatio) / 2) * 100).toFixed(2);
    const fristColorPoint = (((1 - textHeightRatio) / 2) * lineHeight).toFixed(2);
    // 计算背景渐变的第二个断点位置（百分比）
    // 原理：上方空白 + 文字高度 = 文字底部的位置
    // const secondColorPoint = (((1 - textHeightRatio) / 2 + textHeightRatio) * 100).toFixed(2);
    const secondColorPoint = (((1 - textHeightRatio) / 2 + textHeightRatio) * lineHeight).toFixed(2);
    const style = `--fp:${fristColorPoint}px;--sp:${secondColorPoint}px;--lh:${lineHeight}px;cursor: default;`;
    a.attr('style', style);
    a.addClass('sk-text');
    $node.replaceWith(a);
    // $node.html('<a href="javascript:void(0)">' + $node.text() + '</a>');
}
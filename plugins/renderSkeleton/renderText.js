export default function renderText($dom) {
    let fontSize = $dom.css('font-size');
    let lineHeight = $dom.css('line-height');
    if(lineHeight == 'normal') {
        lineHeight = fontSize * 1.2;
    }else {
        lineHeight = parseInt(lineHeight);
    }
    // 计算文字高度占行高的比例（核心计算）
    const textHeightRatio = fontSize / lineHeight;
    // 计算背景渐变的第一个断点位置（百分比）
    // 原理：(行高 - 文字高度) / 2 = 文字上方的空白区域高度
    const fristColorPoint = (((1 - textHeightRatio) / 2) * 100).toFixed(2);
    // 计算背景渐变的第二个断点位置（百分比）
    // 原理：上方空白 + 文字高度 = 文字底部的位置
    const secondColorPoint = (((1 - textHeightRatio) / 2 + textHeightRatio) * 100).toFixed(2);
    const style = `--fp:${fristColorPoint};--sp:${secondColorPoint};--lh:${lineHeight}px`;
    $dom.addClass('sk-tect');
    $dom.attr('style', style);
}
export default function renderImage($node) {
    let width = $node.width();
    let height = $node.height();
    let emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    $node.attr('src', emptyImage);
    $node.css({
        width: width,
        height: height,
        background: '#eee'
    })
}
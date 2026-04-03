export default function renderImage($node) {
    let width = $node.css('width');
    let height = $node.css('height');
    // console.log(width, height);
    let emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    if($node.attr(':src')) {
        $node.removeAttr(':src');
    }
    $node.attr('src', emptyImage);
    $node.css({
        width: width ? width : '100px',
        height: height ? height : '100px',
        background: '#eee'
    })
}
export default function renderList($node) {
    $node.addClass('sk-list');
    let $children = $node.children();
    let $child = $children.first();
    let len = $children.length;

    for (let i = 1; i < len; i++) {
        $node.eq(i).remove();
    }

    for (let i = 1; i < len; i++) {
        let tmp = $child.clone(true);
        $node.append(tmp);
    }
}
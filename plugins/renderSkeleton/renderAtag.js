export default function renderAtag($node, $) {
    let a = $(`<a class="sk-text" style="cursor: default;" href="javascript:void(0)">${$node.text()}</a`);
    $node.replaceWith(a);
    // $node.html('<a href="javascript:void(0)">' + $node.text() + '</a>');
}
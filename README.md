# automation_skelecton_screen

## 描述
基于vite实现自动生成目标组件的骨架屏，并自动注入到目标组件中

## 使用
```javascript
// 核心插件
import renderSkeleton from './plugins/renderSkeleton/renderSkeleton'
import SkeletonPlaceholder from './plugins/SkeletonPlaceholder/SkeletonPlaceholder'
```
```javascript
// vite引入插件
plugins: [vue(), renderSkeleton(), SkeletonPlaceholder()],
```
```html
<!-- 占位符 -->
<div v-if="loading">__SKELETON_组件名称_CONTENT__</div>
```
## Options

```javascript
{
    // 插件执行期间可执行的代码段
    code: '',
    // 不需要显示的元素
    ignore: '',
    // 指定元素的节点类型
    selector: {
        '节点类型': {
            // 不忽略节点类型
            include: '元素选择器',
            // 忽略节点类型
            exclude: '元素选择器'
        }
    },
    // 元素的样式设置
    htmlConfig: {
        // 根节点的字体大小(用于rem计算)
        rootFontSize: 16,
        // 父级字体大小(用于em计算)
        fontSize: 16
    }
}
```


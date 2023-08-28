import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
/**
 * dayjs本身提供的功能不多，复杂的功能需要通过插件的方式实现
 * @src https://github.com/iamkun/dayjs/tree/dev/src/plugin
 * @src https://dayjs.fenxianglu.cn/category/plugin.html
 */
dayjs.locale('zh-cn')
export default dayjs

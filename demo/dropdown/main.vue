<template>
  <dropdown :title="title" :list="list"></dropdown>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
</style>
<script type="text/ecmascript-6">
import dropdown from '../../components/dropdown'

export default {
  components: {dropdown},
  data () {
    return {
      title: '自由行',
      list: [
        {
          title: '日本 韩国',
          hot: '北海道 东京 大阪 济州岛'
        },
        {
          title: '东南亚 南亚',
          hot: '长滩岛 新加坡 芽庄 普吉岛'
        },
        {
          title: '港澳台',
          hot: '台北 澳门'
        },
        {
          title: '美洲',
          hot: '洛杉矶 旧金山 纽约'
        },
        {
          title: '欧洲',
          hot: '巴黎 伦敦 罗马 巴塞罗那'
        },
        {
          title: '澳新 中东 非',
          hot: '毛里求斯 迪拜 墨尔本'
        },
        {
          title: '国内'
        }
      ]
    }
  },
  computed: {
  },
  created () {
  },
  ready () {
  },
  methods: {
  }
}
</script>

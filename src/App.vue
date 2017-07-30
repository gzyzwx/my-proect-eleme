<template>
  <div>
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script>
  // import Hello from './components/Hello'
  import VHeader from './components/header/header'
  import {urlParse} from 'common/js/util.js'
  const ERROR = 0

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    created() {
      var self = this
      this.$http.get('/api/seller?id=' + this.seller.id).then(
        // es5写法
        // function(json) {
        //   console.log(json)
        // },
        // function(err) {
        //   console.log(err)
        // }
        // es6写法
        (res) => {
          // console.log(res)
          // console.log(res.body)
          if (res.body.errno === ERROR) {
            self.seller = Object.assign({}, self.seller, res.body.data)
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
    components: {
      VHeader
    }
  }
</script>

<style lang="less">
  @import "./common/stylus/index.less";
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // border-bottom: 1px solid rgba(7,17,27,0.1);
    .borderbottomOne(rgba(7,17,27,0.1));
    .tab-item{
      flex:1;
      text-align: center;
      a{
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active{
          color: rgb(240,20,20);
        }
      }
    }
  }
// html {
//   height: 100%;
// }

// body {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
// }

// #app {
//   color: #2c3e50;
//   margin-top: -100px;
//   max-width: 600px;
//   font-family: Source Sans Pro, Helvetica, sans-serif;
//   text-align: center;
// }

// #app a {
//   color: #42b983;
//   text-decoration: none;
// }

// .logo {
//   width: 100px;
//   height: 100px
// }
</style>

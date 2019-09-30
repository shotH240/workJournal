<template>
  <div class="user-comments">
      <div class="user-portrait">
        <img :src="data.user.avatar">
      </div>
      <div class="comments-details">
          <div class="userinfo-give">
            <div class="comments-userinfo">{{data.user.name}}</div>
            <div class="comments-give">
              <div class="img-give" @click="like(data)">
                <img v-if="data.iLike" src="../../static/img/give2.png">
                <img v-else src="../../static/img/give1.png">
              </div>
              <span v-if="data.replyLike">{{data.replyLike}}</span>
            </div>
          </div>
          <div class="comments-content">
            <span v-if="data.content">{{data.content}}</span>
            <span v-else>
              <template v-if="data.status === 'ADMIN_CANCEL'">该评论已被管理员删除</template>
              <template v-else>该评论已被用户删除</template>
            </span>
          </div>
          <div class="times-Reply">
              <div class="comments-times"><span>{{data.createTime | time}}</span></div>
              <div class="comments-reply" v-if="data.transactionReply.length" @click="multistage(data)">{{data.transactionReply.length}}回复</div>
              <div class="com-reply" v-else @click="multistage(data)">回复</div>
              <div class="comments-del" v-if="data.content" @click="del(data)">删除</div>
          </div>
          <div class="user-reply" v-if="data.transactionReply.length > 0">
            <template v-for="item in showTransactionReply">
            <div class="reply-info" :key="item.id">
              <div class="reply-name">{{item.user.name}}：</div>
              <div class="reply-content">{{item.content}}</div>
            </div>
            </template>
          </div>
      </div>
  </div>
</template>

<script>
import {Toast} from 'mand-mobile'
export default {
  name: 'UserComments',
  props: {
    data: {},
    give: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showTransactionReply () {
      let value = []
      if (this.data.transactionReply.length > 0) {
        let arr = this.data.transactionReply
        for (let i = 0; i < arr.length; i++) {
          if (i < 3) {
            value.push(arr[i])
          }
        }
      }
      return value
    }
  },
  methods: {
    like (val) {
      if (val.content) {
        this.$emit('like', {data: val})
      } else {
        Toast.failed('该评论已被删除')
      }
    },
    del (val) {
      this.$emit('del', {data: val})
    },
    multistage (val) {
      if (val.content) {
        this.$emit('multistage', {flag: false, parentId: val.id})
      } else {
        Toast.failed('该评论已被删除')
      }
    }
  },
  filters: {
    time (val) {
      let time = new Date(val)
      let mon = (time.getMonth() + 2)
      let day = time.getDate()
      let hou = time.getHours()
      let min = time.getMinutes()
      if (mon < 10) {
        mon = ('0' + mon)
      } else if (hou < 10) {
        hou = ('0' + hou)
      } else if (min < 10) {
        min = ('0' + min)
      }
      return `${mon}-${day}  ${hou}:${min} ·`
    }
  }
}

</script>
<style lang='stylus' scoped>
.user-comments
  text-align left
  display flex
  margin-right 0.25rem
  margin-left 0.25rem
  padding-top 0.3rem
  box-sizing border-box
.user-portrait
  margin-left 0.1rem
  margin-right 0.1rem
  img
    width 0.9rem
    height 0.9rem
    margin-top 0.3rem
    border-radius 50%
.comments-details
  flex 1
  display flex
  flex-direction column
  margin 0 0.15rem
.userinfo-give
  display flex
  justify-content space-between
  .comments-userinfo
    font-size 0.4rem
    color #1E90FF
  .comments-give
    display flex
    align-items center
    .img-give
      width 0.6rem
      height 0.6rem
      margin-right 0.1rem
      display flex
      align-items center
      img
        width 100%
        height 100%
    span
      font-size 0.4rem
      line-height 0.2rem
.comments-content
  font-size 0.42rem
  margin-top 0.18rem
.times-Reply
  margin-top 0.18rem
  display flex
  font 0.22rem/2 '微软雅黑'
  .comments-times
    margin-right 10px
  .comments-reply
    width 1.8rem
    border-radius 1rem
    background #F5F5F5
    text-align center
  .com-reply
    margin-left 0.1rem
  .comments-del
    margin-left 0.3rem
.user-reply
  display flex
  margin-top 0.3rem
  flex-direction column
  background #F5F5F5
  font-size 0.37rem
  min-height 1.1rem
  justify-content center
  border-radius 0.4rem
  .reply-info
    display flex
    align-items center
    margin 10px 20px
.reply-name
  color #1E90FF
  padding-right 0.1rem
  padding-left 0.15rem
</style>

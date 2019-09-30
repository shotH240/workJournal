<template>
  <div class="trade">
    <div ref="UserHeaderHeight">
      <Navigation bgcolor="#3dacff" color="#ffffff" :prevent-go-back="true" @on-click-back="$_goBack">
        {{$t('nav.tradeDetails')}}
        <i v-if="showDelt"
          slot="delt"
          @click="cencerDailog"
          class="vst-icon-delt"></i>
      </Navigation>
      <UserHeader :avatar="avatar" :gender="gender">
        <p slot="name">{{name}}</p>
        <p slot="userrName" v-if="$route.params.navName === 'tradeHall'">{{userName | hideUserInfo}}</p>
        <p slot="userrName" v-else>{{userName}}</p>
      </UserHeader>
    </div>
    <div class="stock">
      <div class="title" ref="titleHeight">
        <p class="base">
          {{orderParam.type === 'BUY' ? $t('tradeSyllable.buy') : $t('tradeSyllable.sale')}}
          {{companyName}} {{$t('tradeSyllable.stockRight')}}
          <span v-if="quantity === '--'">{{quantity}}</span>
          <md-amount v-else :value="quantity" :precision="0" has-separator></md-amount>
          {{$t('tradeSyllable.stock')}}
        </p>
        <p class="date">{{$t('tradeSyllable.issueDate')}}: {{tredeDetails.createDate | formatDT}}</p>
      </div>
      <TradeHall v-if="$route.params.navName === 'tradeHall'" :tradeRecorde='tradeRecorde' :tredeDetails="tredeDetails" :getHeight="getHeight"></TradeHall>
      <OrderResponse v-else-if="orderParam.ownerId === user.id" :tredeDetails="tredeDetails" :tradeRecorde='tradeRecorde' @_goSureTrade="_goSureTrade"></OrderResponse>
      <OrderOrigin v-else
        :status='status'
        :tradeRecorde='tradeRecorde'
        :tredeDetails="tredeDetails"
        :orderDateStart="orderDateStart"
        :orderDateEnd="orderDateEnd"
        @_goSureTrade="_goSureTrade">
      </OrderOrigin>
    </div>
    <md-popup v-model="isPopupShow">
      <myDailog type="cancelTrade" @close="keepTrade" @done="cancelTrade">
        <p class="title" slot="title">{{dailogTitle}}</p>
        <p class="info" slot="info">{{dailogContent}}</p>
      </myDailog>
    </md-popup>
    <write-comments class="write-comments" :isMsg="isMsg" :readOnly="readOnly" :msgLength="commentsList.length" @write="changeWrite" @read="changeRead" @allComments="allComments"></write-comments>
    <template v-for="item in showTransactionReply">
      <user-comments
        class="details-comments"
        :key="item.id"
        :data="item"
        @like="like"
        @del="delComments"
        @multistage="multistage"
        ></user-comments>
    </template>
    <div class="more-comments" v-if="showTransactionReply.length > 4" @click="allComments">查看所有评论</div>
  </div>
</template>

<script>
import {Swiper, SwiperItem, Button, Amount, Dialog, Popup, Toast} from 'mand-mobile'
import minixFilter from '../../components/minixFilter.js'
import UserHeader from '../../components/UserHeader.vue'
import Navigation from '../../components/Navigation.vue'
import myDailog from '../../components/dailog.vue'
import WriteComments from '../../components/WriteComments.vue'
import TradeHall from './TradeHall'
import OrderResponse from './OrderResponse'
import OrderOrigin from './orderOrigin'
import { cancelTransaction, cancelResponse } from '../../api/transaction'
import UserComments from '../../components/UserComments.vue'
import { list, like, add, del } from '../../api/comments'

let parentPath = '/'
export default {
  mixins: [minixFilter],
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [Button.name]: Button,
    [Amount.name]: Amount,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    UserHeader,
    Navigation,
    TradeHall,
    OrderResponse,
    OrderOrigin,
    myDailog,
    WriteComments,
    UserComments
  },
  data () {
    return {
      isPopupShow: false,
      dailogContent: '',
      dailogTitle: '',
      companyName: 'OPPO',
      createDate: '2018年5月2日',
      expiredDate: '2018年5月2日',
      quantity: '--',
      surplusQuantity: '--',
      precision: 0,
      tradeRecorde: [],
      name: '**',
      userName: this.$store.state.user.userName,
      ownUserId: '--',
      tredeDetails: {},
      avatar: '',
      gender: '',
      orderDateStart: '',
      orderDateEnd: '',
      status: '',
      getHeight: 0,
      readOnly: true,
      transactionId: '',
      commentsList: [],
      isReply: false,
      parentId: 0,
      isMsg: true
    }
  },
  created () {
    this.transactionId = this.$route.query.transactionId
    console.log('transactionId', this.transactionId)
    this.getTransactionList()
    if (this.$route.params.navName === 'myTrade') {
      this.myTradeDetails()
    } else if (this.$route.params.navName === 'tradeHall') {
      this.tradeHallDetails()
    }
  },
  mounted () {
    // this.getHeight = this.$refs.UserHeaderHeight.offsetHeight + this.$refs.titleHeight.offsetHeight
  },
  computed: {
    orderParam () {
      return this.$store.state.orderParam
    },
    user () {
      return this.$store.state.user
    },
    showDelt () {
      switch (this.$route.params.navName) {
        case 'myTrade':
          return (this.orderParam.ownerId === this.user.id && this.tradeRecorde.length < 1) || (this.orderParam.ownerId !== this.user.id && this.tradeRecorde.length === 2)
        default:
          return false
      }
    },
    showTransactionReply () {
      let value = []
      if (this.commentsList.length > 0) {
        let arr = this.commentsList
        for (let i = 0; i < arr.length; i++) {
          if (i < 5) {
            value.push(arr[i])
          }
        }
      }
      return value
    }
  },
  methods: {
    keepTrade () {
      this.isPopupShow = false
    },
    getTransactionList () {
      if (this.transactionId) {
        list({transactionId: this.transactionId, pageIndex: 1, pageSize: 10}).then((res) => {
          if (res.code === 200) {
            let data = JSON.parse(res.data)
            console.log('data', data)
            this.commentsList = data.rows
          }
        })
      }
    },
    cancelTrade () {
      this.isPopupShow = false
      switch (this.orderParam.ownerId === this.user.id) {
        case true:
          cancelTransaction({
            billNo: this.$route.params.billNo
          }).then(response => {
            if (response.code === 200) {
              // 取消交易后请求我所拥有股票信息刷新
              this.$store.dispatch('queryMyCompany')
              this.$Message.info(this.$t('tips.cancelIssue'))
              this.$router.push('/')
            } else {
              this.$Message.error(response.data)
            }
          })
          break
        default:
          cancelResponse({
            billNo: this.$route.params.billNo
          }).then(response => {
            if (response.code === 200) {
              // 取消交易后请求我所拥有股票信息刷新
              this.$store.dispatch('queryMyCompany')
              this.$Message.info(this.$t('tips.cancelRes'))
              this.$router.push('/')
            } else {
              this.$Message.error(response.data)
            }
          })
          break
      }
    },
    cencerDailog () {
      switch (this.orderParam.ownerId === this.user.id) {
        case true:
          this.dailogContent = this.$t('landscape.cancelInfo_1')
          this.dailogTitle = this.$t('landscape.cancelIssue')
          break
        default:
          this.dailogContent = this.$t('landscape.cancelInfo_3')
          this.dailogTitle = this.$t('landscape.cancelTrade')
          break
      }
      this.isPopupShow = true
    },
    $_goBack () {
      let path = parentPath
      console.log(parentPath)
      if (parentPath === '/tradeFrom/creactTrade' || parentPath.indexOf('tradeFrom/sureTrade') > -1 || parentPath.indexOf('tradeFrom/reactTrade') > -1) {
        path = '/mytrade'
      }
      this.$router.push(path)
    },
    _goSureTrade (data, list) {
      console.log(list)
      if (data) {
        let orderParam = {
          billNo: list.billNo,
          acountStock: list.actualQuantity,
          user: list.user
        }
        this.$store.commit('QUERYORDERDETAILPARAM', orderParam)
        this.$router.push(`/tradeFrom/sureTrade/${this.$route.params.billNo}`)
      }
    },
    //  根据单号查询我的交易详情
    myTradeDetails () {
      let that = this
      that.$store.dispatch('myTradeDetails', {
        billNo: that.$route.params.billNo
      }).then(data => {
        try {
          that.tradeRecorde = []
          switch (data.ownerId === that.user.id) {
            case true:
              that.status = data.header.status
              that.name = data.header.user.name
              that.avatar = data.header.user.avatar
              that.gender = data.header.user.gender
              that.userName = data.header.user.userName
              that.companyName = data.header.companyName
              that.quantity = data.header.quantity
              that.tradeRecorde = data.body.filter(element => (element.status === 'RESPONSED' || element.status === 'ORDER_SIGN' || element.status === 'SIGNED' || element.status === 'FINISHED'))
              that.tredeDetails = {
                createDate: data.header.createDate,
                expiredDate: data.header.expiredDate,
                surplusQuantity: data.header.surplusQuantity
              }
              break
            default:
              that.status = data.status
              that.name = data.user.name
              that.avatar = data.user.avatar
              that.gender = data.user.gender
              that.userName = data.user.userName
              that.companyName = data.companyName
              that.quantity = data.quantity
              that.orderDateStart = data.orderDateStart
              that.orderDateEnd = data.orderDateEnd
              that.tradeRecorde = data.historyStatus
              that.tredeDetails = {
                createDate: data.createDate,
                expiredDate: data.expiredDate,
                surplusQuantity: data.actualQuantity
              }
              break
          }
        } catch (err) {
          console.log(err)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //  根据单号查询交易大厅详情
    tradeHallDetails () {
      let that = this
      that.$store.dispatch('tradeHallDetails', {
        billNo: that.$route.params.billNo
      }).then(data => {
        try {
          that.tradeRecorde = []
          that.name = data.header.user.name
          that.avatar = data.header.user.avatar
          that.gender = data.header.user.gender
          that.userName = data.header.user.userName
          that.companyName = data.header.companyName
          that.quantity = data.header.quantity
          that.tradeRecorde = data.body.filter(element => (element.status === 'RESPONSED' || element.status === 'ORDER_SIGN' || element.status === 'SIGNED' || element.status === 'FINISHED'))
          that.tredeDetails = {
            createDate: data.header.createDate,
            expiredDate: data.header.expiredDate,
            surplusQuantity: data.header.surplusQuantity
          }
        } catch (err) {
          console.log(err)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 评论
    changeWrite (val) {
      this.readOnly = val
    },
    // 发起评论
    changeRead (val) {
      if (this.isReply) {
        add({transactionId: this.transactionId, content: val.data, parentId: this.parentId}).then((res) => {
          if (res.code === 200) {
            Toast.succeed('回复成功')
            this.getTransactionList()
            this.readOnly = !this.readOnly
          }
        })
      } else {
        add({transactionId: this.transactionId, content: val.data}).then((res) => {
          if (res.code === 200) {
            Toast.succeed('发布成功')
            this.getTransactionList()
            this.readOnly = !this.readOnly
          }
        })
      }
    },
    // 二级评论
    multistage (val) {
      this.readOnly = val.flag
      this.parentId = val.parentId
      this.isReply = true
    },
    // 所有评论
    allComments () {
      console.log('transactionId', this.transactionId)
      this.isMsg = false
      this.$router.push({path: '/tradeDetails/allComments', query: {transactionId: this.transactionId}})
    },
    // 用户点赞
    like (val) {
      like({transactionReplyId: val.data.id}).then((res) => {
        if (res.code === 200) {
          this.getTransactionList()
        }
      })
    },
    // 用户删除评论
    delComments (val) {
      del({id: val.data.id}).then((res) => {
        if (res.code === 200) {
          Toast.succeed('删除评论成功')
          this.getTransactionList()
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.trade
  background #f1eff2
@import '../../styles/tradeDetails'
.write-comments
  position fixed
  bottom 0px
.details-comments
  background #fff
  padding-top 0.44rem
.more-comments
  padding-top 0.4rem
  margin-bottom 1.1rem
  padding-bottom 0.2rem
  text-align center
  font-size 18px
  background #fff
  margin-right 0.25rem
  margin-left 0.25rem
  color #00BFFF
</style>

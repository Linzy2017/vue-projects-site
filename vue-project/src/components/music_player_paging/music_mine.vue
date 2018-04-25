<template>
  <scroller lock-x scrollbar-y ref="scroller" :height='scrollerHeight'>
    <div class="scroller_box">
      <div class="music_mine">
        <div class="mine_hd group">
          <div class="user_hd">
            <span class="icon_lv"><img src="../../assets/img/music_player/music_mine/icon_lv.png" alt="" ><em>lv6</em><span>39分钟</span></span>
            <img src="../../assets/img/music_player/music_mine/pic_head.png"  alt="头像"/>
            <span class="icon_diamonds"><img src="../../assets/img/music_player/music_mine/icon_diamonds.png" alt="">升级为豪华</span>
          </div>
          <div class="user_name">---&nbsp;&nbsp;Linzy&nbsp;&nbsp;---</div>
          <div class="user-vip">
            <img src="../../assets/img/music_player/music_mine/icon_greenlv1.png" />
            <img src="../../assets/img/music_player/music_mine/icon_musiclv1.png" />
          </div>
          <ul class="select_list">
            <li>
              <img src="../../assets/img/music_player/music_mine/icon_symbols.png" />
              <br/>
              <strong>全部歌曲</strong>
              <br/>
              <span>146</span>
            </li>
            <li>
              <img src="../../assets/img/music_player/music_mine/icon_download.png" />
              <br/>
              <strong>下载歌曲</strong>
              <br/>
              <span>7</span>
            </li>
            <li>
              <img src="../../assets/img/music_player/music_mine/icon_recently.png" />
              <br/>
              <strong>最近播放</strong>
              <br/>
              <span>197</span>
            </li>
            <li>
              <img src="../../assets/img/music_player/music_mine/icon_love.png" />
              <br/>
              <strong>我喜欢</strong>
              <br/>
              <span>12</span>
            </li>
            <li>
              <img src="../../assets/img/music_player/music_mine/icon_mv.png" />
              <br/>
              <strong>下载MV</strong>
              <br/>
              <span>&nbsp;</span>
            </li>
            <li>
              <img src="../../assets/img/music_player/music_mine/icon_buy.png" />
              <br/>
              <strong>已购音乐</strong>
              <br/>
              <span>&nbsp;</span>
            </li>
          </ul>
        </div>
        <ul class="group_list group">
          <li v-for="item in radio">
            <div class="group_images">
              <img :src="item.radioImages" alt="">
            </div>
            <div class="group_content">
              <div class="group_title">{{item.radioTitle}}</div>
              <div class="group_details">{{item.radioContent}}</div>
            </div>
          </li>
        </ul>
        <div class="song_sheet group">
          <div class="sheet_select">
            <strong>自建歌单</strong>
            <span>|</span>
            <strong>收藏歌单</strong>
            <div class="sheet_add">
              <img src="../../assets/img/music_player/public/icon_add.png" alt="">
            </div>
            <div class="sheet_list">
              <img src="../../assets/img/music_player/public/icon_list.png" alt="">
            </div>
          </div>
          <ul class="group_list">
            <li v-for="item in sheet">
              <div class="group_images">
                <img :src="item.sheetImages" alt="">
              </div>
              <div class="group_content">
                <div class="group_title">{{item.sheetName}}</div>
                <div class="group_details">{{item.songNum}}</div>
              </div>
              <i class="fa fa-angle-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script type="text/ecmascript-6">
import  { Scroller} from 'vux'
import  Vue from 'vue'
export default {
  created() {
    this.$store.commit('PAGE_INDEX',0)
  },
  components: {
    Scroller
  },
  data() {
    return {
      scrollerHeight: String(-parseInt(htmlFontSize)*2.4),
      radio: [
        {
          radioImages: require('../../assets/img/music_player/music_mine/pic_diantai1.png'),
          radioTitle: '个性电台',
          radioContent: '来听听专门为你制定的音乐吧'
        },
        {
          radioImages: require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          radioTitle: '跑步电台',
          radioContent: 'QQ音乐×Nike，让运动乐在其中'
        }
      ],
      sheet: [
        {
          sheetImages:require('../../assets/img/music_player/music_mine/pic_diantai1.png'),
          sheetName: 'jj',
          songNum: 10
        },
        {
          sheetImages:require('../../assets/img/music_player/music_mine/pic_diantai1.png'),
          sheetName: 'jj',
          songNum: 10
        },
        {
          sheetImages:require('../../assets/img/music_player/music_mine/pic_diantai1.png'),
          sheetName: 'jj',
          songNum: 10
        },          {
          sheetImages:require('../../assets/img/music_player/music_mine/pic_diantai1.png'),
          sheetName: 'jj',
          songNum: 10
        },
        {
          sheetImages:require('../../assets/img/music_player/music_mine/pic_diantai1.png'),
          sheetName: 'jj',
          songNum: 10
        },
        {
          sheetImages:require('../../assets/img/music_player/music_mine/pic_diantai1.png'),
          sheetName: '默认',
          songNum:  0
        }
      ]
    }
  },
  methods: {
      test: function () {
        this.$vux.alert.show({
          title: 'Vux is Cool',
          content: 'Do you agree?',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
      }
  }
}
</script>

<style lang="scss">
.music_mine{
  .mine_hd{
    padding-top: .25rem;
    .user_hd{
      position: relative;
      left: .15rem;
      > img{
        width: .95rem;
        height: .95rem;
        margin: 0 .35rem;
        vertical-align: middle;
      }
      > span {
        position: relative;
        display: inline-block;
        padding: .1rem;
        border: 1px solid #dedede;
        border-radius: .3rem;
        em{
          position: absolute;
          left: .25rem;
          top: .2rem;
          color: #31c27c;
        }
        img{
          width: .4rem;
          height: .3rem;
          margin-right: .05rem;
        }
      }
    }
    .user_name{
      margin-top: .2rem;
      font-size: .35rem;
    }
    .user-vip img{
      margin-top: .1rem;
      width: .36rem;
      height: .31rem;
    }
    .select_list{
      margin-top: .4rem;
      li{
        display: inline-block;
        width: 2rem;
        margin-bottom: .4rem;
        img{
          width: .6rem;
          margin-bottom: .1rem;
        }
        strong{
          font-size: .28rem;
          font-weight: 500;
        }
        span{
          color: #c7c7c7;
        }
      }
    }
  }
  .group_list{
    line-height: inherit;
    li{
      display: flex;
      height: 1.1rem;
      align-items: center;
      .group_images{
        height: 1.1rem;
        img{
          width: 1.1rem;
        }
      }
      .fa-angle-right{
        position: relative;
        left: -.2rem;
        font-size: .34rem;
      }
      .group_content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        line-height: normal;
        margin-left: .2rem;
        text-align: left;
        border-bottom: 1px solid #dedede;
        .group_title{
          font-size: .27rem;
          font-weight: 600;
        }
        .group_details{
          color: #cccccc;
        }
      }
    }
  }
  .song_sheet{
    position: relative;
    line-height: .8rem;
    font-size: .28rem;
    strong {
      font-weight: 500;
    }
    .sheet_select{
      border-bottom: 1px solid #dedede;
      > div{
        position: absolute;
        top: .25rem;
        width: .3rem;
        height:.3rem;
        line-height: 0;
        img{
          width: 100%;
          height:100%;
        }
      }
      .sheet_add{
        right: 1rem;
      }
      .sheet_list{
        right: .4rem;
      }
    }
  }
}
</style>

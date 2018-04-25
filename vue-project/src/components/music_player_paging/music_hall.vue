<template>
  <scroller lock-x scrollbar-y ref="scroller" :height="scrollerHeight">
    <div class="scroller_box">
      <div class="music_hall">
        <swiper :aspect-ratio="300/800" auto loop dots-position="center" dots-class="swiper_dots">
          <swiper-item class="swiper_img" v-for="(item, index) in swiper_list" :key="index"><img :src="item"></swiper-item>
        </swiper>
        <ul class="hall_list">
          <li>
            <img src="../../assets/img/music_player/music_hall/icon_singer.png"/>
            <span>歌手</span>
          </li>
          <li>
            <img src="../../assets/img/music_player/music_hall/icon_rank.png"/>
            <span>排行</span>
          </li>
          <li>
            <img src="../../assets/img/music_player/music_hall/icon_radio.png"/>
            <span>电台</span>
          </li>
          <li>
            <img src="../../assets/img/music_player/music_hall/icon_classify.png"/>
            <span>分类歌单</span>
          </li>
          <li>
            <img src="../../assets/img/music_player/music_hall/icon_mv.png"/>
            <span>视频MV</span>
          </li>
          <li>
            <img src="../../assets/img/music_player/music_hall/icon_album.png"/>
            <span>数字专辑</span>
          </li>
        </ul>
        <div class="hot_nominate_hd">
          <span>热&nbsp;门&nbsp;推&nbsp;荐</span>
          <i class="fa fa-chevron-right"></i>
        </div>
        <ul class="hot_music_list">
          <li v-for="(item, index) in hot_music">
            <div><img :src="item.music_image" alt=""></div>
            <div class="content">{{item.music_content}}</div>
          </li>
        </ul>
      </div>
    </div>
  </scroller>
</template>

<script type="text/ecmascript-6">
import { Scroller, Swiper, SwiperItem} from 'vux'
export default {
  components: {
    Swiper,
    SwiperItem,
    Scroller
  },
  data() {
    return {
      scrollerHeight: String(-parseInt(htmlFontSize)*2.4),
      swiper_list: [
        require('../../assets/img/music_player/music_hall/swiper1.jpg'),
        require('../../assets/img/music_player/music_hall/swiper2.jpg'),
        require('../../assets/img/music_player/music_hall/swiper3.jpg'),
        require('../../assets/img/music_player/music_hall/swiper4.jpg'),
        require('../../assets/img/music_player/music_hall/swiper5.jpg')
      ],
      hot_music: [
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        },
        {
          music_image:require('../../assets/img/music_player/music_mine/pic_diantai2.png'),
          music_content: '雪下得那么深  你会否听得很认真全世界的离人都哼着我的心疼可谁看到我憔悴了几分'
        }
      ]
    }
  },
  created(){
      this.$store.commit('PAGE_INDEX',1)
    console.log(this.scrollerHeight)
  }
}
</script>

<style lang="scss">
.music_hall{
  background: #ffffff;
  padding-bottom: 3rem;
  .swiper_img img{
    width: 100%;
    height: 100%;
  }
  .swiper_dots{
    > a{
      i.vux-icon-dot{
        opacity: .5;
        background-color: #ffffff;
      }
      i.vux-icon-dot.active{
        opacity: 1;
        background-color: #ffffff;
      }
    }
  }
  ul.hall_list {
    margin-top: .4rem;
    li{
      display: inline-block;
      width: 2.05rem;
      padding-left: .25rem;
      margin-bottom: .4rem;
      text-align: left;
      img{
        width: .5rem;
        vertical-align: middle;
        margin-right: .05rem;
      }
      span{
        font-size: .26rem;
      }
    }
  }
  .hot_nominate_hd{
    position: relative;
    height: .6rem;
    line-height: .6rem;
    font-size: .32rem;
    span{
      font-size: .32rem;
    }
    i{
      position: absolute;
      right: .3rem;
      top:.16rem;
      font-size: .28rem;
    }
  }
  .hot_music_list{
    text-align: left;
    li{
      display: inline-block;
      width: 33%;
      height: 3.1rem;
      margin-right: .02rem;
      img{
        width: 100%;
      }
      .content{
        display: -webkit-box;
        width: 100%;
        padding: 0 .06rem;
        text-align: left;
        font-size: .22rem;
        color: #807d7d;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>

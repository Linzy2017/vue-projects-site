<template>
  <div class="music_player">
    <transition
      v-on:before-enter="menuBefore"
      v-on:enter="menuEnter"
      v-on:leave="menuLeave">
      <div class="menu" v-if="isMenu">
        <div class="hd">
          <div class="item">
            <div class="imgGroup"><img src="../../assets/img/music_player/menu/icon_vip.png" :width="79 * ratio_PX_to_Rem"></div>
            <p>升级为VIP</p>
            <div class="other">豪华绿钻已过期</div>
          </div>
          <div class="item">
            <div class="imgGroup"><img src="../../assets/img/music_player/menu/icon_dress.png" alt="" :width="74 * ratio_PX_to_Rem"></div>
            <p>个性化中心</p>
            <div class="other">默认皮肤</div>
          </div>
          <div class="item">
            <div class="imgGroup"><img src="../../assets/img/music_player/menu/icon_mes.png" alt="" :width="64 * ratio_PX_to_Rem"></div>
            <p>消息中心</p>
            <div class="other"></div>
          </div>
        </div>
        <div class="content">
          <group :labelWidth="200 * ratio_PX_to_Rem+'px'" labelAlign="left">
            <x-switch title="仅在Wi-Fi联网" v-model="isOnlyWifi"></x-switch>
            <x-switch title="定时关闭" v-model="isTiming"></x-switch>
            <cell title="免流量服务"  @click.native=""></cell>
            <cell title="微云音乐网盘"  @click.native=""></cell>
            <cell title="传歌到手机"  @click.native=""></cell>
            <cell title="QPlay与车载音乐"  @click.native=""></cell>
            <cell title="清理占用空间"  @click.native=""></cell>
            <cell title="帮助与反馈"  @click.native=""></cell>
            <cell title="关于QQ音乐"  @click.native=""></cell>
          </group>
        </div>
        <div class="footer">
          <div class="item">
            <img src="../../assets/img/music_player/menu/icon_setting.png" :width="43 * ratio_PX_to_Rem">
            <span>设置</span>
          </div>
          <div class="item">
            <img src="../../assets/img/music_player/menu/icon_quit.png"  :width="44 * ratio_PX_to_Rem">
            <span>退出QQ</span>
          </div>
        </div>
      </div>
    </transition>
    <div class="container">
      <div class="mask" v-if="isMenu" @click.stop="isMenu = !isMenu"></div>
      <div class="music_hd">
        <!--点击搜索进入discover页面掩藏导航栏-->
        <ul :class="{'isSearch_on': isSearch,'isSearch_off': !isSearch&&!firstIn}">
          <li class="icon" @click.stop="isMenu = !isMenu">
            <i class="fa fa-bars" v-if="!isSearch"></i>
          </li>
          <router-link to="/music_player/music_mine" tag="li" :class="{'active': pageIndex === 0}">我的</router-link>
          <router-link to="/music_player/music_hall" tag="li" :class="{'active': pageIndex === 1}">音乐馆</router-link>
          <router-link to="/music_player/music_discover" tag="li" :class="{'active': pageIndex === 2}">发现</router-link>
          <li class="icon">
            <i class="fa fa-plus" v-if="!isSearch"></i>
          </li>
        </ul>
        <div class="search_button" :class="{ 'search_button_none' :isSearch,'search_button_show' :!isSearch&&!firstIn}" @click.stop="search">
          <router-link v-if="!isSearch" to="/music_player/music_search">
            <span class="goToDiscover" :class="{'a_on': !isSearch&&!firstIn}"><i class="fa fa-search"></i>搜索</span>
          </router-link>
          <input v-if="isSearch" type="text" placeholder="搜索音乐、歌词、歌单"/>
          <i v-if="isSearch" class="fa fa-microphone"></i>
          <span @click.stop="cancel">
          <span v-if="isSearch"  class="search_cancel">取消</span>
        </span>
        </div>
      </div>
      <div class="music_content">
        <!--下拉刷新框-->
        <router-view></router-view>
      </div>
      <div class="player" ref="player">
        <div class="song_img"><img :class="{'pause' : !isPlaying}" :src="songs[playingIndex].songsImg"/></div>
        <div class="song_mes">{{songs[playingIndex].songsName}}</div>
        <div class="btn_control playMusic" @click.stop="playMusic" v-if="!isPlaying"><img :src="controlImgSrc[0]"/></div>
        <div class="btn_control stopMusic" @click.stop="stopMusic" v-if="isPlaying"><img :src=" controlImgSrc[1]"/></div>
        <div class="btn_historyList"><img src="../../assets/img/music_player/public/music_player_more.png"/></div>
      </div>
      <audio :src="songs[playingIndex].mp3Src" ref="musicPlayer" @ended="audioEnd()"></audio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Actionsheet,  XSwitch, Group,Cell} from 'vux'
import  Velocity from 'velocity-animate'  // 动画
export default {
  created() {

  },
  components: {
    Actionsheet,
    Group,
    XSwitch,
    Cell
  },
  data() {
    return{
      isMenu: false,
      isTiming: false,
      isOnlyWifi: false,
      ratio_PX_to_Rem: parseInt(htmlFontSize)/100,
      firstIn: true,
      isSearch: false,
      isPlaying:false,
      playingIndex: 0,
      controlImgSrc : [
        require('../../assets/img/music_player/public/icon_play.png'),
        require('../../assets/img/music_player/public/icon_stop.png')
      ],
      songs: [
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper1.jpg'),
          songsName: '思念是一种病',
          mp3Src: require('../../assets/mp3/music_1.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper2.jpg'),
          songsName: '当我唱起这首歌',
          mp3Src: require('../../assets/mp3/music_2.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper3.jpg'),
          songsName: '小幸运',
          mp3Src: require('../../assets/mp3/music_3.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper4.jpg'),
          songsName: '生活不止眼前的苟且',
          mp3Src: require('../../assets/mp3/music_4.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper5.jpg'),
          songsName: '认真的雪',
          mp3Src: require('../../assets/mp3/music_5.mp3'),
        },
        {
          songsImg: require('../../assets/img/music_player/music_hall/swiper3.jpg'),
          songsName: '再见',
          mp3Src: require('../../assets/mp3/music_6.mp3'),
        }
      ]
    }
  },
  computed: {
    //根据返回的pageIndex实现分页
    pageIndex: function () {
      return this.$store.state.main_store.page_index
    }
  },
  methods: {
    search: function () {
      this.isSearch = true
      this.firstIn = false
    },
    cancel: function () {
      this.isSearch = false
      history.go(-1);
    },
    playMusic(){
      let audio =this.$refs.musicPlayer;
      if(!this.isPlaying){
        audio.play();
        this.isPlaying = true;
      }
    },
    stopMusic(){
      let audio =this.$refs.musicPlayer;
      if(this.isPlaying){
        audio.pause();
        this.isPlaying = false;
      }
    },
    audioEnd() {
      let audio =this.$refs.musicPlayer;
      let songsLength = this.songs.length;
      this.playingIndex++;
      if(this.playingIndex >= songsLength)
        this.playingIndex = 0;
      audio.play();
    },
    menuBefore: function (el) {
      el.style.visibility = 'hidden';
      el.style.display = 'none';
      el.style.width = 0;
    },
    menuEnter: function (el, done) {
      el.style.display = 'block';
      el.style.visibility = 'visible';
      Velocity(el, { width: '84%'}, { duration: 300 });
    },
    menuLeave: function (el, done) {
      el.style.visibility = 'hidden';
      console.log(el.style.width);
      Velocity(el, { width: 0}, { duration: 300 })
      Velocity(el, { display:  'none'}, { complete: done })
    }
  }
}
</script>

<style lang="scss">
@mixin keyframes($animationName) {
  @-webkit-keyframes #{$animationName} {
    @content;
  }
  @-moz-keyframes #{$animationName} {
    @content;
  }
  @-o-keyframes #{$animationName} {
    @content;
  }
  @keyframes #{$animationName} {
    @content;
  }
}
@include keyframes(opacity_change) {
  0% {
   opacity: 0;
  }
  100% {
   opacity: 1;
  }
}
@include keyframes(circle) {
  0%{
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
}
body{
  height: 100vh;
  overflow: hidden;
}
.music_player {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  .menu{
    width: 84%;
    .hd{
      display: flex;
      justify-content: space-around;
      min-height: 3rem;
      padding: .75rem .2rem 0;
      font-size: .22rem;
      .item{
        min-width: 33%;
        .imgGroup{
          min-height: .9rem;
        }
        .other{
          font-size: .15rem;
          color: rgb(202,202,202);
        }
      }
    }
    .content{
      margin: 0 .4rem;
      padding: 6.5vh 0;
      border-top: 1px solid rgb(230,230,230);
      border-bottom: 1px solid rgb(230,230,230);
      .weui-cells{
        margin-top: 0;
        font-size: .24rem;
        > div{
          height: .65rem;
        }
        &:before,&:after{
            display: none;
          }
        .weui-cell{
          padding: 0;
          &:before,&:after{
            display: none;
          }
        }
        .weui-label{
          font-size: .24rem;
        }
      }
    }
    .footer{
      display: flex;
      justify-content: space-between;
      padding: .3rem .4rem 0;
      font-size: .24rem;
      .item{
        img{
          vertical-align: middle;
          margin-right: .1rem;
        }
      }
    }
  }
  .container{
    .mask{
      z-index: 2;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .music_hd {
      position: absolute;
      top: 0;
      width: 100%;
      padding-bottom: .1rem;
      background: #31c27c;
      ul.isSearch_on{
        animation: ulHeight_on .25s ease-out;
        animation-fill-mode: forwards;
        @include keyframes(ulHeight_on) {
          0% {
            visibility:inherit;
            height: 7vh;
          }
          100% {
            height: 0;
            visibility:hidden;
          }
        }
      }
      ul.isSearch_off{
        animation: ulHeight_off .25s ease-out;
        animation-fill-mode: forwards;
        @include keyframes(ulHeight_off) {
          0% {
            height: 0;
            visibility:hidden;
          }
          100% {
            visibility:inherit;
            height: 7vh;
          }
        }
      }
      ul {
        position: relative;
        display: flex;
        height: 7vh;
        align-items: center;
        justify-content: center;
        .icon {
          position: absolute;
          top: .15rem;
          margin: 0;
          font-size: .35rem;
          &:first-child {
            left: .2rem;
          }
          &:last-child {
            right: .2rem;
          }
        }
        li {
          margin-right: .5rem;
          font-size: .25rem;
          color: #ffffff;
          &:nth-child(4) {
            margin: 0;
          }
        }
        li.active{
          font-size: .27rem;
          font-weight: bold;
        }
      }
      .search_button {
        position: relative;
        width: 94%;
        height: .5rem;
        margin-left: 3%;
        font-size: .23rem;
        border-radius: .05rem;
        color: #ffffff;
        background: #2bad6e;
        .a_on{
          animation: a_on .8s ease-out;
          animation-fill-mode: forwards;
          @include keyframes(a_on) {
            0% {
              left: .15rem;
            }
            100% {
              left: 2.6rem;
            }
          }
        }
        .goToDiscover{
          position: absolute;
          top: .07rem;
          left: 2.6rem;
        }
        a {
          position: relative;
          display: inline-block;
          width: 100%;
          height:100%;
          text-align: center;
          color: #ffffff;
        }
        i {
          font-size: .3rem;
          margin-right: .1rem;
        }
      }
      .search_button_show{
        animation: input_width_off .5s ease-out;
        animation-fill-mode: forwards;
        @include keyframes(input_width_off) {
          0% {
            width: 82%;
          }
          100% {
            width: 94%;
          }
        }
      }
      .search_button_none {
        display: flex;
        align-items: center;
        margin-top: .1rem;
        text-align: end;
        line-height: 4vh;
        animation: input_width_on .5s ease-out;
        animation-fill-mode: forwards;
        @include keyframes(input_width_on) {
          0% {
            width: 94%;
          }
          100% {
            width: 82%;
          }
        }
        .fa-microphone{
          position: absolute;
          top: .13rem;
          right: 0;
          opacity: 0;
          animation: opacity_change .25s ease-out .25s;
          animation-fill-mode: forwards;
        }
        input {
          @mixin input_placeholder_color {
            color: #ffffff;
            opacity: .8;
          }
          position: absolute;
          left: 1.8rem;
          top: .1rem;
          color: #ffffff;
          background: #2bad6e;
          animation: input_left_change .25s ease-out;
          animation-fill-mode: forwards;
          @include keyframes(input_left_change) {
            0% {
              left: 1.8rem
            }
            100% {
              left: .15rem;
            }
          }
          &::-webkit-input-placeholder {
            @include input_placeholder_color;
          }
          &:-moz-placeholder {
            @include input_placeholder_color;
          }
          &::-moz-placeholder {
            @include input_placeholder_color;
          }
          &:-ms-input-placeholder {
            @include input_placeholder_color;
          }
        }
        .search_cancel {
          position: absolute;
          top: .1rem;
          right: -.7rem;
          width: 10%;
        }
      }
    }
    .music_content{
      position: absolute;
      top: 12vh;
      width: 100%;
      background: #dedede;
      overflow: hidden;
    }
    .music_content > div{
    }
    .group{
      background: #ffffff;
      margin-bottom: .04rem;
      &:last-child{
        margin-bottom: 1rem;
      }
    }
    .player{
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1.1rem;
      background: #f9f8f9;
      border-top: 1px solid #a9a5a5;
      .song_img .pause {
        animation-play-state: paused;
      }
      .song_img img{
        width: .75rem;
        height: .75rem;
        margin-left: .1rem;
        border-radius: 50%;
        animation:circle 2s infinite linear;
      }
      .song_mes{
        flex-basis: 3.5rem;
        text-align: left;
        font-size: .28rem;
      }
      .btn_control img{
        width: .55rem;
        height: .55rem;
      }
      .btn_historyList img{
        width: .5rem;
        height: .45rem;
        margin-right: .2rem;
      }
    }
  }
}
</style>

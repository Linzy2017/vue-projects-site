<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-view {
    width: 100vw;
    height: 100vh;
    font-size: 0;
  }
  .btn{
    position: absolute;
    left: 0;
    top:0;
    font-size: .26rem;
  }
  .restart{
    top:1rem;
  }
  .timer{
    position: absolute;
    left: 50%;
    top: 1rem;
    font-size: .26rem;
    color: red;
    font-weight: bold;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .score{
    position: absolute;
    left: 50%;
    top: .5rem;
    font-size: .26rem;
    color: red;
    font-weight: bold;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
</style>

<template>
  <div class="hello">
    <v-touch class="my-view"
             v-on:panstart="onPanStart"
             v-on:pan="onPan"
             v-on:panend="onPanEnd"
    >
      <div class="my-view" ref="myView"></div>
    </v-touch>
    <div class="btn"  @click.stop="startGame">开始游戏</div>
    <div class="btn restart" @click.stop="restartGame">再来一次</div>
    <div class="timer">{{gameTime}}</div>
    <div class="score">{{score}}</div>
  </div>
</template>

<script>
  import {Application, loader, Sprite, utils, Container, Graphics, Text} from 'pixi.js'
  import hidpi from '../../static/js/hidpi-canvas.js'
  import bg from '../../static/images/bg_game.jpg'
  import VueTouch from 'vue-touch'
  import Vue from 'vue'

  Vue.use(VueTouch, {name: 'v-touch'})
  export default {
    name: 'Stage',
    data() {
      return {
        //屏幕自适应比
        windowBase: window.adaptive.newBase,
        //画布高度
        c_height: 1036 * window.adaptive.newBase / 100,
        //画布宽度
        c_width: 640 * window.adaptive.newBase / 100,
        //hidpi比率 使画布更清晰
        scale: null,
        //pixi对象
        app: null,
        //pixi reources对象
        resources: loader.resources,
        //整个小车
        player: null,
        //小车头上接东西的部位
        playerHit: null,
        //图片资源
        images: {
          bg: require('../../static/images/bg_game.jpg'),
          player: require('../../static/images/item_car.png'),
          bomb: require('../../static/images/item_bomb.png'),
          milk: require('../../static/images/item_milk.png'),
          ticket: require('../../static/images/item_ticket.png')
        },
        //坠落物分类
        items: [
          {
            image: require('../../static/images/item_milk.png'),
            score: 3
          },
          {
            image: require('../../static/images/item_ticket.png'),
            score: 2
          },
          {
            image: require('../../static/images/item_bomb.png'),
            score: -5
          }
        ],
        //已创建的坠落物
        itemCreated: [],
        //坠落物创建定时器
        IntervalName: null,
        //游戏暂停状态
        paused: true,
        //接到东西生成的信息
        messageArr: [],
        //比分
        score: 0,
        //屏幕坐标
        pageX: null,
        pageY: null,
        //小车屏幕移动初始坐标
        moveX: null,
        //触摸状态
        pan: true,
        //定时器游戏时间
        IntervalTimer: null,
        gameTime: 30
      }
    },
    methods: {
      startGame: function () {
        this.paused = false
        //创建坠落物
        this.IntervalName = setInterval(() => {
          if (this.paused && this.IntervalName !== 0) {
            window.clearInterval(this.IntervalName)
            this.IntervalName = 0;
            return false;
          }

          this.createItem()
        }, 500);

        this.IntervalTimer = setInterval(() => {
          if (this.gameTime <= 0 && this.IntervalTimer !== 0) {
            window.clearInterval(this.IntervalTimer)
            this.IntervalTimer = 0;
            this.paused = true
            return false;
          }

          --this.gameTime
        }, 1000)

      },
      restartGame: function () {
        //已创建的坠落物
        this.itemCreated = []
        //坠落物创建定时器
        this.IntervalName =  null
        //游戏暂停状态
        this.paused = false
        //接到东西生成的信息
        this.messageArr = []
        //比分
        this.score = 0
        //屏幕坐标
        this.pageX = null
        this.pageY = null
        //小车屏幕移动初始坐标
        this.moveX = null
        //触摸状态
        this.pan = true
        //定时器游戏时间
        this.IntervalTimer = null
        this.gameTime = 10
      },
      onPanStart: function (e) {
        this.pageX = e.center.x * 100 / this.windowBase * this.scale
        this.pageY = e.center.y * 100 / this.windowBase * this.scale
        this.moveX = e.deltaX + this.player.x

        //判断是否触摸到小车
        if (this.pageX < this.player.x ||
          this.pageX > this.player.x + this.player.width ||
          this.pageY < this.player.y ||
          this.pageY > this.player.y + this.player.height) {
          this.pan = false
        } else {
          this.pan = true
        }
      },
      onPan: function (e) {

        if (this.paused && this.messageArr.length <= 0 && this.itemCreated.length <= 0) {
          return false;
        }


        if (!this.pan) {
          return false
        }
        let newX =  this.moveX + e.deltaX * this.scale * 1.3
        if (newX < -90 * this.scale) {
          newX = -90 * this.scale
        } else if (newX > this.c_width - this.playerHit.width - 90 * this.scale) {
          newX = this.c_width - this.playerHit.width - 90 * this.scale
        }
        this.player.x = newX
        this.playerHit.x = newX + 90 * this.scale
      },
      onPanEnd: function () {

      },
      getPixelRatio: function (context) {
        let backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
      },
      init: function () {
        let domView = this.$refs.myView;
        // 获取view宽度高度
        let domViewWidth = domView.offsetWidth;
        let domViewHeight = domView.offsetHeight;
        // 初始化画布
        this.app = new Application({
          width: domViewWidth,
          height: domViewHeight,
          antialiasing: true,
          transparent: false, // 背景是否透明
          resolution: 1,
          // 色值：0x表示16进制, 后面是#+cccccc;ox7e6b5a
          backgroundColor: 0x7e6b5a
        });
        domView.appendChild(this.app.view)
        //高清屏的适配
        let canvas = document.querySelector('canvas')
        let ctx = canvas.getContext('2d')
        let ratio = this.getPixelRatio(ctx)
        this.scale = this.windowBase / 100 * ratio

        //适配后的画布高宽
        this.c_height *= ratio
        this.c_width *= ratio

        // 加载图片,并等待将精灵添加到舞台
        loader
          .add(this.images.bg)
          .add(this.images.player)
          .add(this.images.bomb)
          .add(this.images.milk)
          .add(this.images.ticket)
          .load(this.setup);
      },
      resizes() {
        // 获取view宽度高度
        let domView = this.$refs.myView;
        let domViewWidth = domView.offsetWidth;
        let domViewHeight = domView.offsetHeight;
        this.app.renderer.autoResize = true;
        this.app.renderer.resize(domViewWidth - 120, domViewHeight)
      },
      setup: function () {
        this.createBg()

        this.createPlayer()

//        this.createItem()

        //Start the game loop
        this.app.ticker.add((delta) => {
          if (this.paused && this.messageArr.length <= 0 && this.itemCreated.length <= 0) {
            return false;
          }

          this.gameLoop(delta)
        });
      },
      gameLoop: function (delta) {
        this.play(delta)
      },
      play: function (delta) {
        this.itemCreated.forEach((value, key) => {
          value.y += value.vy;
          if (this.hitTestRectangle(this.playerHit, value)) {
            this.createMessage(this.playerHit, value) // 创建得分
//            playAudio(value) // 播放效果音
            this.score = this.score + value.score
            this.itemCreated.splice(key, 1);
            this.app.stage.removeChild(value);
          }
          this.outArea(value, key)
        })

        this.messageArr.forEach((value, key) => {
          if (value.alpha < 0) {
            this.messageArr.splice(key, 1);
            this.app.stage.removeChild(value);
          }
          value.y += value.vy;
          value.alpha -= 0.01;
        })
      },
      outArea: function (item, index) {
        if (item.y > (this.c_height)) {
          this.itemCreated.splice(index, 1);
          this.app.stage.removeChild(item);
        }
      },
      createMessage: function (playerHit, value) {
        let message = new Text(
          value.score > 0 ? '+' + value.score : value.score,
          {font: 80 * this.scale + "px 微软雅黑", fill: value.score > 0 ? "#ec6941" : "#000"}
        );
        message.x = this.playerHit.x;
        message.y = this.playerHit.y - 150 * this.scale;
        message.vy = -1 * this.scale;
        this.messageArr.push(message);
        this.app.stage.addChild(message);
      },
      createBg: function () {
        let _this = this
        let bg = new Sprite(_this.resources[_this.images.bg].texture);
        bg.scale.x = bg.scale.y = _this.scale;
        this.app.stage.addChild(bg);
      },
      createPlayer: function () {
        let _this = this
        this.player = new Container();
        this.player = new Sprite(_this.resources[_this.images.player].texture);
        this.player.y = this.c_height - (this.player.height + 80) * this.scale;
        this.player.x = this.c_width / 2 - (this.player.width / 2) * this.scale;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.scale.x = this.player.scale.y = this.scale;
        this.app.stage.addChild(this.player);

        this.playerHit = new Graphics();
        this.playerHit.drawRect(0, 0, 90 * this.scale, 80 * this.scale);
        this.playerHit.endFill();
        this.playerHit.x = this.player.x + 90 * this.scale
        this.playerHit.y = this.player.y
        this.app.stage.addChild(this.playerHit);
      },
      createItem: function () {
        //增加游戏难度 约到后面 速度最大值变大 炸弹出现的概率变大
        let v_ratio = 1 + (30 - this.gameTime) / 30

        let _this = this
        let random = Math.floor(Math.random() * _this.items.length  * v_ratio)
        random = random >= 2 ? 2 : random
        let item = new Sprite(_this.resources[_this.items[random].image].texture);
        let randomX = Math.random() * (_this.c_width - item.width * _this.scale)
        let randomSpeedY = (Math.random() * v_ratio + 2) * 2 * _this.scale
        item.y = -item.height * _this.scale;
        item.x = randomX;
        item.vx = 0;
        item.vy = randomSpeedY;
        item.score = _this.items[random].score;
        item.scale.x = item.scale.y = _this.scale;
        _this.itemCreated.push(item)
        _this.app.stage.addChild(item);
      },
      hitTestRectangle: function (r1, r2) {
        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

          //A collision might be occuring. Check for a collision on the y axis
          if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
          } else {

            //There's no collision on the y axis
            hit = false;
          }
        } else {

          //There's no collision on the x axis
          hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
      }
    },
    mounted() {
      let _this = this;
      this.init();
      window.onresize = () => {
        _this.resizes();
      }
    }
  }
</script>

<template>
  <div class="home">
    <img src="../../assets/img/logo.png">
    <div class="btn_group">
      <router-link to="music_player" class="home_button">musicPlayer</router-link>
    </div>
    <uploader
      :max="2"
      :handle-click="false"
      :show-header="false"
      :autoUpload = 'false'
      :readonly="false"
      size="small"
      @upload-image="addImageMethod"
    ></uploader>
    <div class="btn" @click.stop="addImageMethod">上传</div>
    <input type="file">
  </div>
</template>

<script type="text/ecmascript-6">
  import Uploader from 'vux-uploader'
  export default {
    components: {
        Uploader,
    },
    data () {
        return {
        }
    },
    methods: {
      addImageMethod: function (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="scss">
.home_button{
  display: inline-block;
  width: 2rem;
  height:.5rem;
  line-height: .5rem;
  font-size: .27rem;
  text-align: center;
  color: #ffffff;
  background: #a5a5a5;
  border-radius: .05rem;
}
</style>

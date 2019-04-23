<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div  class="fixed-header">
      <navbar/>
    </div>
    <sidebar class="sidebar-container"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container">

      <div class="left-warp">
          <ul>
            <li v-for="(item,index) in leftArr" @click="clickTab(item,index)"
                :class="{'active':item.flag===true}" :key="index">
              {{item.text}}
            </li>
          </ul>
        </div>
      <div class="right-warp">
        <!--侧边栏click menu-->
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
                   @toggleClick="toggleSideBar"/>
        <!--面包屑导航-->
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
          <app-main/>
        </div>
      <right-panel v-if="showSettings">
        <settings/>
      </right-panel>
    </div>
  </div>
</template>

<script>
  import RightPanel from '@/components/RightPanel'
  import {AppMain, Navbar, Settings, Sidebar} from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import {mapState} from 'vuex'
  import Hamburger from '@/components/Hamburger'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      RightPanel,
      Settings,
      Sidebar,
      Hamburger,
      Breadcrumb

    },
    mixins: [ResizeMixin],
    data() {
      return {
        leftArr: [								// 左侧数组
          {text: '交换云技术交流', flag: false},
          {text: '用户组名称', flag: false},
          {text: '交换云技术交流', flag: false},
          {text: '用户组名称', flag: false},
          {text: '交换云技术交流', flag: false},
          {text: '用户组名称', flag: false},
          {text: '交换云技术交流', flag: false},
          {text: '用户组名称', flag: false},
          {text: '交换云技术交流', flag: false},
          {text: '用户组名称', flag: false},
        ],
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        showSettings: state => state.settings.showSettings,
        needTagsView: state => state.settings.tagsView,
        fixedHeader: state => state.settings.fixedHeader
      }),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
      },
      /**
       * 左侧tab点击事件
       */
      clickTab(item, index) {
        for (const i in this.leftArr) {
          this.leftArr[i].flag = false
        }
        item.flag = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1002;
    width: 100%;
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: 100%;
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .left-warp {
    float: left;
    width: 12%;
    min-height: calc(100vh - 50px);
    background: rgba(255, 255, 255, 1);
    box-shadow: -1px 0 0 0 rgba(235, 235, 235, 1);
    border-right: 1px solid #F0F0F0;
    border-left: none !important;
    margin-right: 1%;

    ul li {
      list-style: none;
      width: 90%;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(255, 213, 213, 1);
      border-radius: 14px;
      line-height: 28px;
      text-indent: 13px;
      margin-bottom: 12px;
      color: #FF6D6D;
      cursor: pointer;
    }
  }

  .active { // 左侧单击添加class
    background: #FF6D6D !important;
    color: #ffffff !important;
  }

  .right-warp {
    float: right;
    width: 86%;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
</style>

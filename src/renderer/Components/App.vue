<template>
  <div id="app" class="container">
    <titlebar></titlebar>

    <div id="content-wrapper">
      <div id="ui-loader" class="ui dimmer">
        <div class="ui huge text indeterminate loader">Loading save file</div>
        <div class="ui active progress" style="display:none;">
          <div class="bar">
            <div class="progress"></div>
          </div>
          <div class="label">Uploading Files</div>
        </div>
      </div>

      <main-menu></main-menu>

      <div id="content-view" class="ui segment">
        <!--<keep-alive>-->
          <router-view></router-view>
        <!--</keep-alive>-->
      </div>
    </div>
  </div>
</template>
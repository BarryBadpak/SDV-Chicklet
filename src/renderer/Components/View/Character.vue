<template>
    <div id="character" class="ui segment grid blurring dimmable" v-bind:class="{ dimmed: !IsSaveLoaded() }">
        <div class="ui simple transition inverted dimmer"></div>

        <div class="row">
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ISave from "../../Core/Store-interfaces/ISave";
import StateHelper from "../../Core/Helpers/StateHelper";

@Component
export default class Character extends Vue {
  /**
   * Returns the SaveStore object
   * @returns {ISave}
   */
  get getSaveStore(): ISave {
    return (<any>this).$store.state.save;
  }

  IsSaveLoaded(): boolean {
    return StateHelper.IsSaveLoaded();
  }
}
</script>
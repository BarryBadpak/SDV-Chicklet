<template>
	<div id="titlebar">
		<div class="drag" style="top: 0; left: 0; width: 100%; height: 32px; position: absolute; "></div>
		<div class="title">
			<img src="css/img/titlebar_icon.png"/>
			<span>{{ meta.name }}</span> -
			v{{ meta.version }} ({{ meta.build }})
		</div>
	</div>
</template>
<script lang="ts">
import AppMeta from "../Core/Helpers/AppMeta";
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class Menu extends Vue {
  /**
   * Returns AppMeta data
   * @returns {[key:string]: any}
   */
  get meta(): { [key: string]: any } {
    return AppMeta;
  }
}
</script>
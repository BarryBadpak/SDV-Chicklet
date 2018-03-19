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

export default {
  computed: {
    /**
     * Returns AppMeta data
     * @returns {[key:string]: any}
     */
    meta(): { [key: string]: any } {
      return AppMeta;
    }
  }
};
</script>
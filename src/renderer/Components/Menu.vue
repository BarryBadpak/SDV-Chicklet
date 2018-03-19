<template>
	<div id="mainMenu" class="ui brown inverted pointing secondary menu">
		<div class="ui dropdown item">
			<i class="content icon"></i>
			{{ saveObj.get('player.name') }}
			<div class="menu">
				<div class="item" v-on:click="openSave">
					<span class="description">Ctrl+O</span>
					<i class="folder open icon"></i>
					Open
				</div>
				<div class="item">
					<i class="folder open outline icon"></i>
					<i class="dropdown icon"></i>
					Open recent
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<div class="menu" v-if="!getRecentFiles.length">
						<div class="item">
							No recent files
						</div>
					</div>
					<div class="menu" v-else>
						<div class="item" v-on:click="openRecentSave(recentFile)" v-for="recentFile in getRecentFiles" v-bind:key="recentFile.name">
							{{ recentFile.name }}
						</div>
						<div class="divider"></div>
						<div class="item" v-on:click="clearRecentFiles">
							Clear recent saves
						</div>
					</div>
				</div>
				<div class="divider"></div>
				<div class="item" v-on:click="save">
					<span class="description">Ctrl+S</span>
					<i class="save icon"></i>
					Save
				</div>
				<div class="item" v-on:click="reloadSave">
					<span class="description">Ctrl+R</span>
					<i class="refresh icon"></i>
					Reload
				</div>
			</div>
		</div>
		<a class="item active" data-route="/">Character</a>
		<a class="item" data-route="/bundles">Bundles</a>
		<a class="item" data-route="/recipes">Recipes</a>
		<a class="item" data-route="/inventory">Inventory</a>
		<a class="item" data-route="/map-editor">Map editor</a>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Save from "../Core/Save";
import RecentFiles from "../Core/Store/RecentFiles";
const MouseTrap = require("mousetrap");

@Component
export default class Menu extends Vue {

  _recentFiles: Array<{ [key: string]: any }> = [];

  constructor() {
    super();
  }

  /**
   * Retrieves the RecentFiles object from the app_store
   * @returns RecentFiles
   */
  get recentFilesObj() {
    return RecentFiles;
  }

  /**
   * Retrieves the save object from the app_store
   * @returns Save
   */
  get saveObj() {
    return Save;
  }

  /**
   * Retrieve a list of recent files
   */
  get getRecentFiles() {
    return this._recentFiles ? this._recentFiles : [];
  }

  /**
   * Clear the recent files list
   */
  clearRecentFiles() {
    this.recentFilesObj.clear();
    Vue.set(this, '_recentFiles', RecentFiles.getFiles());
  }

  /**
   * Open the file dialog to open a save file
   */
  openSave() {
    this.saveObj.openSave();
  }

  /**
   * Open a file from the recent file list
   *
   * @param recentFile
   */
  openRecentSave(recentFile: File) {
    this.saveObj.openSave(recentFile.path);
  }

  /**
   * Reload the currently opened save
   */
  reloadSave() {
    this.saveObj.reloadSave();
  }

  /**
   * Save the file
   */
  save() {
    this.saveObj.save();
  }

  mounted() {
    this._recentFiles = this.recentFilesObj.getFiles();

    (<any>$("#mainMenu .dropdown")).dropdown({
      transition: "drop",
      action: "hide"
    });

    const self = this;
    const dropdownItem = $(".menu .dropdown .item");
    const menuItem = $(".menu a.item, .menu .link.item").not(dropdownItem);

    menuItem.on("click", function() {
      if (!$(this).hasClass("dropdown browse")) {
        $(this)
          .addClass("active")
          .closest(".ui.menu")
          .find(".item")
          .not($(this))
          .removeClass("active");
      }
    });

    // Add functionality to make elements routeable
    const routeItems = $("[data-route]");
    routeItems.on("click", function() {
      const path = $(this).data("route");
      self.$router.push(path);
    });

    // Register shortcuts
    MouseTrap.bind("mod+o", this.openSave);
    MouseTrap.bind("mod+s", this.save);
    MouseTrap.bind("mod+r", this.reloadSave);
    MouseTrap.prototype.stopCallback = () => {
      return false;
    };
  }
}
</script>
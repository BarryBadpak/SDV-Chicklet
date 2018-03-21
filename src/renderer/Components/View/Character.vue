<template>
    <div id="character" class="ui segment grid blurring dimmable" v-bind:class="{ dimmed: !IsSaveLoaded() }">
        <div class="ui simple transition inverted dimmer"></div>

        <div class="row">
          <div class="nine wide column">
			    	<h3 class="ui dividing header">General</h3>

            <div class="ui grid">
              <div class="five wide column">

                <basic-input propertyPath="player.name" fieldName="Name"/>
                <basic-input propertyPath="player.farmName" fieldName="Farm name"/>
                <basic-input propertyPath="player.favoriteThing" fieldName="Favorite thing"/>

                <label for="animalType">Animal type</label>
                <div class="ui input">
                  <select id="animalType" v-bind:value="playerHelper.GetAnimalType()" v-on:input="setAnimalType($event.target.value)">
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                  </select>
                </div>

                <label for="animalName">Animal name</label>
                <div class="ui input icon last">
                  <input id="animalName" type="text" v-bind:value="playerHelper.GetAnimalName()" v-on:input="setAnimalName($event.target.value)"/>
                </div>

              </div>

              <div class="five wide column">

                <basic-input propertyPath="player.health" fieldName="Health" fieldType="number" :fieldMin="1"/>
                <basic-input propertyPath="player.maxHealth" fieldName="Max Health" fieldType="number" :fieldMin="1"/>
                <basic-input propertyPath="player.stamina" fieldName="Stamina" fieldType="number" :fieldMin="1"/>
                <basic-input propertyPath="player.maxStamina" fieldName="Max Stamina" fieldType="number" :fieldMin="1"/>

                <label for="inventorySlots">Max items slots</label>
                <div class="ui input">
                  <select id="inventorySlots" v-bind:value="saveStore.get('player.maxItems')" v-on:input="saveStore.set('player.maxItems', $event.target.value)">
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                  </select>
                </div>
              </div>

              <div class="six wide column">
                <basic-input propertyPath="player.money" fieldName="Money" fieldType="number"/>
                <basic-input propertyPath="player.totalMoneyEarned" fieldName="Total money earned" fieldType="number"/>
                <basic-input propertyPath="player.clubCoins" fieldName="Club coins" fieldType="number"/>
                <basic-input propertyPath="dailyLuck" fieldName="Daily luck" fieldType="number" :fieldMin="-0.064" :fieldMax="0.064" :fieldStep="0.001"/>

                <label for="tomorrowsWeather">Tomorrow's weather</label>
                <div class="ui input">
                  <select id="tomorrowsWeather" v-bind:value="saveStore.get('weatherForTomorrow')" v-on:input="saveStore.set('weatherForTomorrow', $event.target.value)">
                    <option value="0">Sunny</option>
                    <option value="1">Rainy</option>
                    <option value="2">Debrees</option>
                    <option value="3">Storm</option>
                    <option value="4">Festival</option>
                    <option value="5">Snow</option>
                    <option value="6">Wedding</option>
                  </select>
                </div>
              </div>
            </div>

            <h3 class="ui dividing header less-margin">Flags</h3>
            <div class="ui grid">
              <div class="three column row">
                <div class="column">
                  <flag-input propertyPath="isDebrisWeather" fieldName="Debree weather"/>
                  <flag-input propertyPath="isLightning" fieldName="Lightning weather"/>
                  <flag-input propertyPath="isRaining" fieldName="Raining weather"/>
                  <flag-input propertyPath="isSnowing" fieldName="Snowing weather"/>
                  <flag-input propertyPath="bloomDay" fieldName="Bloom day"/>
                </div>

                <div class="column">
                  <flag-input propertyPath="player.canUnderstandDwarves" fieldName="Can understand dwarves"/>
                  <flag-input propertyPath="player.hasBusTicket" fieldName="Has bus ticket"/>
                  <flag-input propertyPath="player.hasClubCard" fieldName="Has club card"/>
                  <flag-input propertyPath="player.hasDarkTalisman" fieldName="Has dark talisman"/>
                  <flag-input propertyPath="player.hasMagicInk" fieldName="Has magic ink"/>
                </div>

                <div class="column">
                  <flag-input propertyPath="player.hasRustyKey" fieldName="Has rusty key"/>
                  <flag-input propertyPath="player.hasSkullKey" fieldName="Has skull key"/>
                  <flag-input propertyPath="player.hasUnlockedSkullDoor" fieldName="Has unlocked skull door"/>
                  <flag-input propertyPath="player.hasSpecialCharm" fieldName="Has special charm"/>
                </div>
              </div>
            </div>
          </div> <!--Left column end-->

          <div class="divider-column">
            <div class="ui vertical divider no-text"></div>
          </div>

          <div class="seven wide column">
            <h3 class="ui dividing header">Appearance</h3>

            <div class="ui grid">
              <div class="row">
                <div class="seven wide column middle aligned">
                  <div class="portrait_wrapper" style="text-align: center;">
                    <div class="portrait">
                      <canvas id="characterCanvas" width="128" height="192"></canvas>
                    </div>
                  </div>
                </div>

                <div class="five wide column">
                  <label for="playerGender">Gender</label>
                  <div class="ui input">
                    <select id="playerGender" v-bind:value="playerHelper.GetPlayerGender()" v-on:change="setGender($event.target.value)">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <label for="hairstyleColor">Hair color</label>
                  <div class="ui input colorpicker">
                    <input id="hairstyleColor" type="text" readonly
                        class="jscolor{hash:true,styleElement:'hairstyleColorStyle'}"
                        v-bind:value="getColor('player.hairstyleColor')" v-on:change="setColor('player.hairstyleColor', $event.target.value)"/>
                    <span id="hairstyleColorStyle"></span>
                  </div>

                  <label for="newEyeColor">Eye color</label>
                  <div class="ui input colorpicker">
                    <input id="newEyeColor" type="text" readonly
                        class="jscolor{hash:true,styleElement:'newEyeColorStyle'}"
                        v-bind:value="getColor('player.newEyeColor')" v-on:change="setColor('player.newEyeColor', $event.target.value)"/>
                    <span id="newEyeColorStyle"></span>
                  </div>

                  <label for="pantsColor">Pants color</label>
                  <div class="ui input colorpicker last">
                    <input id="pantsColor" type="text" readonly
                        class="jscolor{hash:true,styleElement:'pantsColorStyle'}"
                        v-bind:value="getColor('player.pantsColor')" v-on:change="setColor('player.pantsColor', $event.target.value)"/>
                    <span id="pantsColorStyle"></span>
                  </div>
                </div>

                <div class="four wide column">
                  <label for="playerSkin">Skin</label>
                  <div class="ui input">
                    <input id="playerSkin" type="number" min="0" max="23" v-bind:value="getAppearance('player.skin')" v-on:input="getSave.set('player.skin', $event.target.value)"/>
                  </div>

                  <label for="playerHair">Hair</label>
                  <div class="ui input">
                    <input id="playerHair" type="number" min="31" v-bind:value="getAppearance('player.hair')" v-on:input="getSave.set('player.hair', $event.target.value)"/>
                  </div>

                  <label for="playerShirt">Shirt</label>
                  <div class="ui input">
                    <input id="playerShirt" type="number" min="0" max="111" v-bind:value="getAppearance('player.shirt')" v-on:input="getSave.set('player.shirt', $event.target.value)"/>
                  </div>

                  <label for="playerAccessory">Accessory</label>
                  <div class="ui input last">
                    <input id="playerAccessory" type="number" min="0" max="24" v-bind:value="getAppearance('player.accessory')" v-on:input="getSave.set('player.accessory', $event.target.value)"/>
                  </div>
                </div>
              </div>
            </div>

            <h3 class="ui dividing header less-margin">Structures</h3>
            <div class="ui grid">

              <div class="five wide column">
                <label for="inventorySlots">House upgrade level</label>
                <div class="ui input last">
                  <select id="houseUpgrade" v-bind:value="saveStore.get('player.houseUpgradeLevel')" v-on:input="setHouseUpgradeLevel($event.target.value)">
                    <option value="0">Tier 0</option>
                    <option value="1">Tier 1</option>
                    <option value="2">Tier 2</option>
                    <option value="3">Tier 3</option>
                  </select>
                </div>
              </div>

              <div class="five wide column">
                <label for="caveChoice">Cave choice</label>
                <div class="ui input last">
                  <select id="caveChoice" v-bind:value="saveStore.get('player.caveChoice')" v-on:input="setCaveChoice($event.target.value)">
                    <option value="0">No cave</option>
                    <option value="1">Bat cave</option>
                    <option value="2">Mushroom cave</option>
                  </select>
                </div>
              </div>

              <div class="five wide column">
                <label for="hasGreenhouse">Has greenhouse</label>
                <div class="ui input last">
                  <select id="hasGreenhouse" v-bind:value="playerHelper.HasGreenhouseUnlocked()" v-on:input="setHasGreenhouse($event.target.value)">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ISave from "../../Core/Store-interfaces/ISave";
import StateHelper from "../../Core/Helpers/StateHelper";
import PlayerHelper from "../../Core/Helpers/PlayerHelper";
import ColorHelper from "../../Core/Helpers/ColorHelper";
import Color from "../../Core/Data/Color";
import { State } from "vuex-class";

@Component
export default class Character extends Vue {

  @State("save") saveStore: ISave;

  /**
   * Returns the PlayerHelper object
   */
  get playerHelper(): PlayerHelper {
    return PlayerHelper;
  }

  IsSaveLoaded(): boolean {
    return StateHelper.IsSaveLoaded();
  }

  /**
   * Retrieve a color
   */
  getColor(property: string) {
    const sColor = this.saveStore.get(`${property}`);

    if (sColor) {
      const color: Color = ColorHelper.fromPackedValue(sColor.PackedValue);
      const id = property.split(".")[1];
      const el = $(`#${id}Style`);

      if (el.length) {
        $(el).css("background", color.toHexadecimal());
      }

      // this.updatePreview(property, color.toHexadecimal());
      return color.toHexadecimal();
    }

    return "";
  }

  setColor(property: string, hexColor: string) {
    const color = ColorHelper.fromHexadecimal(hexColor);
    this.saveStore.set(property, color.toJson());

    // this.updatePreview(property, color.toHexadecimal());
  }

  /**
   * Retrieve a appearance
   */
  getAppearance(property: string) {
    let val = this.saveStore.get(property);
    if (property === "player.accessory" && val) {
      val = parseInt(val, 10) + 1;
    }

    // this.updatePreview(property, val);
    return val;
  }
}
</script>
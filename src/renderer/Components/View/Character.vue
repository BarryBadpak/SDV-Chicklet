<template>
    <div id="character" class="ui segment grid blurring dimmable" v-bind:class="{ dimmed: !IsSaveLoaded() }">
        <div class="ui simple transition inverted dimmer"></div>

        <div class="row">
          <div class="nine wide column">
			    	<h3 class="ui dividing header">General</h3>

            <div class="ui grid">
              <div class="five wide column">

                <label for="playerName">Name</label>
                <div class="ui input">
                  <input id="playerName" type="text" v-bind:value="getSaveStore.get('player.name')" v-on:input="getSaveStore.set('player.name', $event.target.value)"/>
                </div>

                <label for="farmName">Farm name</label>
                <div class="ui input">
                  <input id="farmName" type="text" v-bind:value="getSaveStore.get('player.farmName')" v-on:input="getSaveStore.set('player.farmName', $event.target.value)"/>
                </div>

                <label for="favoriteThing">Favorite thing</label>
                <div class="ui input">
                  <input id="favoriteThing" type="text" v-bind:value="getSaveStore.get('player.favoriteThing')" v-on:input="getSaveStore.set('player.favoriteThing', $event.target.value)"/>
                </div>

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

                <label for="playerHealth">Health</label>
                <div class="ui input">
                  <input id="playerHealth" type="number" min="1" v-bind:value="getSaveStore.get('player.health')" v-on:input="getSaveStore.set('player.health', $event.target.value)"/>
                </div>

                <label for="playerMaxHealth">Max Health</label>
                <div class="ui input">
                  <input id="playerMaxHealth" type="number" min="1" v-bind:value="getSaveStore.get('player.maxHealth')" v-on:input="getSaveStore.set('player.maxHealth', $event.target.value)"/>
                </div>

                <label for="playerStamina">Stamina</label>
                <div class="ui input">
                  <input id="playerStamina" type="number" min="1" v-bind:value="getSaveStore.get('player.stamina')" v-on:input="getSaveStore.set('player.stamina', $event.target.value)"/>
                </div>

                <label for="playerMaxStamina">Max Stamina</label>
                <div class="ui input">
                  <input id="playerMaxStamina" type="number" min="1" v-bind:value="getSaveStore.get('player.maxStamina')" v-on:input="getSaveStore.set('player.maxStamina', $event.target.value)"/>
                </div>

                <label for="inventorySlots">Max items slots</label>
                <div class="ui input">
                  <select id="inventorySlots" v-bind:value="getSaveStore.get('player.maxItems')" v-on:input="getSaveStore.set('player.maxItems', $event.target.value)">
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                  </select>
                </div>
              </div>

              <div class="six wide column">
                <label for="playerMoney">Money</label>
                <div class="ui input">
                  <input id="playerMoney" type="number" v-bind:value="getSaveStore.get('player.money')" v-on:input="getSaveStore.set('player.money', $event.target.value)"/>
                </div>

                <label for="playerTotalMoney">Total money</label>
                <div class="ui input">
                  <input id="playerTotalMoney" type="number" v-bind:value="getSaveStore.get('player.totalMoneyEarned')" v-on:input="getSaveStore.set('player.totalMoneyEarned', $event.target.value)"/>
                </div>

                <label for="playerClubCoins">Club coins</label>
                <div class="ui input">
                  <input id="playerClubCoins" type="number" v-bind:value="getSaveStore.get('player.clubCoins')" v-on:input="getSaveStore.set('player.clubCoins', $event.target.value)"/>
                </div>

                <label for="dailyLuck">Daily luck</label>
                <div class="ui input">
                  <input id="dailyLuck" type="number" min="-0.064" max="0.064" step="0.001" v-bind:value="getSaveStore.get('dailyLuck')" v-on:input="getSaveStore.set('dailyLuck', $event.target.value)"/>
                </div>

                <label for="tomorrowsWeather">Tomorrow's weather</label>
                <div class="ui input">
                  <select id="tomorrowsWeather" v-bind:value="getSaveStore.get('weatherForTomorrow')" v-on:input="getSaveStore.set('weatherForTomorrow', $event.target.value)">
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
                  <div class="ui checkbox">
                    <input id="debreeWeather" type="checkbox"
                        :checked="playerHelper.GetFlag('isDebrisWeather')" v-on:change="setFlag('isDebrisWeather', $event.target.checked)">
                    <label for="debreeWeather">Debree weather</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="lightningWeather" type="checkbox"
                        :checked="playerHelper.GetFlag('isLightning')" v-on:change="setFlag('isLightning', $event.target.checked)">
                    <label for="lightningWeather">Lightning weather</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="rainingWeather" type="checkbox"
                        :checked="playerHelper.GetFlag('isRaining')" v-on:change="setFlag('isRaining', $event.target.checked)">
                    <label for="rainingWeather">Raining weather</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="snowingWeather" type="checkbox"
                        :checked="playerHelper.GetFlag('isSnowing')" v-on:change="setFlag('isSnowing', $event.target.checked)">
                    <label for="snowingWeather">Snowing weather</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="bloomDay" type="checkbox"
                        :checked="playerHelper.GetFlag('bloomDay')" v-on:change="setFlag('bloomDay', $event.target.checked)">
                    <label for="bloomDay">Bloom day</label>
                  </div>
                </div>

                <div class="column">
                  <div class="ui checkbox">
                    <input id="canUnderstandDwarves" type="checkbox"
                        :checked="playerHelper.GetFlag('player.canUnderstandDwarves')" v-on:change="setFlag('player.canUnderstandDwarves', $event.target.checked)">
                    <label for="canUnderstandDwarves">Can understand dwarves</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="hasBusTicket" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasBusTicket')" v-on:change="setFlag('player.hasBusTicket', $event.target.checked)">
                    <label for="hasBusTicket">Has bus ticket</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="hasClubCard" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasClubCard')" v-on:change="setFlag('player.hasClubCard', $event.target.checked)">
                    <label for="hasClubCard">Has club card</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="hasDarkTalisman" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasDarkTalisman')" v-on:change="setFlag('player.hasDarkTalisman', $event.target.checked)">
                    <label for="hasDarkTalisman">Has dark talisman</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="hasMagicInk" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasMagicInk')" v-on:change="setFlag('player.hasMagicInk', $event.target.checked)">
                    <label for="hasMagicInk">Has magic ink</label>
                  </div>
                </div>

                <div class="column">
                  <div class="ui checkbox">
                    <input id="hasRustyKey" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasRustyKey')" v-on:change="setFlag('player.hasRustyKey', $event.target.checked)">
                    <label for="hasRustyKey">Has rusty key</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="hasSkullKey" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasSkullKey')" v-on:change="setFlag('player.hasSkullKey', $event.target.checked)">
                    <label for="hasSkullKey">Has skull key</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="hasUnlockedSkullDoor" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasUnlockedSkullDoor')" v-on:change="setFlag('player.hasUnlockedSkullDoor', $event.target.checked)">
                    <label for="hasUnlockedSkullDoor">Has unlocked skull door</label>
                  </div>

                  <div class="ui checkbox">
                    <input id="hasSpecialCharm" type="checkbox"
                        :checked="playerHelper.GetFlag('player.hasSpecialCharm')" v-on:change="setFlag('player.hasSpecialCharm', $event.target.checked)">
                    <label for="hasSpecialCharm">Has special charm</label>
                  </div>
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
                  <select id="houseUpgrade" v-bind:value="getSaveStore.get('player.houseUpgradeLevel')" v-on:input="setHouseUpgradeLevel($event.target.value)">
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
                  <select id="caveChoice" v-bind:value="getSaveStore.get('player.caveChoice')" v-on:input="setCaveChoice($event.target.value)">
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

@Component
export default class Character extends Vue {
  /**
   * Returns the SaveStore object
   * @returns {ISave}
   */
  get getSaveStore(): ISave {
    return (<any>this).$store.state.save;
  }

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
    const sColor = this.getSaveStore.get(`${property}`);

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
    this.getSaveStore.set(property, color.toJson());
    
    // this.updatePreview(property, color.toHexadecimal());
  }

  /**
   * Retrieve a appearance
   */
  getAppearance(property: string) {
    let val = this.getSaveStore.get(property);
    if (property === "player.accessory" && val) {
      val = parseInt(val) + 1;
    }

    // this.updatePreview(property, val);
    return val;
  }
}
</script>
<template>
    <div class="ui checkbox">
        <input v-bind:id="fieldNameId" type="checkbox"
            :checked="getValue()" v-on:change="setValue($event.target.checked)">
        <label v-bind:for="fieldNameId">{{fieldName}}</label>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import ISave from "../../Core/Store-interfaces/ISave";

@Component
export default class FlagInput extends Vue {
  @Prop({ required: true })
  propertyPath: string;
  @Prop({ required: true })
  fieldName: string;

  @State("save") saveStore: ISave;

  /**
   * Remove any spaces from the fieldName to form a ID
   */
  get fieldNameId(): string {
    return this.fieldName.replace(/ /g, "");
  }

  /**
   * Returns if the property path flag is toggled
   */
  getValue() {
    return this.saveStore.get(this.propertyPath) === "true";
  }

  /**
   * Store the state of a flag property
   * @param state boolean
   */
  setValue(state: boolean) {
    this.saveStore.set(this.propertyPath, state.toString());
  }
}
</script>


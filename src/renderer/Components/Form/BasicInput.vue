<template>
    <div>
        <label v-bind:for="fieldNameId">{{fieldName}}</label>
        <div class="ui input">
            <input v-bind:id="fieldNameId" v-bind:type="fieldType" v-bind:value="getValue()" v-on:input="setValue($event.target.value)" 
                  v-bind:min="fieldMin ? fieldMin : ''" v-bind:max="fieldMax ? fieldMax : ''" v-bind:step="fieldStep ? fieldStep : ''"/>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import ISave from "../../Core/Store-interfaces/ISave";

@Component
export default class BasicInput extends Vue {
  @Prop({ required: true })
  propertyPath: string;
  @Prop({ required: true })
  fieldName: string;
  @Prop({ default: "text" })
  fieldType: string;
  @Prop({ default: false, type: [Number, Boolean] })
  fieldMin: number | false;
  @Prop({ default: false, type: [Number, Boolean] })
  fieldMax: number | false;
  @Prop({ default: false, type: [Number, Boolean] })
  fieldStep: number | false;

  @State("save") saveStore: ISave;

  /**
   * Remove any spaces from the fieldName to form a ID
   */
  get fieldNameId(): string {
    return this.fieldName.replace(/ /g, "");
  }

  /**
   * Returns the value for this property path
   */
  getValue() {
    return this.saveStore.get(this.propertyPath);
  }

  /**
   * @param value string
   */
  setValue(value: string) {
    this.saveStore.set(this.propertyPath, value);
  }
}
</script>
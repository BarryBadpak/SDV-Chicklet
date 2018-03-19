declare var APP_META: {[key: string]: any};

interface Window {
  electron_titlebar_installed: boolean
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare var alertify: alertify.IAlertifyStatic;
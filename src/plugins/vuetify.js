import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
        //iconfont: 'md'
      },
    themes: {
      light: {
        primary: '#001529',
        secondary: '#d22f35',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#00a482',
        warning: '#FFC107'
      },
    },
  },
});

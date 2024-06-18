import { App, DirectiveBinding } from 'vue';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';

const vueHighlightJS = {
  install(app: App) {
    app.directive('highlightjs', {
      beforeMount(el: HTMLElement, binding: DirectiveBinding) {
        const targets = el.querySelectorAll('code');
        targets.forEach((target) => {
          if (typeof binding.value === 'string') {
            target.textContent = binding.value;
          }
          hljs.highlightBlock(target as HTMLElement);
        });
      },
      updated(el: HTMLElement, binding: DirectiveBinding) {
        const targets = el.querySelectorAll('code');
        targets.forEach((target) => {
          if (typeof binding.value === 'string') {
            target.textContent = binding.value;
          }
          hljs.highlightBlock(target as HTMLElement);
        });
      }
    });
  }
};

export default vueHighlightJS;

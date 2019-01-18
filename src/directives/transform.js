import Vue from 'vue';

Vue.directive('meu-transform', {
    bind(el, binding, vnode) {
        let current = 0;
        el.addEventListener('dblclick', function(){
            let increment = binding.value || 0;
            let efect;
            
            if (!binding.arg || binding.arg == 'rotate') {
                if (binding.modifiers.reverse) {
                    current -= increment;    
                } else{
                    current += increment;
                }
                efect = `rotate(${current}deg)`;
            } else if (binding.arg == 'scale') {
                efect = `scale(${increment})`;

            }

            el.style.transform = efect;

            if (binding.modifiers.animate)
                el.style.transition = 'transform 0.5s';
            
        })
    }
});
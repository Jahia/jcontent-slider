import {registry} from '@jahia/ui-extender';
import register from './JContentSlider.register';

export default function () {
    registry.add('callback', 'jContentSlider', {
        targets: ['jahiaApp-init:20'],
        callback: register
    });
}

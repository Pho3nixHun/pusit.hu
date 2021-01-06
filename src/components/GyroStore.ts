import { readable } from 'svelte/store';

export const gyro = readable({x: 0, y: 0, z:0}, async (set) => {
    const result = await navigator.permissions.query({name:'gyroscope'});
    if (result.state === 'granted' && 'Gyroscope' in window) {
        const sensor = new Gyroscope({frequency: 60, referenceFrame: 'screen'});
        sensor.addEventListener('reading', e => {
            const {x, y, z} = sensor;
            set({x, y, z});
        });
        sensor.start()
        return () => sensor.stop();
    }
});

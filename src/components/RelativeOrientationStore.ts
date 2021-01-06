import { readable } from 'svelte/store';

export const relativeOrientation = readable({beta: 0, gamma: 0, alpha:0}, async (set) => {
    const permissions = await Promise.all([
        navigator.permissions.query({ name: "accelerometer" }),
        navigator.permissions.query({ name: "gyroscope" })
    ]);
    if (permissions.every(p => p.state === 'granted') && 'RelativeOrientationSensor' in window) {
        const sensor = new RelativeOrientationSensor({frequency: 30});
        sensor.addEventListener('reading', e => {
            const {quaternion} = sensor;
            const [, alpha, gamma, beta] = quaternion;
            set({beta, gamma, alpha});
        });
        sensor.start()
        return () => sensor.stop();
    } else if('RelativeOrientationSensor' in window) {
        console.warn('Missing permissions');
    } else {
        console.warn('RelativeOrientationSensor is not supported');
    }
});

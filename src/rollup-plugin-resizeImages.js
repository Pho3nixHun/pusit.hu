const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

export default async (src, dst, options) => {
    const opt = Object.assign({}, options, {
        quality: 75,
        method: 6,
        metadata: 'none',
        preset: 'photo'
    })
    await imagemin(src, dst, {
        use: [
            imageminWebp({ 
                quality: 75,
                method: 6,
                resize: 
            })
        ]
    })
}
const glob_cb = require('glob');
const { execFile } = require('child_process');
const cwebp = require('cwebp-bin');
const arrayUnion = require('array-union');
const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp'); 
const fs = require('fs').promises;
const FS_CONSTANTS = require('fs').constants;

const IMAGE_SRC_DIR = 'src/assets/images';
const IMAGE_DST_DIR = 'public/assets/images' 

const glob = (pattern, options) => 
    new Promise((resolve,reject) =>
        glob_cb(pattern, options, (err, files) => err ? reject(err) : resolve(files))
    );

const copyFiles = async (pattern, destination) => {
    let ignored = 0;
    const ignoreIfFileExists = function(ex) {
        if (ex.code === 'EEXIST') {
            ignored++
            return;
        }
        throw ex;
    }
    const files = await glob(pattern);
    await fs.mkdir(destination, {recursive: true}).catch(console.log);
    const result = await Promise.all(
        files.map(f => 
            fs.copyFile(f, path.join(destination, path.basename(f)), FS_CONSTANTS.COPYFILE_EXCL).catch(ignoreIfFileExists)
        )
    ).catch(console.log);
    if (ignored > 0) {
        console.log(`Ignored ${ignored} file(s), because they already exist at ${destination}`)
    }
    if (files.length > ignored) {
        console.log(`Copied ${files.length - ignored} image(s) from ${pattern}`);
    }
    return result;

} 

const minifyImages = async (src, dst, options, ...otherOptions) => {
    const [dstContent, ...files] = await Promise.all([
        glob(`${dst}/*.webp`),
        ...src.map(s=>glob(s))
    ])
    const filesAlreadyConverted = dstContent.map(file => path.basename(file, '.webp'));
    const filesToConvert = arrayUnion(...files).filter(f => !filesAlreadyConverted.includes(path.parse(f).name));
    if (filesAlreadyConverted.length > 0) {
        console.log(`Ignoring ${filesAlreadyConverted.length} image(s), because they already exist in ${dst}`);
    }
    if (filesToConvert.length === 0) {
        return [];
    }
    const opt = Object.assign({
        method: 6,
        metadata: 'none'
    }, options);
    const result = await imagemin(filesToConvert, { destination: dst, plugins: [imageminWebp(opt)], glob: false });
    if (otherOptions.length > 0) {
        return minifyImages(result.map(res => res.destinationPath), dst, ...otherOptions);
    }
    console.log(`Converted ${result.length} images to webp from ${src} to ${dst}`);
    return result;
}

const cards = [
    [`${IMAGE_SRC_DIR}/cards/*.{jpg,jpeg,png}`],
    `${IMAGE_DST_DIR}/cards`,
    {
        quality: 50,
        autoFilter: true,
        resize: { width: 300, height: 0 }
    },
    {
        crop: {x: 0, y:0, width: 300, height: 150 }
    }
]

const parallax = [
    [`${IMAGE_SRC_DIR}/parallax/crane/*.{jpg,jpeg,png}`],
    `${IMAGE_DST_DIR}/parallax`,
    {
        quality: 50,
    }
]

const icons = [
    [`${IMAGE_SRC_DIR}/icons/*.{jpg,jpeg,png}`],
    `${IMAGE_DST_DIR}/icons`,
    {
        quality: 50,
    }
]

const logos = [
    [`${IMAGE_SRC_DIR}/partners/*.{jpg,jpeg,png}`],
    `${IMAGE_DST_DIR}/partners`,
    {
        quality: 50,
        preset: 'icon',
        resize: { width: 300, height: 0 }
    }
]


const publications = [
    [`${IMAGE_SRC_DIR}/publications/*.{jpg,jpeg,png}`],
    `${IMAGE_DST_DIR}/publications`,
    {
        quality: 50,
        preset: 'text',
        resize: { width: 0, height: 700 }
    }
]
const refs = [
    [`${IMAGE_SRC_DIR}/ref/**/*.{JPG,JPEG,jpg,jpeg,png}`],
    `${IMAGE_DST_DIR}/ref`,
    {
        quality: 80,
        preset: 'photo',
        resize: { width: 1280, height: 0 }
    }
]
const other = [
    [`${IMAGE_SRC_DIR}/*.{jpg,jpeg,png}`],
    IMAGE_DST_DIR,
    {
        quality: 65
    }
]

const noConvert = [
    [
        `${IMAGE_SRC_DIR}/cards/**/*.svg`,
        `${IMAGE_DST_DIR}/cards`
    ],
    [
        `${IMAGE_SRC_DIR}/parallax/crane/**/*.svg`,
        `${IMAGE_DST_DIR}/parallax`
    ],
    [
        `${IMAGE_SRC_DIR}/icons/**/*.{svg,png,jpg,jpeg}`,
        `${IMAGE_DST_DIR}/icons`
    ],
    [
        `${IMAGE_SRC_DIR}/partners/**/*.svg`,
        `${IMAGE_DST_DIR}/partners`
    ],
    [
        `${IMAGE_SRC_DIR}/publications/**/*.svg`,
        `${IMAGE_DST_DIR}/publications`
    ],
    [
        `${IMAGE_SRC_DIR}/ref/**/*.svg`,
        `${IMAGE_DST_DIR}/ref`
    ],
    [
        `${IMAGE_SRC_DIR}/*.svg`,
        IMAGE_DST_DIR
    ]
];

const tasks = [cards, parallax, icons, logos, publications, refs, other]

const main = async (args) => {
    console.log('Converting and copying images...');
    const minify = tasks.map(args => minifyImages(...args).catch(console.log));
    const copy = noConvert.map(args => copyFiles(...args).catch(console.log));
    await Promise.all([...minify, ...copy]);
    console.log(`Done`);
}
main();

<script lang="ts">
    import marked from 'marked';
    import Skeleton from 'svelte-skeleton'

    export let src = '';

    const renderer = new marked.Renderer();
    const sanitize = (str: string) => str.replace(/&<"/g, function (m) {
        if (m === "&") return "&amp;"
        if (m === "<") return "&lt;"
        return "&quot;"
    })
    renderer.image = function (src, title, alt) {
        const exec = /=\s*(\d*(?:px|em|ex|ch|rem|vw|vh|vmin|vmax|%))\s*,*\s*(\d*(?:px|em|ex|ch|rem|vw|vh|vmin|vmax|%))*\s*$/.exec(title);
        let res = '<img src="' + sanitize(src) + '" alt="' + sanitize(alt) + '"'
        if (exec && exec[1]) res += '" height="' + exec[1]
        if (exec && exec[2]) res += '" width="' + exec[2]
        return res + '">'
    };
    marked.setOptions({
        renderer: renderer
    });
    const fetchMarkdown = async (url: string): Promise<string> => {
        const response = await fetch(url);
        if (response.status >= 400) {
            throw new Error(`Unexpected status ${response.status}`);
        }
        const md = await response.text();
        return marked(md);
    }

    // Responsive skeleton
    export let imageSkeleton = false;
    export let skeletonSize = { w: 1, h: 1 };
    let h:number = 1, w:number = 1;
    const rowGap = 10;
    const rowHeight = 19;
    const rowPadding = 10;
    const cornerRadiusImage = 12;
    const cornerRadiusRow = 5;
    const paddingY = 45;
    $: mh= h*skeletonSize.h;
    $: mw= w*skeletonSize.w;
    $: imageHeight= Math.floor(h/4);
    $: imageWidth= Math.floor(w/3);
    $: totalLines= Math.floor((mh-paddingY*2)/(rowHeight + rowGap));
    $: linesNextToImage= Math.round((imageHeight + rowGap*1.5)/(rowHeight + rowGap));
    $: lines= new Array(Math.max(1,totalLines)).fill(true).map((v, index) => ({
        w: Math.max(1,(imageSkeleton && index < linesNextToImage) ? mw-imageWidth-rowPadding : mw),
        h: Math.max(1,rowHeight),
        x: (imageSkeleton && index < linesNextToImage) ? imageWidth + rowPadding : 0,
        y: paddingY + index * rowHeight + index * rowGap,
        rx: cornerRadiusRow,
        ry: cornerRadiusRow
    }))
</script>

<div bind:offsetHeight={h} bind:offsetWidth={w}>
    {#await fetchMarkdown(src)}
        <Skeleton height={w} width={h} primaryColor="hsla(210, 11%, 60%, .3)" secondaryColor="hsla(240, 11%, 75%, .3)">
            {#if imageSkeleton}
                <rect width={imageWidth} height="{imageHeight}" x=0 y={paddingY} rx="{cornerRadiusImage}" ry="{cornerRadiusImage}" />
            {/if}
            {#each lines as row}
                <rect width={row.w} height={row.h} x={row.x} y={row.y} rx={row.rx} ry={row.ry} />
            {/each}
        </Skeleton>
    {:then compiled}
        <!-- Markdown -->
        {@html compiled}
    {:catch ex}
        <slot name="notFound"></slot>
    {/await}
</div>
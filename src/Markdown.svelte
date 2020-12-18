<script lang="ts">
    import marked from 'marked';

    export let compiled = '';
    export let src = '';

    const renderer = new marked.Renderer();
    const sanitize = (str: string) => str.replace(/&<"/g, function (m) {
        if (m === "&") return "&amp;"
        if (m === "<") return "&lt;"
        return "&quot;"
    })
    renderer.image = function (src, title, alt) {
        const exec = /=\s*(\d*(?:px|em|ex|ch|rem|vw|vh|vmin|vmax|%))\s*,*\s*(\d*(?:px|em|ex|ch|rem|vw|vh|vmin|vmax|%))*\s*$/.exec(title);
        let res = '<img src="' + sanitize(src) + '" alt="' + sanitize(alt) + '" style="float: left; margin: 1rem;'
        if (exec && exec[1]) res += '" height="' + exec[1]
        if (exec && exec[2]) res += '" width="' + exec[2]
        return res + '">'
    };
    marked.setOptions({
        renderer: renderer
    });
    const fetchMarkdown = async (url: string): Promise<string> => {
        const response = await fetch(url);
        return response.text();
    }
    const compileMarkdown = (md: string) => marked(md);
    $: fetchMarkdown(src)
        .then(compileMarkdown)
        .then(txt => compiled = txt);
</script>
<div>
    {@html compiled}
</div>
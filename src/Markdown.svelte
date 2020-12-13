<script lang="ts">
    import marked from 'marked';

    export let compiled = '';
    export let src = '';
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
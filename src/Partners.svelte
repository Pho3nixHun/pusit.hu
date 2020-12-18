<script lang="ts">
    type Partner = {
        name?: string,
        href?: string,
        logo: string
    }
    export let partners: Partner[] = []
</script>

<style lang="scss">
    @keyframes hov {
        0% {
            filter: grayscale(100%);
            transform: scale(1);
        }
        100% {
            filter: grayscale(0%);
            transform: scale(1.1);
        }
    }
    .content {
        width: 100%;
        a {
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            align-self: center;
            filter: grayscale(100%);
            transform: filter 300ms ease;
            max-width: 128px;
            max-height: 128px;
        }
        a:hover {
            animation: hov 300ms forwards;
            animation-iteration-count: 1;
        }
        img {
            display: inline-block;
            height: auto;
            padding: 1rem;
            max-width: 128px;
            max-height: 128px;
            width: 128px;
            height: auto;
        }
    }
    

</style>

<div class="content d-flex flex-row flex-wrap justify-content-center p-5">
    {#each partners as partner}
        <a href="{partner.href}" alt="{partner.name}">
            <img width="128px" height="128px" src="{partner.logo}" alt="{partner.name}" />
        </a>
    {/each}
</div>
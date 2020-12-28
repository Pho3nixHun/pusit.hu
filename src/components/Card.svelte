<script lang="ts">
    import Icon from 'svelte-awesome';

    export let icon: string;
    export let img: string;
</script>

<style lang="scss">
    .card {
        display: flex;
        flex-direction: column;
        position: relative;
        box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
        border-radius: .4rem;
        height: 375px;
        min-width: 300px;
        max-width: 300px;
    }
    .card-image {
        position: relative;
        background-image: var(--bg);
        background-size: cover;
        min-height: 40%;
        width: 100%;
    }
    .card-body {
        height: 175px;
    }
    .card-icon {
        position: relative;
        background-color: white;
        display: inline-flex;
        width: 92px;
        min-width: 92px;
        min-height: 92px;
        height: 92px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
        transform: translate(0rem, -50%);
        margin-bottom: -46px;
    }
    .card-icon::after {
        content: '';
        position: absolute;
        width: 90%;
        height: 90%;
        border: 5px solid black;
        border-radius: 50%;
    }

    .flex-column-center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card-body {
        text-align: center;
    }
</style>

<div class="card flex-column-center {$$props.class || ''}" style="--bg: url({img}); {$$props.style || ''}">
    <div class="card-image"></div>
    <div class="card-icon">
        <Icon data={icon} scale="3"/>
    </div>
    <div class="card-body flex-column-center">
        <slot name="title"></slot>
        <slot name="text"></slot>
        <slot />
    </div>
</div>

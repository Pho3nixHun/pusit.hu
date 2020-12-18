<script lang="ts">
    export let isOpen:boolean = false;
    const toggle = () => isOpen = !isOpen;
</script>

<style lang="scss">
    // vars
    $color: var(--hamburger-color, #000); // icon color
    $animation: var(--hamburger-animation-time, 0.6s); // animation speed
    $scale: var(--hamburger-scale, 1); // icon scale 68/68 default

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    .hamburglar {
        transform: scale($scale);
        position: relative;
        display: block;
        width: 68px;
        height: 68px;
        -webkit-touch-callout: none;
        user-select: none;
    }

    // transition mask
    .path-burger {
        position: absolute;
        top: 0;
        left: 0;
        height: 68px;
        width: 68px;
        // two masks because... browser support.
        mask: url(#mask);
        -webkit-mask-box-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 68 68' enable-background='new 0 0 68 68' xml:space='preserve'%3E%3Cscript xmlns=''/%3E%3Cg id='Layer_3' display='none'%3E%3Cg id='Layer_2_copy_3' display='inline'%3E%3Cpath d='M68,34C68,15.2,52.8,0,34,0S0,15.2,0,34c0,18.8,15.2,34,34,34v-4C17.4,64,4,50.6,4,34S17.4,4,34,4s30,13.4,30,30 S50.6,64,34,64S4,50.6,4,34S17.4,4,34,4c15.8,0,23.8,11.3,23.8,11.3c1.4,2,2.7,4.1,3.2,6.6c0.4,2.4,0.3,5-1.2,6.9 c-1.1,1.4-2.7,2.3-4.4,2.7C54.3,31.9,53.1,32,52,32H18v4h34c17.7-0.4,12-18,12-18c-0.9-2.7-2.5-5.2-4.3-7.3 c-4.4-5.3-10.6-8.6-17.3-9.9C39.7,0.2,36.8,0,34,0C15.2,0,0,15.2,0,34c0,18.8,15.2,34,34,34S68,52.8,68,34z'/%3E%3Crect y='30.7' fill='none' width='16' height='8.8'/%3E%3Cg id='Layer_4_copy_3'%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg id='Layer_8' display='none'%3E%3Cpath display='inline' fill='none' stroke='%23B3B3B3' stroke-width='4' stroke-miterlimit='10' d='M34,2c12.1,0,18,4,18,4 s7.9,4.3,11,13.8c0,0,2,6.8-3,11.1c0,0-3.2,3.2-8,3.2c-3.9,0,0,0,0,0'/%3E%3C/g%3E%3Cg id='Layer_12' display='none'%3E%3Cpath display='inline' fill='none' stroke='%23FF0000' stroke-width='4' stroke-miterlimit='10' d='M52,34'/%3E%3Cpath display='inline' fill='none' stroke='%23FF0000' stroke-width='4' stroke-miterlimit='10' d='M34,2'/%3E%3C/g%3E%3Cg id='Layer_9' display='none'%3E%3C/g%3E%3Cg id='Layer_4' display='none'%3E%3C/g%3E%3Cg id='Layer_5_copy' display='none'%3E%3C/g%3E%3Cg id='Layer_5' display='none'%3E%3Cpath display='inline' fill='none' stroke='%23FF0000' stroke-width='4' stroke-miterlimit='10' d='M34,66C16.3,66,2,51.7,2,34 S16.3,2,34,2s32,14.3,32,32S51.7,66,34,66S2,51.7,2,34S16.3,2,34,2c22.7,0,29,16.1,29,23.5S52,34,52,34H18'/%3E%3C/g%3E%3Cg id='Layer_5_copy_2' display='none'%3E%3Cpath display='inline' fill='none' stroke='%23FF0000' stroke-width='4' stroke-miterlimit='10' d='M33.9,2'/%3E%3Cpath display='inline' fill='none' stroke='%23FF0000' stroke-width='4' stroke-miterlimit='10' d='M34,2C16.3,2,2,16.3,2,34 s14.3,32,32,32s32-14.3,32-32S51.7,2,34,2'/%3E%3C/g%3E%3Cg id='Layer_11'%3E%3Cpath fill='none' stroke='%23FF0000' stroke-width='4' stroke-miterlimit='10' d='M34,2c11.6,0,21.8,6.2,27.4,15.5 c2.9,4.8,5,16.5-9.4,16.5h-4'/%3E%3C/g%3E%3C/svg%3E");
    }

    .animate-path {
        position: absolute;
        top: 0;
        left: 0;
        width: 68px;
        height: 68px;
    }

    // what this does is create a small square that I then rotate behind an svg mask, giving the apparence of the line animating
    .path-rotation {
        height: 34px;
        width: 34px;
        margin: 34px 34px 0 0;
        transform: rotate(0deg);
        transform-origin: 100% 0;
        &:before {
            content: "";
            display: block;
            width: 30px;
            height: 34px;
            margin: 0 4px 0 0;
            background: $color;
        }
    }

    // box rotation animation
    @keyframes rotate-out {
        0% {
            transform: rotate(0deg);
        }
        40% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes rotate-in {
        0% {
            transform: rotate(360deg);
        }
        40% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    // offset moves
    // dasharray is the dash size
    // need to be able to control dash space size.

    .hamburglar.open {
        .path {
            animation: dash-in $animation linear normal;
            animation-fill-mode: forwards;
        }
        .animate-path {
            animation: rotate-in $animation linear normal;
            animation-fill-mode: forwards;
        }
    }

    .hamburglar:not(.open) {
        .path {
            animation: dash-out $animation linear normal;
            animation-fill-mode: forwards;
        }
        .animate-path {
            animation: rotate-out $animation linear normal;
            animation-fill-mode: forwards;
        }
    }

    .path {
        stroke: $color;
        stroke-dasharray: 240;
        stroke-dashoffset: 240;
        stroke-linejoin: round;
    }

    @keyframes dash-in {
        0% {
            stroke-dashoffset: 240;
        }
        40% {
            stroke-dashoffset: 240;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
    @keyframes dash-out {
        0% {
            stroke-dashoffset: 0;
        }
        40% {
            stroke-dashoffset: 240;
        }
        100% {
            stroke-dashoffset: 240;
        }
    }

    // All good burgers need filling!

    .burger-icon {
        position: absolute;
        padding: 20px 16px;
        height: 68px;
        width: 68px;
    }

    .burger-container {
        position: relative;
        height: 28px;
        width: 36px;
    }

    .burger-bun-top,
    .burger-bun-bot,
    .burger-filling {
        position: absolute;
        display: block;
        height: 4px;
        width: 36px;
        border-radius: 2px;
        background: $color;
    }

    .burger-bun-top {
        top: 0;
        transform-origin: 34px 2px;
    }

    .burger-bun-bot {
        bottom: 0;
        transform-origin: 34px 2px;
    }
    //.burger-filling {
    //  @include transition(all,($animation/2.5),ease-in-//out);
    //}
    // relative parent is the button
    .burger-filling {
        top: 12px;
    }

    // burger ring container
    .burger-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 68px;
        height: 68px;
    }

    .svg-ring {
        width: 68px;
        height: 68px;
    }

    // bun animations
    .hamburglar.open {
        .burger-bun-top {
            animation: bun-top-out $animation linear normal;
            animation-fill-mode: forwards;
        }
        .burger-bun-bot {
            animation: bun-bot-out $animation linear normal;
            animation-fill-mode: forwards;
        }
    }
    .hamburglar:not(.open) {
        .burger-bun-top {
            animation: bun-top-in $animation linear normal;
            animation-fill-mode: forwards;
        }
        .burger-bun-bot {
            animation: bun-bot-in $animation linear normal;
            animation-fill-mode: forwards;
        }
    }

    @keyframes bun-top-out {
        0% {
            left: 0;
            top: 0;
            transform: rotate(0deg);
        }
        20% {
            left: 0;
            top: 0;
            transform: rotate(15deg);
        }
        80% {
            left: -5px;
            top: 0;
            transform: rotate(-60deg);
        }
        100% {
            left: -5px;
            top: 1px;
            transform: rotate(-45deg);
        }
    }

    @keyframes bun-bot-out {
        0% {
            left: 0;
            transform: rotate(0deg);
        }
        20% {
            left: 0;
            transform: rotate(-15deg);
        }
        80% {
            left: -5px;
            transform: rotate(60deg);
        }
        100% {
            left: -5px;
            transform: rotate(45deg);
        }
    }

    @keyframes bun-top-in {
        0% {
            left: -5px;
            bot: 0;
            transform: rotate(-45deg);
        }
        20% {
            left: -5px;
            bot: 0;
            transform: rotate(-60deg);
        }
        80% {
            left: 0;
            bot: 0;
            transform: rotate(15deg);
        }
        100% {
            left: 0;
            bot: 1px;
            transform: rotate(0deg);
        }
    }

    @keyframes bun-bot-in {
        0% {
            left: -5px;
            transform: rotate(45deg);
        }
        20% {
            left: -5px;
            bot: 0;
            transform: rotate(60deg);
        }
        80% {
            left: 0;
            bot: 0;
            transform: rotate(-15deg);
        }
        100% {
            left: 0;
            transform: rotate(0deg);
        }
    }

    // burger filling
    .hamburglar.open {
        .burger-filling {
            animation: burger-fill-out $animation linear normal;
            animation-fill-mode: forwards;
        }
    }

    .hamburglar:not(.open) {
        .burger-filling {
            animation: burger-fill-in $animation linear normal;
            animation-fill-mode: forwards;
        }
    }

    @keyframes burger-fill-in {
        0% {
            width: 0;
            left: 36px;
        }
        40% {
            width: 0;
            left: 40px;
        }
        80% {
            width: 36px;
            left: -6px;
        }
        100% {
            width: 36px;
            left: 0px;
        }
    }

    @keyframes burger-fill-out {
        0% {
            width: 36px;
            left: 0px;
        }
        20% {
            width: 42px;
            left: -6px;
        }

        40% {
            width: 0;
            left: 40px;
        }

        100% {
            width: 0;
            left: 36px;
        }
    }
</style>

<!--
article: https://raygun.io/blog/2014/07/making-svg-html-burger-button/
-->

<div id="hamburger" class="hamburglar" class:open={isOpen} on:click="{toggle}" >
    <div class="burger-icon">
        <div class="burger-container">
            <span class="burger-bun-top" />
            <span class="burger-filling" />
            <span class="burger-bun-bot" />
        </div>
    </div>

    <!-- svg ring containter -->
    <div class="burger-ring">
        <svg class="svg-ring">
            <path
                class="path"
                fill="none"
                stroke-miterlimit="10"
                stroke-width="4"
                d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
        </svg>
    </div>
    <!-- the masked path that animates the fill to the ring -->

    <svg width="0" height="0">
        <mask id="mask">
            <path
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#ff0000"
                stroke-miterlimit="10"
                stroke-width="4"
                d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
        </mask>
    </svg>
    <div class="path-burger">
        <div class="animate-path">
            <div class="path-rotation" />
        </div>
    </div>
</div>

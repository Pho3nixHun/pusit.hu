<script context="module" lang="ts">
    
</script>
<script lang="ts">
    import * as Icons from 'svelte-awesome/icons';	
    import { _ } from 'svelte-i18n';
    import Icon from 'svelte-awesome';
$: socials = $_('company.socials');
</script>

<style lang="scss">
    .contacts {
        display: flex;
        flex-direction: column;
        span {
            &.key {
                font-weight: 600;
            }
            &.value {
                margin-left: 1rem;
            }   
        }
        .social {
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            a {
                background: #eceeef;
                color: #818a91;
                font-size: 16px;
                display: inline-block;
                line-height: 40px;
                width: 44px;
                height: 44px;
                text-align: center;
                margin-right: 8px;
                border-radius: 100%;
                -webkit-transition: all 0.2s linear;
                -o-transition: all 0.2s linear;
                transition: all 0.2s linear;
                &:active, &:focus, &:hover {
                    color: #fff;
                    background: #29aafe;
                }
                &.facebook:hover {
                    background: #3b5998;
                }
                &.instagram:hover {
                    background: #d6249f;
                    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
                }
                &.pinterest:hover {
                    background-color: #bd081c;
                }
            }
        }
    }
</style>

<div class="m-3 {$$props.class ?? ''}" style="{$$props.style ?? ''}">
    <h3 class="mb-4">Elérhetőségeink</h3>
    <div class="contacts mb-3">
        <span class="key">{$_('registrationNumber')}</span><span class="value">{$_('company.registrationNumber')}</span>
        <span class="key">{$_('taxNumber')}</span><span class="value">{$_('company.taxNumber')}</span>
        <span class="key">{$_('euTaxNumber')}</span><span class="value">{$_('company.euTaxNumber')}</span>
        <span class="key">{$_('bankAccountNumber')}</span><span class="value">{$_('company.bankAccountNumber')}</span>
        <span class="key">{$_('phone')}</span><span class="value">{$_('company.phone')}</span>
        <span class="key">{$_('cell')}</span><span class="value">{$_('company.cell')}</span>
        <span class="key">{$_('email')}</span><span class="value">{$_('company.email')}</span>
        <span class="key">{$_('premise')}</span><span class="value">{$_('company.address')}</span>
        <span class="key">{$_('openhours')}</span><span class="value">{$_('company.openhours')}</span>
        <span class="social mt-3">
            {#each Object.keys(socials).map(key => ({key, value: socials[key] })) as social}
                    <a 
                        class="{social.key}" 
                        target="_blank"
                        href="{social.value}"
                        alt="{social.key} icon" 
                        aria-label="{social.key}">
                        <Icon data={Icons[social.key]} scale=1.5/>
                    </a>
                
            {/each}
        </span>
    </div>
    <hr>
    <h5 class="mb-4">{$_('messageUs')}</h5>
    <form>
        <div class="form-group">
            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="{$_('name')}">
        </div>
        <div class="form-group">
            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="{$_('email')}">
            <small id="emailHelp" class="form-text text-muted">{$_('weWillNeverShareEmail')}</small>
        </div>
        <div class="form-group">
            <input type="phone" class="form-control" aria-describedby="emailHelp" placeholder="{$_('phone')}">
            <small id="emailHelp" class="form-text text-muted">{$_('weWillNeverSharePhone')}</small>
        </div>
        <div class="form-group">
            <textarea class="form-control" rows="3" placeholder="{$_('message')}"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">{$_('send')}</button>
    </form>

</div>
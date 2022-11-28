<script lang="ts">
    //import { getContext, onMount } from 'svelte'
    import { ValidationMessage } from '@felte/reporter-svelte';
    export let name: string;
    export let value: string;
    export let label: string;
    export let disabled = false;
    export let lines = 1;
    export let onChange = (name: string, value: string) => {};
</script>

<div class="w-full px-1 mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={name}>
        {label}
    </label>
    {#if lines === 1}
        <input disabled={disabled} on:change={()=>onChange(name, value)} bind:value class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
        {:else}
        <textarea disabled={disabled} rows={lines} on:change={()=>onChange(name, value)} bind:value class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"></textarea>
    {/if}
    <slot>
        <ValidationMessage for={name} let:messages={message}>
            {#if message}
                <span class="text-red-500 text-xs italic">{message}</span>
            {/if}
        </ValidationMessage>
    </slot>
</div>
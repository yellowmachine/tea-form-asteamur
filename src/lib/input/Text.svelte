<script lang="ts">
    //import { getContext, onMount } from 'svelte'
    import { ValidationMessage } from '@felte/reporter-svelte';
    export let name: string;
    export let value: string;
    export let label: string;
    export let lines = 1;
    export let onChange = (name: string, value: string) => {};

    //const { setTouched } = getContext<Record<string, any>>('asteamur-Form')
    //onMount(()=>setTouched(name, false))
</script>

<div class="w-full px-1 mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={name}>
        {label}
    </label>
    {#if lines === 1}
        <!--<input on:change={()=>onChange(name, value)} on:input={()=>setTouched(name, true)} bind:value class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">-->
        <input on:change={()=>onChange(name, value)} bind:value class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
        {:else}
        <textarea rows={lines} on:change={()=>onChange(name, value)} bind:value class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
    {/if}
    <slot>
        <ValidationMessage for={name} let:messages={message}>
            {#if message}
                <span class="text-red-500 text-xs italic">{message}</span>
            {/if}
        </ValidationMessage>
    </slot>
</div>
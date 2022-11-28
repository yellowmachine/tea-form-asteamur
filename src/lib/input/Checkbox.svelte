<script lang="ts">
    //import { getContext, onMount } from 'svelte'
    export let name;
    export let value;
    export let label;
    export let onChange = (name: string, value: string) => {};

    //const { setTouched } = getContext('asteamur-Form')
    //onMount(()=>setTouched(name, false))
</script>

<div class="w-full px-3 mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="default-checkbox">
        {label}
    </label>
    <input id="default-checkbox" type="checkbox" on:change={()=>onChange(name, value)} bind:checked={value} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">    
</div>
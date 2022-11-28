<script lang="ts">
    //import { getContext, onMount } from 'svelte' 
    import { useQuery } from '@sveltestack/svelte-query'
    import Svelecte from 'svelecte'
    import { Q } from './query'

    export let name: string;
    export let value: {value: string, text: string} | null;
    export let label: string;
    export let query: string;  
    export let onChange = (name: string, value: any) => {};

    const f = Q[query]
    const result = useQuery('todos', f)

    //const { setTouched } = getContext<Record<string, any>>('asteamur-Form')
    //onMount(()=>setTouched(name, false))

    let options: {value: string, text: string}[] = []
    $: options = $result.data || value ? [value]: []

</script>

<div class="w-full px-3 mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={name}>
      {label}
    </label>
    <div class="relative" id={name}>
        <Svelecte 
        {options}
        valueAsObject
        on:change={()=>onChange(name, value)}
        bind:value
    ></Svelecte>
    </div>
  </div>



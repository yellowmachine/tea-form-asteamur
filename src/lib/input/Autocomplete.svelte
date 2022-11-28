<script lang="ts">
    //import { getContext, onMount } from 'svelte'
    import AutoComplete from 'simple-svelte-autocomplete';
    import { useQuery } from '@sveltestack/svelte-query'

    export let name
    export let value
    export let label
    export let onChange = (name: string, value: string) => {};

    const colors = [
        {value: "red", text: "Red"},
        {value: "blue", text: "Blue"},
        {value: "white", text: "White"},
        {value: "yellow", text: "Yellow"}
    ];

    const result = useQuery('colors', async () => colors)

    //const { setTouched } = getContext<Record<string, any>>('asteamur-Form')
    //onMount(()=>setTouched(name, false))

    let options = []
    $: options = $result.data || []

</script>

<div class="w-full px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
      {label}
    </label>
    <AutoComplete    
        onChange={()=>onChange(name, value)}
        inputClassName="asteamur-input"
        items={options} 
        labelFieldName="text"
        valueFieldName="value"
        bind:selectedItem={value}
        /> 

  </div>
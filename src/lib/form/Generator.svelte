<script lang="ts">
    import Horizontal from "../container/Horizontal.svelte";
    import type { ElementGenerator, Element } from './generator'
    import { role } from "@/store";

    type T = $$Generic;

    function g(x: Element[][] | ((arg0: T)=> ElementGenerator)): Element[][]{
        if(typeof x === 'function') return [...x(value)].filter(arr => arr.length > 0)
        return x.filter(arr => arr.length > 0)
    }

    export let elements: Element[][] | ((x: T)=> ElementGenerator);
    export let onChange: (name: string, value: any) => void;
    export let value: T;

    const r = role()
</script>

{#each [...g(elements)] as row (row[0].name)}
    <Horizontal>
        {#each row as component ('_'+component.name)}
            <svelte:component 
                name={component.name} 
                label={component.label}
                this={component.c} 
                value={value[component.name]}
                disabled={component.allowed? !component.allowed(r): false} 
                {onChange} 
                {...component.opts} 
        />
        {/each}
    </Horizontal>
{/each}




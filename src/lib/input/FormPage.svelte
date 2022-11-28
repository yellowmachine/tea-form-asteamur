<script lang="ts">
    import { useQuery } from '@sveltestack/svelte-query'
    import type { FormPageOptions } from '../form/formPage';
    import { useMutation } from '@sveltestack/svelte-query'
    import { showMutationToast } from '@/toats';
    import { validator } from '@felte/validator-zod';
    import { createForm } from 'felte';
    import { reporter } from '@felte/reporter-svelte';
    import Error404 from '../Error404.svelte';
    
    type T = $$Generic<Record<any, any>>;
    
    export let id: string | null;
    export let options: FormPageOptions<T>;

    const { mutation, schema } = options;

    const { data, form, errors, setFields, setData } = createForm<T>({
      extend: [
        reporter,
        validator({ schema })
      ],
    });
    
    const _mutation = useMutation(()=>mutation(id, $data))
  
    function submit(){
        //return $_mutation.mutate()
    }

    function onChange(name, data) {
        setFields(name, data, true);
    }

    $: showMutationToast($_mutation)

    const result = useQuery<T>(options.tag(id || ""), () => options.queryOne(id), {enabled: !!id})
    
    let v
    $: {
        if(id === null) v = options.initialValues
        //else v = $result.data
        setData(v)
    }
</script>

{#await $result.isLoading}
    <div>Loading...</div>
{:then}
    {#if $result.isError}
        <div>No se ha encontrado el recurso</div>
        <Error404 />
    {:else}
        <div class="">
            <form use:form>
                <slot data={$data} errors={$errors} {submit} {onChange} />
            </form>
        </div>
    {/if}
{/await}

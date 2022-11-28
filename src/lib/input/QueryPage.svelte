<script lang="ts">
    import { createForm } from 'felte';
    import { reporter } from '@felte/reporter-svelte';
    import type { QueryPageOptions } from '../form/queryPage';
    import { validator } from '@felte/validator-zod';
    import { useQuery, useQueryClient } from '@sveltestack/svelte-query';

    type T = $$Generic;
    type G = $$Generic<Record<any, any>>;


    export let options: QueryPageOptions<G, T>;

    const { initialValues, schema, tag, query, enabled} = options;
    const queryClient = useQueryClient();

    const { data, form, setFields} = createForm<G>({
        onSubmit: (v) => console.log(v),
        initialValues,
        extend: [
          reporter,
          validator({ schema })
        ],
      });
    const result = useQuery<T>(tag, () => query($data), {enabled: enabled($data)})

    function onChange(name, data) {
        setFields(name, data, true);
    }

    function submit(){
        queryClient.invalidateQueries(tag)
    }

    $: {
        result.setOptions(
            tag,
            () => query($data),
            {
                enabled: enabled($data),
            }
        )
    }

</script>

<div>
    <form use:form>
        <slot name="form" data={$data} {onChange} {submit} />
    </form>
    <slot name="data" data={$result.data} />
</div>
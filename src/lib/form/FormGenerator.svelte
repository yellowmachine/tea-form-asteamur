<script lang="ts">
    import { FormPage} from '@/lib/input'
    import Generator from './Generator.svelte';
    import type { ElementGenerator, Element } from './generator';
    import type { FormPageOptions } from './formPage';

    type T = $$Generic<Record<any, any>>;

    export let id: string | null = null;
    export let elements: Element[][] | ((x: T)=> ElementGenerator);
    export let options: FormPageOptions<T>;

</script>

<FormPage {id} {options} let:data let:submit let:onChange>
  <Generator {onChange} value={data} {elements} />
  <button on:click={submit} class="btn col-span-2 place-self-center" type="submit">Guardar</button>
</FormPage>

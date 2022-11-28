<script lang="ts">
    import Formgenerator from "@/lib/form/FormGenerator.svelte";
    import { elements, formPageOptions as options } from "@/lib/user";

    let id = null;
    //$: id = decodeURIComponent($params.id || null)
</script>

<main>
  <Formgenerator {id} {options} {elements} />
</main>

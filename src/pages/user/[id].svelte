<script lang="ts">
    import { url, params } from '@roxi/routify'
    import Formgenerator from "@/lib/form/FormGenerator.svelte";
    import { elements, formPageOptions as options } from "src/lib/user";

    $: id = decodeURIComponent($params.id || null)
    
</script>

<a href={$url('../')}>Go Home</a>
<Formgenerator {id} {options} {elements} />
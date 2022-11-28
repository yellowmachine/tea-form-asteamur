<script lang="ts">
    import Formgenerator from "@/lib/form/FormGenerator.svelte";
    import { elements, formPageOptions as options } from "src/lib/user";

</script>

<Formgenerator {options} {elements} />
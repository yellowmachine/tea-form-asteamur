<script lang="ts">
    import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'
    import { ToastContainer, FlatToast }  from "svelte-toasts";
    import Formgenerator from "@/lib/form/FormGenerator.svelte";
    import { elements, formPageOptions as options } from "@/lib/user";

    const queryClient = new QueryClient()
    let id = null;
</script>

<QueryClientProvider client={queryClient}>
  <Formgenerator {id} {options} {elements} />
</QueryClientProvider>

<ToastContainer let:data={data}>
  <FlatToast {data}  />
</ToastContainer>


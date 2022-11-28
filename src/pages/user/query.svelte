<script lang="ts">
    import Horizontal from '@/lib/container/Horizontal.svelte'
    import { QueryPage, Text } from "@/lib/input"
    import SvelteTable from "svelte-table";
    import { queryPageOptions as options } from '@/lib/user'

    const columns = [
        {
            key: "name",
            title: "Nombre",
            value: v => v.name,
        },
        {
            key: "email",
            title: "E-mail",
            value: v => v.email,
        }
    ]

    function textSubmit(filter){
        return !options.enabled(filter) ? "Es necesario nombre o teléfono": "Submit!"
    }

</script>

<h1>Búsqueda de usuarios</h1>
<QueryPage {options} >
    <div slot="form" let:data let:onChange let:submit>
        <Horizontal>
            <Text name="name" label="Nombre" value={data.name} {onChange}/>
            <Text name="phone" label="Teléfono" value={data.phone} {onChange}/>     
            <button disabled={!options.enabled(data)} 
                    on:click={submit}
                    class="btn col-span-2 place-self-center" type="submit">
                {textSubmit(data)}
            </button>       
        </Horizontal>
    </div>
    <div slot="data" let:data>
        <SvelteTable rows={data} columns={columns} />
    </div>
</QueryPage>

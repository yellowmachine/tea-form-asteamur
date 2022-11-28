<script lang="ts">
    import Svelecte from 'svelecte'

    export let name: string;
    export let value: string;
    export let label: string;  
    export let onChange = (name: string, value: string) => {};

    let options = [{value: "ADMIN", text: "Admin"}, {value: "TERAPEUTA", text: "Terapeuta"}, {value: "DIRECTORA", text: "Directora"}]

</script>

<div class="w-full px-3 mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={name}>
      {label}
    </label>
    <div class="relative" id={name}>
        <Svelecte 
        {options}
        on:change={()=>onChange(name, value)}
        bind:value
    ></Svelecte>
    </div>
  </div>



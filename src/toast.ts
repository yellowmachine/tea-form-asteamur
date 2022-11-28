import { toasts }  from "svelte-toasts"; 
import type { UseMutationResult } from '@sveltestack/svelte-query'

export const showMutationToast = (m: UseMutationResult) => {
    if(m.isLoading){
      toasts.add({
        title: 'Info',
        description: 'Guardando datos...',
        duration: 3000, // 0 or negative to avoid auto-remove
        placement: 'bottom-right',
        type: 'info',
        theme: 'dark',
        showProgress: true,
        onClick: () => {},
        onRemove: () => {},
      });
    } 
    if(m.isSuccess){
      toasts.add({
        title: 'Success',
        description: 'Datos guardados!',
        duration: 3000, // 0 or negative to avoid auto-remove
        placement: 'bottom-right',
        type: 'info',
        theme: 'dark',
        showProgress: true,
        onClick: () => {},
        onRemove: () => {},
      });
    } 
    if(m.isError){
      toasts.add({
        title: 'Error',
        description: 'Ha ocurrido un error',
        duration: 3000, // 0 or negative to avoid auto-remove
        placement: 'bottom-right',
        type: 'info',
        theme: 'dark',
        showProgress: true,
        onClick: () => {},
        onRemove: () => {},
      });
      m.reset()
    }
  }
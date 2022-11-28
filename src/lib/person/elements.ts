import { Text } from '@/lib/input'
import type { Element } from '../form/generator';

export const elements: Element[][] = 
  [
      [
        {name: "name", label: "Nombre", c: Text},
        {name: "surname", label: "Apellidos", c: Text},
      ], [
        {name: "email", label: "E-mail", c: Text},
        {name: "phone", label: "Teléfono", c: Text},
      ], [
        {name: "addres", label: "Dirección", c: Text, opts: {lines: 5}},
        {name: "location", label: "Localidad", c: Text},
        {name: "area", label: "Área", c: Text, opts: {query: 'AREA'}}
      ]  
]

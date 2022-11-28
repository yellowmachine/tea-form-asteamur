import { RoleSelect, Checkbox} from '@/lib/input'
import { elements as personElements } from '../person/elements';
import type { ElementGenerator } from '../form/generator';
import type { User } from '.'

export function *iterElements(u: User): ElementGenerator{
  yield *personElements;
  yield [{name: "active", label: "Activo", c: Checkbox}];
  if(u.active) 
    yield [{name: "role", label: "Rol", c: RoleSelect}]
}
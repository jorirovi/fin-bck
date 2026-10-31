import type { Validaciones } from "../interfaces/errores.type.js";

export class ValidaCampos {
   static nomPerfilVal(nombre: string): Validaciones {
      const nomRegex = /[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
      if(!nomRegex.test(nombre)){
         return {
               estado: false,
               error: "El nombre de Perfil no es correcto"
         }
      }
      return {
         estado: true
      }   
   }

   static passVal(pass: string): Validaciones {
      if(pass.length < 8) {
        return {
            estado: false,
            error: "La contraseña debe tener al menos 8 caracteres"
        }
      }
      if (!/[A-Z]/.test(pass)) {
         return {
               estado: false,
               error: "La contraseña debe contener al menos una mayúscula"
         }
      }
      if (!/[a-z]/.test(pass)) {
         return {
               estado: false,
               error: "La contraseña debe contener al menos una minúscula"
         }
      }
      if (!/[0-9]/.test(pass)) {
         return {
               estado: false,
               error: "La contraseña debe contener al menos un número"
         }
      }
      if (!/[^A-Za-z0-9]/.test(pass)){
         return {
               estado: false,
               error: "La contraseña debe contener al menos un carácter especial"
         }
      }
      return {
         estado: true
      }
   }

   static nomVal (nombre: string): Validaciones {
      const nomRegex = /[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
      if(!nomRegex.test(nombre)){
         return {
               estado: false,
               error: "El nombre no es correcto"
         }
      }
      return {
         estado: true
      }
   }

   static emailVal (email: string): Validaciones {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return {
            estado: false,
            error: 'Email no Valido'
         }
      }
      return {
         estado: true
      }
   }
}

type User  = UserFormValues & {
  token?: string;
}

type UserFormValues = {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
}

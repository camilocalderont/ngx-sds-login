export interface UserSC {
    VcIdAzure: string;
    VcCorreo: string;
    VcPrimerNombre: string;
    VcSegundoNombre: string;
    VcPrimerApellido: string;
    VcSegundoApellido: string;
    VcIdpAzure: string;
}


export type UserB2C = {    
    oid: string;
    emails: string[];
    given_name: string;
    family_name: string;
    idp: string;
    exp: number;
    auth_time: number;
}

export enum EstadoUsuario {
    Registrado = 0,
    Activo = 1,
    Inactivo = 2,
}

export interface RolLogin{
    id: number;
    vcCodigoInterno: string;
}

export interface UserLogin {
    id: number;
    rolId: number;
    tipoEntidadId: number;
    entidadId: number;
    tipoDocumentoId: number;
    vcDocumento: string;
    vcPrimerNombre: string;
    vcPrimerApellido: string;
    vcSegundoNombre: string;
    vcSegundoApellido: string;
    vcCorreo: string;
    vcTelefono: string;
    vcDireccion: string;
    vcIdAzure: string;
    VcIdpAzure: string;
    iEstado: EstadoUsuario;
    dtFechaCreacion: number;
    dtFechaActualizacion: number;
    dtFechaAnulacion: number;
    unidadPrestacionServiciosId: number;
    roles: RolLogin[];
}

export const UserLoginEmptyState: UserLogin = {
    id: 0,
    rolId: 0,
    tipoEntidadId: 0,
    entidadId: 0,
    tipoDocumentoId: 0,
    vcDocumento: '',
    vcPrimerNombre: '',
    vcPrimerApellido: '',
    vcSegundoNombre: '',
    vcSegundoApellido: '',
    vcCorreo: '',
    vcTelefono: '',
    vcDireccion: '',
    vcIdAzure: '',
    iEstado: 0,
    dtFechaCreacion: 0,
    dtFechaActualizacion: 0,
    dtFechaAnulacion: 0,
    unidadPrestacionServiciosId: 0,
    VcIdpAzure: '',
    roles: [],
};

export interface Menu{
    id:number;        
    moduloId:number;
    vcNombre:string;
    vcDescripcion:string;
    vcRedireccion:string;
    icono:string;
    bEstado:boolean;
    padreId:number;
    dtFechaCreacion:string;
    dtFechaActualizacion:string;
    dtFechaAnulacion:string;
    bPublico:boolean;
    hijos:Menu[];    
}

export const MenuItemEmptyState : Menu = {
    id: 0,        
    moduloId: 0,
    vcNombre: '',
    vcDescripcion: '',
    vcRedireccion: '',
    icono: '',
    bEstado: false,
    padreId: 0,
    dtFechaCreacion: '',
    dtFechaActualizacion: '',
    dtFechaAnulacion: '',
    bPublico: false,
    hijos: []
};

export const MenuEmptyState: Menu[] = [
    MenuItemEmptyState
];


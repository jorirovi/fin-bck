//Union Descriminativa
export type Validaciones =
    | {
        estado: true;
    }
    | {
        estado: boolean,
        error: string
    }
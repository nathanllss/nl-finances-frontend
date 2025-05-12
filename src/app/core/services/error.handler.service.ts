import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(private toastr: ToastrService) {}

    handleError(error: any): string {
        let errorMessage = 'Ocorreu um erro ao realizar a operação';

        if (error.error?.message) {
            errorMessage = error.error.message;
        } else if (error.status === 401) {
            errorMessage = 'Usuário ou senha inválidos';
        } else if (error.status >= 500) {
            errorMessage = 'Erro de conexão com o servidor';
        }

        this.toastr.error(errorMessage);
        return errorMessage;
    }
}


import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatButtonModule} from '@angular/material/button';
import {
    MatCard, MatCardAvatar,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle
} from '@angular/material/card';


@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        MatIconModule,
        MatIconButton,
        MatButtonModule,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCardFooter,
        MatCardAvatar,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    hide = signal(true);

    clickEvent(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();
    }

    loginForm: FormGroup;
    errorMessage?: string;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
    ) {
        this.loginForm = this.fb.group({
            login: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false]
        })
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: () => {
                    this.toastr.success('Login realizado com sucesso!');
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    let errorMessage = 'Ocorreu um erro ao realizar o login';

                    if (error.error?.message) {
                        errorMessage = error.error.message;
                    } else if (error.status === 401) {
                        errorMessage = 'Usuário ou senha inválidos';
                    } else if (error.status >= 500) {
                        errorMessage = 'Erro de conexão com o servidor';
                    }

                    this.toastr.error(errorMessage);
                }
            });
        } else {
            this.markFormGroupTouched(this.loginForm);
            //this.toastr.warning('Por favor, preencha todos os campos corretamente');
        }
    }


    private markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

}

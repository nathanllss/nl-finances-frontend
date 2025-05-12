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
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';
import {ErrorHandlerService} from '../../../core/services/error.handler.service';


@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCardFooter,
        MatCardAvatar,
        FormFieldComponent,
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

    // TODO: refatorar html

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private errorHandler: ErrorHandlerService
    ) {
        this.loginForm = this.fb.group({
            login: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false]
        })
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
            this.authService.login(this.loginForm.value).subscribe({
                next: () => {
                    this.toastr.success('Login realizado com sucesso!');
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.errorHandler.handleError(error);
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

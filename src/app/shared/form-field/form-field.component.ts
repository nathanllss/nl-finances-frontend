import {Component, Input} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-form-field',
    imports: [
        MatFormField,
        MatLabel,
        MatIcon,
        ReactiveFormsModule,
        MatIconButton,
        MatInput,
        NgIf,
        NgForOf,
        MatHint,
    ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
    @Input() label: string = '';
    @Input({ required: true }) control!: FormControl<any>;
    @Input() id: string = '';
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() hint?: string;
    @Input() field?: string;

    hidePassword = true;

    onTogglePassword(event: MouseEvent) {
        this.hidePassword = !this.hidePassword;
        event.stopPropagation();
    }

    getErrorMessages(): string[] {
        if (!this.control.errors) return [];

        const messages: string[] = [];
        const errors = this.control.errors;

        if (errors['required']) messages.push(`${this.field} é obrigatório.`);
        if (errors['email']) messages.push('Formato de email inválido.');
        if (errors['minlength']) messages.push(`${this.field} deve ter no mínimo ${errors['minlength'].requiredLength} caracteres.`);

        return messages;
    }
}


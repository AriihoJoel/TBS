import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loading = false; //Loading state (shows spinner initially)
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    username : ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private router : Router){}

    submit(){
      if(this.loginForm.invalid)
        {
          this.loginForm.markAsTouched();
          return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.authService.login(this.loginForm.getRawValue()).subscribe({
          next:() => {
            this.router.navigateByUrl('admin/inquiries');
          },

          error: () => {
            this.errorMessage = "Invalid Username or Password";
            this.loading = false;
          }
    });

    }

}

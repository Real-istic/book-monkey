import { Directive, OnDestroy, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../shared/auth.service';

@Directive({
  selector: '[bmLoggedinOnly]'
})
export class LoggedinOnlyDirective implements OnDestroy {
  private destroy$ = new Subject<void>();
  private authService = inject(AuthService);
  private template = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);


  constructor() {
    this.authService.isAuthenticated$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.viewContainer.createEmbeddedView(this.template);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}

import {
  ApplicationRef, ComponentFactoryResolver, Injectable,
  Injector, ComponentRef
} from '@angular/core';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';


@Injectable({ providedIn: 'root' })
export class ConfirmationModalService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  openDeleteModal(content: any): Promise<boolean> {
    return new Promise((resolve) => {
      const factory = this.resolver.resolveComponentFactory(ConfirmationModalComponent);
      const componentRef = factory.create(this.injector);

      componentRef.instance.content = content;
      componentRef.instance.confirmed.subscribe((result: boolean) => {
        this.destroy(componentRef);
        resolve(result);
      });

      this.appRef.attachView(componentRef.hostView);
      document.body.appendChild(componentRef.location.nativeElement);
    });
  }

  private destroy(componentRef: ComponentRef<any>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}

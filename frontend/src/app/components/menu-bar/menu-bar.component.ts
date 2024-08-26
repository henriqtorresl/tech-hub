import { AfterViewChecked, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements AfterViewChecked {

  titleMobile: string = '<TH />';
  title: string = '<TechHub />';
  @ViewChild('containerMobile') containerMobile!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2 // Injeção do serviço Renderer2 para manipulação segura do DOM
  ) {}

  // Este método é chamado automaticamente após a visualização do componente ser verificada
  ngAfterViewChecked(): void {
    this.updateContainerVisibility(); // Atualiza a visibilidade dos containers
  }

  // O HostListener escuta o evento de redimensionamento da janela
  // Isso permite que o componente atualize os estilos quando a janela é redimensionada
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateContainerVisibility();
  }

  // Função que controla a visibilidade dos containers com base na largura da tela e na URL atual
  private updateContainerVisibility(): void {
    const screenWidth = window.innerWidth; // Obtém a largura da tela

    if (this.router.url === '/auth') {
      // Se a URL for '/auth', ambos os containers são ocultados
      this.renderer.setStyle(this.containerMobile.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.container.nativeElement, 'display', 'none');
    } else {
      if (screenWidth < 768) {
        // Se a largura da tela for menor que 768px, exibe o container mobile e oculta o container desktop
        this.renderer.setStyle(this.containerMobile.nativeElement, 'display', 'flex');
        this.renderer.setStyle(this.container.nativeElement, 'display', 'none');
      } else {
        // Se a largura da tela for 768px ou maior, exibe o container desktop e oculta o container mobile
        this.renderer.setStyle(this.containerMobile.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.container.nativeElement, 'display', 'flex');
      }
    }
  }

  isActive(route: string): string {
    return this.router.url.includes(route) ? 'is-active' : '';
  }

}
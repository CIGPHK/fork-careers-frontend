import { Component } from '@angular/core';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'careers-footer',
  template: `
    <div>&copy; 2021 CIGP</div>
    <div>
      <a href="https://www.linkedin.com/company/cigpgroup" target="_blank"
        ><fa-icon [icon]="linkedin" size="2x"></fa-icon
      ></a>
    </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  linkedin = faLinkedin;
}

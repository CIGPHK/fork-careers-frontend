import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'careers-yes-no-dialog',
  template: `
    <nb-card>
      <nb-card-header>{{ title | uppercase }}</nb-card-header>
      <nb-card-body>
        {{ body }}
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="primary" (click)="close(true)">YES</button>
        <button nbButton (click)="close(false)">NO</button>
      </nb-card-footer>
    </nb-card>
  `,
  styles: ['nb-card { max-width: 600px; max-height: 500px; }']
})
export class YesNoDialogComponent {
  @Input()
  public title: string;

  @Input()
  public body: string;

  constructor(protected dialogRef: NbDialogRef<YesNoDialogComponent>) {}

  public close(response: boolean) {
    this.dialogRef.close(response);
  }
}

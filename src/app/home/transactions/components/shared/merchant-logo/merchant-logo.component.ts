import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getMerchantAvatar } from '../../../../../shared/shared.config';

@Component({
  selector: 'cmp-merchant-logo',
  templateUrl: './merchant-logo.component.html',
  styleUrls: ['./merchant-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantLogoComponent {
  @Input() merchant: string;
  @Input() merchantLogo: Blob;

  get avatar(): string {
    return !this.merchantLogo
      ? getMerchantAvatar(this.merchant)
      : undefined;
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { CustomControl } from '../../../core/controls/custom-control';
import { buildControlValueAccessorProvider } from '../../../core/controls/custom-control.config';

@Component({
  selector: 'ctrl-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    buildControlValueAccessorProvider(TextInputComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent extends CustomControl {
  @Input() maxLength = 200;
  @Input() label = '';
  @Input() allowClear = false;

  @ViewChild('textInput', { static: true }) textInput: ElementRef<HTMLInputElement>;

  readonly errorTemplateName = 'error';
  readonly iconTemplateName = 'icon';

  constructor(
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(changeDetectorRef);
  }

  get isEmpty(): boolean {
    return !this.inputLength;
  }

  get inputLength(): number {
    return this.value.length;
  }

  get showError(): boolean {
    return this.showTemplate(this.errorTemplateName);
  }

  get errorTemplate(): TemplateRef<any> {
    return this.getTemplate(this.errorTemplateName);
  }

  get iconTemplate(): TemplateRef<any> {
    return this.getTemplate(this.iconTemplateName);
  }

  clear(): void {
    this.value = '';
    this.CustomControlUpdateModel();
  }

  onInput(): void {
    this.CustomControlUpdateModel();
  }

  protected get templateNamesToInitialize(): string [] {
    return [this.errorTemplateName, this.iconTemplateName];
  }

  protected CustomControlInitializeModelData(value: string): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  protected CustomControlModelChangeGetValues(): string {
    return this.value;
  }

  private get value(): string {
    return this.textInput.nativeElement.value;
  }

  private set value(value: string) {
    this.textInput.nativeElement.value = value;
  }
}

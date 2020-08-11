import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ContentChildren,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CustomControlDestroyNotifier } from './custom-control-destroy-notifier';
import { CustomControlTemplateDirective } from './custom-control-template.directive';
import { customControlTemplateNullReference, CustomControlTemplateReference } from './custom-control-template.config';

export abstract class CustomControl
  extends CustomControlDestroyNotifier
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, ControlValueAccessor, OnChanges {
  @Input() placeholder = '';
  @Input() disabled = false;

  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  @ContentChildren(CustomControlTemplateDirective) templates: QueryList<any>;

  private _templates: Map<string, CustomControlTemplateReference>;

  protected constructor(
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.CustomControlInit();
  }

  ngAfterViewInit(): void {
    this.initializeTemplates();
    this.CustomControlAfterViewInit();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.CustomControlDestroy();
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.CustomControlChanges(changes);
  }

  protected CustomControlInit(): void {}
  protected CustomControlAfterViewInit(): void {}
  protected CustomControlDestroy(): void {}
  protected CustomControlChanges(changes: SimpleChanges): void {}

  writeValue(value: any): void {
    this.CustomControlInitializeModelData(value);
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  protected CustomControlUpdateView(): void {
    this.changeDetectorRef.markForCheck();
  }

  protected CustomControlUpdateModel(value?: any): void {
    const data = value || this.CustomControlModelChangeGetValues();

    this.onModelChange(data);
  }

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  protected abstract CustomControlInitializeModelData(value: any): void;

  protected abstract CustomControlModelChangeGetValues(): any;

  // region Templates

  get hasTemplates(): boolean {
    return Boolean(this._templates && this._templates.size);
  }

  isTemplateProvided(name: string): boolean {
    return this.hasTemplates && this._templates.has(name);
  }

  getTemplate(name: string): TemplateRef<any> {
    return this.getTemplateConfig(name).template;
  }

  showTemplate(name: string): boolean {
    return this.getTemplateConfig(name).show;
  }

  getTemplateConfig(name: string): CustomControlTemplateReference {
    const templateRef = this.hasTemplates && this._templates.get(name);

    return templateRef || customControlTemplateNullReference;
  }

  protected get templateNamesToInitialize(): string[] {
    return [];
  }

  protected addTemplate(templateRef: CustomControlTemplateReference = customControlTemplateNullReference): void {
    if (!templateRef.name || !templateRef.template) {
      return;
    }

    if (!this._templates) {
      this._templates = new Map<string, CustomControlTemplateReference>();
    }

    this._templates.set(templateRef.name, templateRef);
  }

  private initializeTemplates(): void {
    const namesToInitialize = this.templateNamesToInitialize;

    this.templates.forEach((templateDirective: CustomControlTemplateDirective) => {
      if (namesToInitialize.includes(templateDirective.name)) {
        this.addTemplate(templateDirective);
      }
    });
  }

  // endregion
}

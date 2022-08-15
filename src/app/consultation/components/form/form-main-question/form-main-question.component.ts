import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { debounceTime, Subject, SubscriptionLike, tap } from 'rxjs';
import { formGroupStatusChanges, formGroupTrim, formGroupValidate, fullUnsubscribe } from 'src/utils';
import { PreparationService } from '../../../services/preparation.service';
import { IPreparationAnswer } from '../../../../api/models';

@Component({
  selector: 'app-form-main-question',
  templateUrl: './form-main-question.component.html',
  styleUrls: ['./form-main-question.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMainQuestionComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Запишите ответ на этот вопрос';
  @Input() submitButtonText: string;
  @Input() formCode = '';
  @Output() formSubmit = new EventEmitter<IPreparationAnswer>();
  public formGroup: FormGroup;
  public formErrors: { [name: string]: Subject<string[]> } = {
    answer: new Subject<string[]>(),
  };
  public error: any;
  private dataSub: SubscriptionLike[] = [];
  private validationSub: SubscriptionLike[] = [];
  public trackByFn = (i: number, item: any) => item;

  get isDisabled(): boolean {
    return this.formGroup.disabled || this.formGroup.invalid;
  }

  get errorsList(): Params {
    return {
      maxLength: 'Сформулируйте ответ покороче',
    };
  }

  get answerPreparation(): IPreparationAnswer {
    const { answer } = this.formGroup.value;
    return { value: answer, form_code: this.formCode };
  }

  submitForm(): void {
    formGroupTrim(this.formGroup);
    formGroupValidate(this.formGroup);
    if (this.formGroup.valid) {
      this.preparation.saveAnswer(this.answerPreparation);
      this.formSubmit.emit(this.answerPreparation);
    }
  }

  ngOnInit(): void {
    const validators = !!this.submitButtonText ? [Validators.required] : [];
    this.formGroup = this.fb.group({
      answer: [null, [...validators, Validators.maxLength(500)]],
    });

    this.validationSub.push(formGroupStatusChanges(this.formGroup, this.formErrors, this.errorsList));

    this.dataSub.push(this.formGroup.controls['answer'].valueChanges.pipe(debounceTime(500), tap(t => {
      this.preparation.saveAnswer(this.answerPreparation);
    })).subscribe());

    this.dataSub.push(this.preparation.answerByFormCode$(this.formCode).pipe(tap(a => {
      if (!!a && a.value?.length > 0) {
        this.formGroup.controls['answer'].patchValue(a.value);
      }
    })).subscribe());
  }

  ngOnDestroy(): void {
    fullUnsubscribe(this.validationSub);
    fullUnsubscribe(this.dataSub);
  }

  constructor(private fb: FormBuilder, private preparation: PreparationService) {
  }
}

import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Tag } from "../app/interface/tag";
import { Category } from "../app/interface/category";

export function tagNameExistValidator(tag: Tag[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value as string;
      const isExist = tag.some(item => item.name.toLocaleLowerCase().trim() == value.toLocaleLowerCase().trim())
      return isExist ? {nameExist: {value: control.value}} : null;
    };
  }

  export function categoryNameExistValidator(category: Category[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value as string;
      const isExist = category.some(item => item.name.toLocaleLowerCase().trim() == value.toLocaleLowerCase().trim())
      return isExist ? {nameExist: {value: control.value}} : null;
    };
  }
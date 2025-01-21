import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInstructor'
})
export class FilterInstructorPipe implements PipeTransform {

  transform(users: any[]): any[] {
    if (!users) return [];
    return users.filter(user => user.user.role === 'Instructor');
  }
}

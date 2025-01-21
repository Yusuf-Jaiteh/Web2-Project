import { TestBed } from '@angular/core/testing';

import { CourseEditServiceService } from './course-edit-service.service';

describe('CourseEditServiceService', () => {
  let service: CourseEditServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseEditServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

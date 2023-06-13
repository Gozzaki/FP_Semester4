import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCandidatePage } from './add-candidate.page';

describe('AddCandidatePage', () => {
  let component: AddCandidatePage;
  let fixture: ComponentFixture<AddCandidatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCandidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

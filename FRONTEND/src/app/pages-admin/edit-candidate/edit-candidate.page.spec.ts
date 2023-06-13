import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCandidatePage } from './edit-candidate.page';

describe('EditCandidatePage', () => {
  let component: EditCandidatePage;
  let fixture: ComponentFixture<EditCandidatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditCandidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

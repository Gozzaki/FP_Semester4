import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HasilVotePage } from './hasil-vote.page';

describe('HasilVotePage', () => {
  let component: HasilVotePage;
  let fixture: ComponentFixture<HasilVotePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HasilVotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

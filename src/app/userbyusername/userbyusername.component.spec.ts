import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbyusernameComponent } from './userbyusername.component';

describe('UserbyusernameComponent', () => {
  let component: UserbyusernameComponent;
  let fixture: ComponentFixture<UserbyusernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbyusernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbyusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

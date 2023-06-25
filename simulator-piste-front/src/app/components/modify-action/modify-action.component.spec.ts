import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyActionComponent } from './modify-action.component';

describe('ModifyActionComponent', () => {
  let component: ModifyActionComponent;
  let fixture: ComponentFixture<ModifyActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

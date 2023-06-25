import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMissionComponent } from './modify-mission.component';

describe('ModifyMissionComponent', () => {
  let component: ModifyMissionComponent;
  let fixture: ComponentFixture<ModifyMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

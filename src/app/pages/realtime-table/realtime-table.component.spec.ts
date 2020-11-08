import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeTableComponent } from './realtime-table.component';

describe('RealtimeTableComponent', () => {
  let component: RealtimeTableComponent;
  let fixture: ComponentFixture<RealtimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealtimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

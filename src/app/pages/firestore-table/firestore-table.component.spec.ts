import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestoreTableComponent } from './firestore-table.component';

describe('FirestoreTableComponent', () => {
  let component: FirestoreTableComponent;
  let fixture: ComponentFixture<FirestoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirestoreTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

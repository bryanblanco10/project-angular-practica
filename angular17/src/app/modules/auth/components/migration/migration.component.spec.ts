import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationComponent } from './migration.component';

describe('MigrationComponent', () => {
  let component: MigrationComponent;
  let fixture: ComponentFixture<MigrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MigrationComponent]
    });
    fixture = TestBed.createComponent(MigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

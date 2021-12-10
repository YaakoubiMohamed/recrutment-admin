import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidaturesComponent } from './condidatures.component';

describe('CondidaturesComponent', () => {
  let component: CondidaturesComponent;
  let fixture: ComponentFixture<CondidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondidaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

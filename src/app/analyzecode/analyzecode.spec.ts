import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analyzecode } from './analyzecode';

describe('Analyzecode', () => {
  let component: Analyzecode;
  let fixture: ComponentFixture<Analyzecode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Analyzecode],
    }).compileComponents();

    fixture = TestBed.createComponent(Analyzecode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
